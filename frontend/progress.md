# Frontend 진행상황

**프로젝트**: `lighthouse-test` (pnpm 모노레포 — 구 `lighthouse_FE` / `LightHouse_app` 명칭은 폐기)
**스택**: Vue 3 + TypeScript + Vite
**상태**: 🟡 개발 중
**구조**: `packages/core`(기능모듈+shared) + 두 셸 — `apps/test`(스테이징, main push → test.lighthouse.career) / `apps/app`(프로덕션, `v*` 태그 → app.lighthouse.career)

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Vue 3.5 (Composition API) |
| 빌드 도구 | Vite 7.3 |
| 언어 | TypeScript 5.9 |
| 라우터 | Vue Router 4.6 |
| 상태 관리 | Pinia (useAuthStore 운영 중) |
| HTTP | Axios 1.13 |
| 스타일 | SCSS (Pretendard 폰트) |
| PWA | vite-plugin-pwa |
| 모바일 | Capacitor 8 (iOS / Android 하이브리드) |
| 배포 | S3 + CloudFront. test=`lighthouse-career-fe`/CF `EYU43VZ4GPE7Q`, app=`lighthouse-career-app`/CF `E3LGZIV007TKVC` |

## 구현된 페이지

| 페이지 | 경로 | 상태 |
|--------|------|------|
| 홈 | `/` | ✅ |
| 설문 소개 | `/self-understanding` | ✅ |
| 설문 유형 선택 | `/self-understanding/select` | ✅ |
| 설문 진행 | `/self-understanding/test` | ✅ |
| 설문 결과 보고서 | `/result/:survey_id` | ✅ |
| 마이페이지 | `/mypage` | ✅ |
| 직업 검색 홈 | `/career-encyclopedia` | ✅ |
| 추천 직업 목록 | `/career-encyclopedia/recommended` | ✅ 리디자인 완료 |
| 직업 상세 | `/career-encyclopedia/job/:jobCode` | ✅ |
| 진로계획 메인 | `/career-design` | 🟡 개발 중 |
| 진로계획 작성 | `/career-design/plan/new` | 🟡 개발 중 |
| 진로달성 메인 | `/career-achievement` | ✅ (단계 1) |
| 진로달성 집중 모드 | `/career-achievement/start/:type/:id` | ✅ (단계 2) |
| 진로달성 기록 작성 | `/career-achievement/complete/:type/:id` | ✅ (단계 2) |

## API 연동 현황

```
GET  /api/survey/form                       ✅ 연동됨
POST /api/survey/response                   ✅ 연동됨
GET  /api/survey/analysis/:survey_id        ✅ 연동됨 (결과 보고서)
POST /api/survey/report                     🔴 미연동 (현재 /analysis 사용 중)
GET  /api/job/:jobCode                      ✅ 연동됨
GET  /api/job/search?name=                  ✅ 연동됨
GET  /api/job/recommend/:survey_id          ✅ 연동됨 (경로 수정 완료)
GET  /api/job/recommend-t2/:survey_id       ✅ 연동됨 (T2 추천)
GET  /api/job/:jobCode/reviews              ✅ 연동됨
GET  /api/job/:jobCode/preparation          ⬛ 미사용 — 화면은 FE 하드코딩 사용(아래 주의)
GET  /api/job/:jobCode/recruitment          ⬛ 미사용 — 화면은 FE 하드코딩 사용(아래 주의)
GET  /api/user/profile                      ✅ 연동됨
GET  /api/user/survey-results               ✅ 연동됨
GET  /api/user/bookmarks                    ✅ 연동됨
POST /api/user/bookmarks/:jobCode           ✅ 연동됨
DELETE /api/user/bookmarks/:jobCode         ✅ 연동됨
GET  /api/user/target-career               ✅ 연동됨 (2026-05-21)
PUT  /api/user/target-career               ✅ 연동됨 (2026-05-21)
GET  /api/reference/survey-elements         🔴 미연동
GET  /api/reference/career-attributes       🔴 미연동
```

> ⚠️ **진로백과 준비과정·채용 탭 주의 (2026-08-17 정정)**
> 두 탭은 API를 **호출하지 않는다**. 데이터는 컴포넌트 내 jobCode 하드코딩 맵에 있다.
> - 준비과정 = `PreparationTab.vue`의 `SAMPLE_JOURNEYS_BY_JOB`
> - 채용 = `RecruitmentTab.vue`의 `SAMPLE_POSTINGS_BY_JOB`
>
> `encyclopedia.api.ts`에 preparation/recruitment 호출 함수가 있으나 **어떤 컴포넌트도 쓰지 않는
> dead code**이며 API는 두 경로 모두 404. 기존에 "백엔드 미구현"으로 적혀 있던 항목의 실체가 이것이다.
> 현재 데이터가 들어 있는 jobCode는 **013601, 024101** 둘뿐. 신규 직업 추가는 백엔드가 아니라
> 위 두 맵을 수정하는 작업이다. DB 이관은 미착수 별도 과제.

---

## 2026-05-28 업데이트 — 주간리뷰 사전작업: reviewDay + WeeklySchedule 데이터 레이어 + 진입 팝업

### 배경
반년~1년 단위 진로계획은 그대로 흘러가지 않음. 매주 한 번씩 한 주를 돌아보고 다음 주 일정을 재배치하는 주간리뷰가 필요.
이 과정에서 진로계획 본체를 매번 mutate 하면 DB 가 흔들리므로, 본체는 **러프 마스터**로 두고 매주의 확정된 일정만 `WeeklySchedule` 컬렉션에 저장하는 모델로 전환 중.

### Phase 1 — 데이터 레이어
- **CareerPlan.reviewDay** 필드 추가 (FE/BE) + ReviewDay 입력 페이지 신설 (`/career-design/plan/review-day`)
- **WeeklySchedule REST API** 5종 (BE — db-api 문서 참조)
- **useWeeklySchedule 컴포저블** (FE): WeeklySchedule/WeeklyScheduleItem 타입 + fetch/create/update/delete + itemsByDate 헬퍼

### 흐름 / UI 정비
- 진로계획 작성 흐름 확장: PlanWrite → Projects → Complete → Routines → **ReviewDay (신규)** → Result
- 5개 작성/수정 페이지 푸터를 "이전으로 / 다음으로" 2버튼 (secondary/primary, flex 1:2) 으로 통일
- Result 페이지 요약 카드에 reviewDay 안내 줄 추가
- HomePage 진로달성 메뉴를 **데일리 / 주간리뷰 선택 팝업**으로 전환
  - `HomeButtonContainer` 가 `route` 또는 `onClick` 둘 다 지원하도록 확장
  - 📅 데일리 → `/career-achievement` (기존)
  - 📝 주간 리뷰 → `/career-achievement/weekly-review` (stub, 본 구현 Phase 4)

### 파일 (신규/수정)
- 신규: `pages/CareerDesignReviewDayPage.vue`, `pages/CareerAchievementWeeklyReviewPage.vue`, `composables/useWeeklySchedule.ts`
- 수정: `types/career-design.ts`, `composables/useCareerDesign.ts`, `pages/CareerDesign*.vue` (5개), `pages/CareerDesignResultPage.vue`, `components/page/HomeButtonContainer.vue`, `pages/HomePage.vue`, `*.routes.ts` (career-design / career-achievement)

### Phase 2 — 첫 주 자동 생성
- `useWeeklySchedule` 헬퍼 5개 추가
  - `toDateKey`, `parseDateKey`, `dowOf`, `computeFirstWeekRange`, `generateItemsForWeek`
  - `computeFirstWeekRange(startDate, reviewDay)`: 첫 주 [weekStart, weekEnd] 계산. startDate 가 reviewDay 면 다음 주 reviewDay 까지 7일, 아니면 startDate 부터 첫 reviewDay 까지
  - `generateItemsForWeek(plan, timeline, weekStart, weekEnd)`: Project.days × timeline 활성 월 + Routine.days 를 곱해 일자별 items 생성. curriculumWeek 는 프로젝트의 첫 배치 월 1일 기준 계산
- `ensureFirstWeekSchedule(planId, plan, timeline)`: idempotent — 첫 주 schedule 없으면 자동 생성
- Result 페이지 `onMounted` 에서 호출 → 진로계획 완성 즉시 데일리 화면이 표시할 데이터 확보

### Phase 3 — 진로달성 메인을 WeeklySchedule 기반으로 마이그레이션
- 헬퍼 추가: `computeWeekRangeContaining(date, startDate, reviewDay)` — 첫 주부터 forward 로 진행하며 date 가 속한 주의 범위 반환
- `ensureWeekSchedule(planId, plan, timeline, weekStart, weekEnd)` generic 헬퍼 추가 (ensureFirstWeekSchedule 도 이를 사용하도록 리팩터)
- AchievementPage onMounted: 이번 주 schedule 자동 로드/생성
- **fallback 레이어**: `todayProjectsList` / `todayRoutinesList` 가 schedule 우선 사용 → 미존재(옛 plan 등) 시 기존 `Project.days × timeline` 계산으로 fallback
  - 새 plan = schedule 기반 / 옛 plan = 기존 로직 → 안전한 점진 마이그레이션
  - reviewDay 미설정 / 옛 startDate 포맷 / schedule 생성 실패 어떤 케이스도 빈 화면 없이 동작

### Phase 4 — 주간 리뷰 페이지 본 구현
**페이지**: `CareerAchievementWeeklyReviewPage.vue` (`/career-achievement/weekly-review`) — stub → 완성

#### 4a. 지난 주 회고
- `prevRange`: 오늘 기준 직전 주 [start, end] (첫 주면 null → empty 상태)
- 자동 요약: 루틴 달성 (X/Y, %) / 프로젝트 완료 (X/Y, %), 놓친 루틴 chip
- 자유 회고 textarea (max 2000) + 회고 저장 → `PUT items` 의 reviewNote/status='reviewed' + reviewedAt 자동 기록
- 빈 상태 UI: 계획 없음 / 첫 주 (직전 주 없음)

#### 4b. 다음 주 일정 (read-only)
- `nextRange`: 현재 주 다음 날부터 +6일
- onMounted 에서 `ensureWeekSchedule` 로 다음 주 schedule 보장 (없으면 디폴트 생성)
- 7일 요일별 카드: 요일 칩 + 날짜 + items 수, 각 item 은 카테고리 칩 + 이름 + 분
- 빈 day 는 dashed 카드 + '예정된 일정 없음'

#### 4c. 다음 주 일정 편집 (autosave)
- 각 item 우측 ✕ → 즉시 `PUT items` 로 삭제
- 각 day 헤더 '+ 추가' → 바닥시트(프로젝트/루틴 탭, 마스터 데이터 list) → 선택 시 즉시 `PUT items` 로 추가
- optimistic local update + `저장 중...` 인디케이터
- 신규 item: `crypto.randomUUID()` id + curriculumWeek:null (마스터 데이터로 충분, 표시 시점에서 계산 가능)

#### 4d. 마무리 보완 (사용자 피드백)
- 커스텀 헤더 제거 → `AppHeader` 로 통일 (다른 페이지와 동일 패턴)
- 페이지 상단 intro 블록 (타이틀 + 한 줄 설명) 추가
- 첫 주(직전 주 없음) UX 개선: empty-state 차단 대신 안내 카드 + 이번 주 일정 편집 섹션을 별도 노출
- 루틴 주간 조정 UI 제거: 루틴은 마스터 days 로 자동 배치 → 주간 단계에서 조정 불필요
  - day-card / add bottom sheet 모두 프로젝트만 노출
  - 회고 섹션의 루틴 달성률 / 놓친 루틴 chip 은 그대로 유지 (회고는 의미 있음)

### Phase 5 — 일정 유연성 / 정합성 보완 (Gap 1·2·3)

#### Gap 1 — 미완료 자동 이월 헬퍼
- `missedProjects` computed: prevSchedule.items 중 project + `!isProjectDone`
- 각 항목 `targetDate = origDate + 7일` (같은 요일로 다음 주)
- 회고 섹션에 "놓친 프로젝트 N건" 박스 — 행마다 카테고리 칩 + 이름 + origDate→targetDate + **이월** 버튼
- 우상단 **전부 다음 주로 이월** 버튼 (single PUT batch 추가)
- `isCarriedOver(m)`: nextSchedule 에 동일 (itemId, targetDate) 존재 여부 — idempotent (재실행 시 중복 추가 안 함)
- 이월된 행은 흐려지고 버튼이 '✓ 이월됨' 으로 변경

#### Gap 2 — 집계도 schedule 우선 사용
- AchievementPage 가 onMounted 에서 `fetchSchedules(planId)` 로 전체 schedule 로드 → `allSchedules`
- `findScheduleForDate(date)`: weekStart ≤ date ≤ weekEnd 매칭
- `effectivePlannedCount(date)`: schedule 있으면 그 날 items 수, 없으면 `Project.days × timeline` fallback
- `effectiveDoneCount(date)`: schedule items 중 done 마킹된 것 수, 없으면 doneCount fallback
- `achievementStreak` / `weekNodes` 모두 effective* 사용
- 결과: 주간리뷰에서 항목 추가/삭제/이월 시 streak / 이번 달 zigzag X/Y 가 즉시 일관성 유지

#### Gap 3 — 항목 제거 시 done 마킹 정리
- WeeklyReviewPage.removeItem: schedule.items 에서 제거 전에 `isProjectDone` / `isRoutineDone` 확인
- true 면 `toggleProject` / `toggleRoutine` 호출해 localStorage 해제
- 같은 itemId 가 추후 다시 추가될 때 stale '완료' 표시 방지

### Phase 6 — 프로젝트 시작 = 주간 일정 배치 (페이지 재사용)
사용자 의도: 프로젝트의 첫 시작도 사용자가 직접 일정을 배치하는 흐름이어야 함 (reviewDay 와 무관).

- Result CTA `프로젝트 시작하기` → `주간 일정 배치하기` 로 변경, 라우트도 `/career-achievement` → `/career-achievement/weekly-review`
- WeeklyReviewPage 가 `isFirstSetup` 으로 두 모드 자동 분기:
  - 첫 진입 (planId 있고 prevRange 없음): 🚀 / FIRST WEEK SETUP / "이번 주 일정을 직접 그려보세요" / 안내문 + 데일리 화면 CTA
  - 회고 모드: 기존 📝 / WEEKLY REVIEW / "한 주를 돌아보고..."
- 첫 진입 안내 카드 + 이번 주 섹션 제목도 카피 정리
- day 카드 / 추가 시트 / autosave / 이월 등 기존 흐름을 그대로 재사용 — 코드 중복 0

### Phase 7 — 주간리뷰를 2 페이지로 분리

기존 한 페이지(회고 + 이번 주 일정 편집)가 너무 무거워서 책임을 둘로 나눔.

**페이지 1**: `CareerAchievementWeeklyReviewPage` (`/career-achievement/weekly-review`)
- 회고 전담 — hero 📝 WEEKLY REVIEW
- 지난 주 메트릭, 자동 이월된 프로젝트 목록, 놓친 루틴 chip, 자유 회고 메모, 회고 저장
- 자동 이월 로직은 페이지 진입 시 처리 (회고 시점에 의례적)
- **첫 진입(직전 주 없음) = 회고 대상 없음** → onMounted 에서 schedule 페이지로 `router.replace`
- 하단 CTA: `이번 주 일정 조정하기 →` → schedule 페이지

**페이지 2 (신규)**: `CareerAchievementSchedulePage` (`/career-achievement/weekly-schedule`)
- 일정 편집 전담 — hero 🗓️ THIS WEEK (블루 그라데이션)
- 이번 주 day cards + 추가 시트 + ✕ 삭제 + autosave (review 페이지에서 옮긴 로직)
- 하단 CTA: `오늘의 계획 시작하기` → `/career-achievement` (데일리)

**Result CTA 라우팅**:
- 진로계획 완성 직후 → schedule 페이지로 직결 (회고할 게 없으므로 review 페이지 우회)

**흐름**
- 첫 진입: Result → schedule → 데일리
- 회고 진입: HomePage 팝업 → review → schedule → 데일리

### Phase 8 — 홈 진입 정비 + 개발자 기능 카드 + 진행상황 초기화
- HomePage 에 "랜딩페이지" 진입 버튼 신설 (로그인/유저 패널 ↔ 6 grid 버튼 사이, 옐로우 그라데이션 + 우측 화살표)
- button-container 와 동일 폭 (max-width 400/480px), 위·아래 24px 균등 간격
- HomePage 의 "오늘 날짜 시뮬레이션" 카드를 "개발자 기능" 카드로 확장
  - dev-tools__group 분리, sub-section 별 옐로우 group title
  - **진행상황 초기화** 버튼 (danger 톤): localStorage 4종 키 + 모든 WeeklySchedule 일괄 삭제 후 reload
  - **이전날 / 다음날** 버튼 1:1 추가 — `shiftDevDate(delta)` 가 현재 devDate 기준 ±1일 적용 (테스트 효율 ↑)

### Phase 9.5 — 랜딩 통합 롤백 (Nuxt 본진 채택, SEO 우선)

랜딩페이지는 www.lighthouse.career 의 유일한 SEO 노출 페이지이므로 SSG/SSR 가 표준.
SPA 인 LightHouse_app(Vue+Vite) 에 통합하면 SEO 약함 → 원본 `lighthouse_landing` (Nuxt 3) 을
production source 로 확정하고 LightHouse_app 의 통합 부분은 깔끔히 제거.

**삭제**
- `src/modules/landing/`, `src/assets/landing/`, `src/appearance/modules/landing/`
- `appearance/styles.scss` 의 landing `@use` 한 줄
- `shared/router/index.ts` 의 landingRoutes import + spread

**남김**
- HomePage 의 "랜딩페이지" 버튼: 외부 링크 `https://www.lighthouse.career` (target='_blank', 화살표 ↗)
- `lighthouse_landing/` 디렉토리: production source 로 유지

**향후**
- www 도메인에 Nuxt SSG 빌드 배포 (별도 인프라 task)
- 랜딩 디자인 변경은 Nuxt 쪽에서

### Phase 9 — 랜딩페이지 통합 (lighthouse_landing Nuxt → LightHouse_app) [철회됨]

기존 별도 Nuxt 3 프로젝트(`lighthouse_landing/`)의 랜딩 페이지를 우리 Vue+Vite 앱에 모듈로 흡수.

**신규 구조**
- `src/modules/landing/`
  - `pages/LandingPage.vue` — LandingAppHeader + Section1~8 + LandingAppFooter 조립
  - `components/LandingAppHeader.vue` — 스크롤 시 자동 숨김, 로고 → `/` 라우트
  - `components/LandingAppFooter.vue`
  - `components/Section1.vue ~ Section8.vue` — 라이트하우스 5단계 소개
  - `landing.routes.ts` — `/landing`
- `src/assets/landing/` — 이미지 9 + .mov 1
- `src/appearance/modules/landing/`
  - `_variables.scss` / `_mixins.scss` / `_base.scss`
  - `_section1.scss` ~ `_section8.scss` / `_app-header.scss`
  - `Landing.scss` (모듈 진입점, partial 일괄 @import)
- `appearance/styles.scss` 에 `@use './modules/landing/Landing.scss'` 추가 — **기존 앱 컨벤션과 동일**하게 글로벌 로드

**Nuxt → Vue+Vite 어댑테이션 (학습 포인트)**
| 원본 | 변환 |
|---|---|
| `~/components/...` | `@/...` (Vite alias) |
| 자동 import | 명시적 import |
| `~/assets/images/foo.png` (src 직접) | `import foo from '@/assets/landing/foo.png'` + `:src="foo"` (Vite asset 처리) |
| `nuxt.config additionalData` (SCSS auto-prepend) | partial 마다 `@import './base'` 또는 글로벌 styles.scss 에서 통합 로드 |
| `layouts/default.vue` 자동 적용 | LandingPage 가 Header/Footer 직접 포함 |

**SCSS 로딩 시행착오 메모**
- 처음에 각 Section.vue 의 `<style lang="scss">@import '@/appearance/modules/landing/sectionN'</style>` 로 import → **스타일 미적용**
- 원인: Vite + sass-embedded 환경에서 `@/` 별칭이 SCSS @import 에서 자동 resolve 되지 않아 silent fail
- 해결: 컴포넌트의 `<style>` 블록 제거, `Landing.scss` 한 장에 모아 `appearance/styles.scss` 에서 `@use` 로 글로벌 로드 — 다른 모듈들과 동일 패턴

**중복 폰트 제거**
- `index.html` 에 추가했던 Pretendard CDN 제거 — `main.ts` 가 npm `pretendard` 패키지를 이미 import 중

### 다음 단계 후보
- 랜딩 섹션 고정 width(1460/1620px) → 반응형 처리
- 메인에서 reviewDay 도래/통과 알림
- "이동" 기능 (item 의 date 변경)
- BE: 주간 리뷰 entry 별도 컬렉션 (선택)

---

## 2026-05-28 업데이트 — 진로달성 hero 강조 + 연속 달성 + 루틴 게이지 + 완료 트리거 단일화

진로달성 메인 UI 보완 + 진로계획 시작일 제약 추가.

### hero (CareerAchievementPage)
- **N일차 강조**: `진로계획 N일차` 숫자 44px → 92px, 라벨/숫자/단위 세로 배치 + text-shadow로 hero 중심에 시각적 무게 부여
- **연속 달성 N일차** hero에 🔥 칩으로 표시 (`achievementStreak` computed):
  - 오늘부터 역행하며 planned===0 휴식일은 스킵, planned>0 ∧ done>=planned 인 날을 카운트
  - 오늘이 아직 미완료여도 break 하지 않고 어제부터 계산 시작 (그레이스), streak===0 이면 칩 숨김
- **이번 주 루틴 달성률 게이지** (`weeklyRoutineStat` computed):
  - 분모는 이번 주(월~일) 계획된 루틴 횟수, 100%에서 시작
  - 과거(오늘 이전) 날짜의 미완료 루틴마다 (1/planned)% 차감 — 오늘·미래는 미판정
  - "🎯 이번 주 루틴 달성" 레이블 + 큰 % + 흰 진행바 + "놓친 루틴 N / planned" 메타 (놓친 게 0이면 "아직 놓친 루틴이 없어요")
- **startDate 포맷 관용**: `parseStartDate` 헬퍼 추가 — `YYYY-MM-DD` / `YYYY-MM` / `YYYY.MM` / `YYYY년 M월` 모두 허용 (day 없으면 그 달 1일)

### 진로계획 시작일 제약 (CdDatePicker / PlanWritePage)
- `CdDatePicker`에 `min?: string` prop 추가 — min 이전 셀은 회색 + 취소선 + 비활성, "오늘" 빠른선택도 가드
- `PlanWritePage`에서 `getToday()` 기준 todayKey를 startDate min으로, `draftPlan.startDate || todayKey`를 endDate min으로 전달
- 사유: startDate가 미래로 잡혀 있던 옛 데이터에서 N일차가 항상 1로 표시되던 문제 해소 + 신규 작성 시 과거 시작일 차단

### 완료 트리거 단일화 (CareerAchievementPage / CompletePage)
- **카드 체크 버튼 제거**: 오늘의 할일 `ca__pcard-check` 삭제, 완료 시 head 우측에 "✓ 완료" 녹색 알약 배지(`ca__pcard-done-badge`)만 표시 (비-interactive)
- **vcard 하위목표 클릭 토글 제거**: `ca__pgoal-item`의 `@click="toggleItem"` 삭제, hover/cursor 스타일도 제거 — 표시 전용
- **저장 흐름에서 curriculum advance**: `CareerAchievementCompletePage.save()`에 `advanceProjectCurriculum(project, dateKey)` 추가
  - 프로젝트의 첫 배치 월 1일 기준 dateKey가 속한 주차 wIdx 계산
  - 해당 curriculum week의 첫 미완료 item을 `toggleItem`으로 done 처리 → split bar 1칸 자동 전진
  - itemType==='project' && !alreadyDone 일 때만 (루틴은 curriculum 없음)
- 결과: 프로젝트 완료/curriculum 전진은 **시작하기 → 기록작성 → 저장** 단일 흐름. 루틴 카드의 quick "완료" 토글은 의도된 설계라 그대로 유지

### 파일
- `LightHouse_app/src/modules/career-achievement/pages/CareerAchievementPage.vue`
- `LightHouse_app/src/modules/career-achievement/pages/CareerAchievementCompletePage.vue`
- `LightHouse_app/src/modules/career-design/components/CdDatePicker.vue`
- `LightHouse_app/src/modules/career-design/pages/CareerDesignPlanWritePage.vue`

---

## 2026-05-27 업데이트 — 진로달성 메인 UI 개편 (듀오링고 레퍼런스)

진로달성 메인 페이지의 hero/카드 레이아웃을 듀오링고 학습 화면 레퍼런스로 다시 정리.

### 주요 변경
- 상단 "진로달성" 타이틀 + 부제 텍스트 제거
- `plan-hero` 하나의 박스로 통합 (이전 plan-hero + week-card 두 박스 합침)
  - 옐로우 그라데이션 배경
  - 큰 `진로계획 N일차`(타이틀 급, 44px)
  - 진행률 바는 타임라인 월 단계 하나로 통합 (이번 주 % 별도 카드 제거)
  - **이번 주 path**: 듀오링고 학습 화면처럼 7일을 zigzag 위치한 동그란 노드로 표시
    - done: 흰 채움 + ✓, today: 흰 채움 + 흰 링 + `START` 말풍선, past 미완료: 반투명 회색
- "오늘의 할일"(프로젝트) 섹션을 강조 카드(`ca__pcard`)로 교체:
  - 카테고리 액센트 보더(왼쪽 4px)
  - 카테고리 칩 + 우상단 체크 토글
  - 큰 이름(17px) + goal 설명 + 큰 시작 버튼(`시작하기`, 14px 굵게 + 그림자)
- "오늘의 루틴"은 시작 페이지 거치지 않고 메인에서 즉시 완료 토글되는 `완료` 버튼만 표시 (루틴은 짧고 반복적이라 타이머/기록 생략)

### 데이터 헬퍼
- `useAchievement.monthProgress(timeline)` 신규 — 현재 월에 매칭되는 timeline 슬롯 index + 전체 슬롯 수 + monthLabel 반환

### 커밋
- FE: `2c1dfc3` feat: 진로달성 메인 UI 개편 (plan-hero + 할일 강조 + 루틴 완료 토글) — dev
- FE: `1ac3bab` feat: 진로달성 hero에 이번 주 path 흡수 + 듀오링고 zigzag 노드 — dev
- FE: `45688ba` feat: hero zigzag 노드를 일자 → 주차 단위로 변경 — dev
  - 현재 월을 7일씩 N개 주차로 파티션, 노드 라벨 `N주차 + 날짜범위`, 상태는 그 주 합산
  - 가변 노드 수 대응 위해 path-row를 grid(7) → flex
- FE: `9bd9395` feat: 주차 path 세로화 + 현재 주차 큰 카드 + 목표 list — dev
  - 가로 노드 → 세로 stack: prev / current(큰 카드) / next 3개만
  - current는 흰 반투명 큰 카드 + 옐로우 48px 동그라미 + START 말풍선 + 그 주 unique 프로젝트 목표 list
  - `useAchievement.dateProjects` 헬퍼 추가 (todayProjects 일반화)
- FE: `8858d07` feat: 주차 목표 N등분 바 + 모든 완료 시 축하 모달 — dev
  - 주차 목표 list 취소선 제거(완료는 색만 살짝 흐리게)
  - vcard 헤더 아래 N등분 progress bar(완료 segment만 옐로우 그라데이션)
  - `CelebrationModal` 컴포넌트 신설: Teleport + 콘페티 18조각 CSS 낙하 애니메이션
  - 오늘 프로젝트+루틴 모두 완료될 때 1회 자동 표시 (`lh_celebration_YYYY-MM-DD` localStorage 플래그)
- FE: `ee85514` feat: 주차 카드에 프로젝트별 curriculum N등분 progress bar — dev
  - 합산 bar 1개 → 프로젝트별 row N개로 분리
  - 프로젝트가 timeline에 처음 배치된 달 1일을 1주차 시작으로 봄
  - row = 점/이름/N주차/카운터/펼침 + `curriculum.items.length` 등분 bar (카테고리 색)
  - 펼치면 items 체크리스트, 클릭 즉시 토글로 bar 한 칸 채움
  - 신규 composable `useCurriculumCompletion` — `lh_curriculum_items_v1` localStorage, 인덱스 기반 완료 추적
  - 한계: items가 `string[]`이라 순서 수정 시 완료 매핑 어긋날 수 있음 (BE 스키마 그대로 유지, 추후 `{id, text}[]`로 마이그레이션 고려)
- FE: `1b479ee` fix: curriculum 매핑을 인덱스 → week 번호 매칭으로 변경 — dev
  - sparse curriculum(예: 1/3/5주차만 입력) 케이스에서 배열 인덱스로 접근하면 진로계획 결과 페이지(week 필드 기반)와 표시 텍스트가 어긋남
  - `p.curriculum.find(c => c.week === wIdx)`로 통일
- FE: `f288b2a` feat: 오늘의 할 일 카드 본문을 그 주차 첫 미완료 item으로 동적 표시 — dev
  - 기존: `p.goal` (프로젝트당 한 줄, 안 변함) → 변경: 그 주차 curriculum.items 중 첫 미완료 item
  - 모두 완료 시 "이번 주 모든 목표 완료!" (초록 강조)
  - curriculum 없거나 주차 범위 밖이면 `goal`로 fallback

---

## 2026-05-27 업데이트 — 누적 type-check 에러 14건 정리 + RecommendedJobCard 정돈

- 누적된 `vue-tsc` 에러 14건 일괄 해결 (대부분 `noUncheckedIndexedAccess` 관련 배열 인덱싱). 의미 변화 없이 non-null 단언(`!`) 적용. `npm run type-check` 통과 상태로 복귀
- `RecommendedJobCard.vue`: `rank` prop을 optional로 바꾸고 순위 배지·왼쪽 액센트 컬러를 `v-if`로 조건부 렌더. 진로 둘러보기(`EncyclopediaHomePage`)에서는 rank를 안 넘겨 미니멀 카드로 표시. 추천 페이지(`EncyclopediaRecommendedPage`)는 1/2/3등 배지 유지
- `EncyclopediaHomePage`: 이전엔 둘러보기 카드에 1/2/3등 배지가 잘못 노출되는 임시 상태였음 → 의미 맞춰 정리

### 커밋
- FE: `5c2bf6e` fix: 누적된 type-check 에러 14건 해결 (dev)
- FE: `2e8685d` refactor: RecommendedJobCard rank prop optional 처리 (dev)

---

## 2026-05-27 업데이트 — 진로달성 단계 2: 시작/완료 페이지

자기이해 → 진로백과 → 진로설계 → **진로달성** 흐름의 시작/완료 페이지 추가.

### FE
- `career-achievement.routes.ts`: `/career-achievement/start/:type/:id`, `/career-achievement/complete/:type/:id` 라우트 추가
- `pages/CareerAchievementStartPage.vue` (NEW): **카운트업 타이머**(HH:MM:SS) — 작업 종료 시점이 불확정인 점을 고려해 카운트다운이 아닌 경과시간 누적 방식. 시작/일시정지/재개/완료 버튼, `onBeforeRouteLeave` 가드로 진행 중 이탈 시 confirm
- `pages/CareerAchievementCompletePage.vue` (NEW): 인증사진(파일 picker → canvas 리사이즈 가로 1280px JPEG 0.82 dataURL, 1장), 체감난이도(★1~5), 메모(2000자), 저장 시 entry 저장 + 메인의 완료 토글
- `composables/useAchievementEntries.ts` (NEW): `lh_achievement_entries_v1` key로 entry 저장/조회/제거/피드 정렬. 추후 BE 업로드 API + 피드 페이지로 교체 예정
- `pages/CareerAchievementPage.vue`: '시작' 버튼이 alert placeholder 대신 라우터로 이동

### 데이터 구조 (피드 대비 컨텍스트 스냅샷 포함)
```ts
interface AchievementEntry {
  date: string                    // 'YYYY-MM-DD'
  itemType: 'project' | 'routine'
  itemId: string
  itemName: string                // 스냅샷
  itemCategory?: ProjectCategory  // 스냅샷 (project만)
  duration: number                // 계획 duration(분)
  elapsedSec: number              // 실제 소요시간(초)
  doneAt: string                  // ISO timestamp
  photo?: string                  // base64 dataURL (선택)
  difficulty: 1|2|3|4|5
  note: string
  planId?: string
}
```

### 미구현 (다음 작업)
- 인증사진 BE 파일 업로드 API
- 피드 페이지 (다른 사용자의 진로 인증 기록)

### 커밋
- FE: `5b62bbd` feat: 진로달성 시작/완료 페이지 (단계 2) — dev

---

## 2026-05-26 업데이트 — 진로계획에 "루틴 만들기" 단계 추가

진로계획 = 프로젝트 + 루틴 도메인 정의 반영. 흐름 변경:
**개요 → 프로젝트 구성 → 타임라인 배치 → 루틴 만들기 → 전체 확인**

### FE
- `types/career-design.ts`: `Routine` 인터페이스 + `DraftPlan.routines: Routine[]`
- `composables/useCareerDesign.ts`: `draftRoutine`/`editingRoutineId`/`resetDraftRoutine`, `syncAddRoutine`/`syncUpdateRoutine`/`syncDeleteRoutine`, `loadPlanFromApi`에 routines 매핑
- `pages/CareerDesignRoutinesPage.vue` (NEW): 루틴 카드 리스트 + 추가/편집/삭제, 완료 → `/career-design/result`
- `pages/CareerDesignRoutineWritePage.vue` (NEW): 이름/요일(매일·평일·주말 프리셋)/소요시간 슬라이더(5~120분)/알림 토글+시간/메모
- `career-design.routes.ts`: `/career-design/plan/routines`, `/career-design/routine/new` 추가
- `pages/CareerDesignCompletePage.vue`: 완료 시 `/result` → `/plan/routines`로 이동

### BE
- `CareerPlan` 스키마에 `routines: [RoutineSchema]` embedded 추가
- `POST/PUT/DELETE /api/career-plan/:planId/routines[/:routineId]` 엔드포인트 + Swagger
- 이전 작업에서 빠뜨린 Swagger duties 잔재 정리

### 커밋
- FE: `ef82df5` (페이지/타입) + `4bc8e61` (sync 연동) — dev
- BE: `8f6249d` — main

---

## 2026-05-25 업데이트 — 진로계획에서 직무(duties) 제거

진로계획 세우기 페이지에서 "직무" 입력 UI가 불필요하다고 판단, 관련 코드 일괄 정리:

### FE
- `CareerDesignPlanWritePage.vue`: 직무 태그/추가 UI 및 addDuty/deleteDuty/startEdit/confirmEdit/cancelEdit 함수·state 제거
- `CareerDesignCompletePage.vue` / `CareerDesignResultPage.vue`: `draftPlan.duties` chip 렌더링 + SCSS 제거
- `CareerDesignPage.vue`: STEP 1 미리보기 카드의 `g-duty-chip`/`g-add-chip` 데모 제거, 대신 계획명 미리보기로 대체
- `types/career-design.ts`: `DraftPlan.duties` 제거
- `composables/useCareerDesign.ts`: payload·loadPlanFromApi·resetDraftPlan에서 duties 제거

### BE (별도 커밋)
- `CareerPlan` 스키마 duties 필드 제거 + create/updatePlan 컨트롤러 처리 제거
- Duty 카탈로그 시스템 전체 폐기 (FE에서 사용 안 함)

### 커밋
- FE: `7e24bbd` refactor: 진로계획에서 직무(duties) UI/타입 제거 (dev)
- BE: `816ab3e` refactor: 진로계획에서 직무(duties) 필드 제거 + Duty 카탈로그 폐기 (main)

> 진로백과 `Job.duties`(직업의 수행직무)는 **별개 도메인**이라 유지됨.

---

## 2026-05-25 업데이트 — 진로계획 완료 페이지 주차별 상세 팝업

### CareerDesignCompletePage.vue
- 타임라인 슬롯에 배치된 프로젝트 카드 클릭 시 **주차별 상세 팝업** 표시
- 마크업/스타일은 ResultPage 팝업과 동일 (Teleport + Transition, 슬라이드업 바텀시트)
- 슬롯의 `addToSlot` 클릭과 충돌 방지를 위해 `@click.stop` + 별도 `popupProject` ref 사용
- 기존 `selectedProject`(배치 대상 선택용)와 분리

### 5/21 세션 잔여 변경 정리 (같은 커밋에 포함)
- 진로계획 작성 플로우 페이지 분리: `CareerDesignPlanWritePage` / `CareerDesignProjectsPage` / `CareerDesignProjectWritePage`
- 라우트 `/career-design/plan/projects` 추가
- `CdYellowHeader`에 `backTo` prop 추가 (지정 시 router.push, 미지정 시 back)
- `DraftPlan.planId: string | null` 추가
- `router.scrollBehavior: () => ({ top: 0 })` — 페이지 전환 시 항상 최상단

### 커밋
- `a1bd491` feat: 진로계획 완료 페이지 타임라인 프로젝트 클릭 시 주차별 상세 팝업 (dev)

---

## 2026-05-21 업데이트 — 목표 진로 기능 + UI 개선

### 나의 추천 진로 페이지 리디자인 (`EncyclopediaRecommendedPage.vue`)
- **AppHeader** 공용 헤더 추가
- **히어로 헤더**: 인디고 그라데이션 배경, "✦ AI 맞춤 추천" 레이블
- **섹션 구분 명확화**: T2 기반 / 종합 추천 각각 배지·설명 텍스트 추가
- T2 매칭도 → 인디고 pill 스타일로 개선
- 로딩 스켈레톤 추가 (T2, 종합 추천 각각)

### RecommendedJobCard 리디자인 (`RecommendedJobCard.vue`)
- `rank` prop 추가 (필수)
- 1위=금, 2위=은, 3위=동 그라데이션 원형 배지
- 왼쪽 border로 순위별 액센트 컬러 구분
- 분류 → 인디고/회색 chip 태그, SVG 화살표 아이콘

### 진로계획 페이지 (`CareerDesignPage.vue`)
- "나의 좋아요 직업" 리스트 제거
- **목표 진로 카드 섹션** 추가: 설정됨/미설정/로딩 3가지 상태
- **목표 진로 설정 바텀시트 팝업** 추가:
  - 모드 1 — 선택: "진로백과에서 선택하기" / "내가 직접 입력하기"
  - 모드 2 — 직접 입력: 텍스트 입력 + 설정 완료 (`updateTargetCareer` 호출)
- **진로계획 시작하기** 클릭 시 `draftPlan.targetJob`에 목표 진로명 자동 주입 (수정 가능)

### 직업 상세 페이지 (`EncyclopediaJobDetailPage.vue`)
- **"🎯 목표진로로 설정하기" 고정 FAB 버튼** 추가
  - 조건: 로그인 상태 + `targetCareer === null` + 직업 로드됨
  - 클릭 시 `updateTargetCareer({ refType: 'jobCode', ref: jobCode })` 호출
  - 설정 완료 → "✓ 목표진로로 설정됐어요" (초록, 2.2초 후 숨김)
  - `safe-area-inset-bottom` 아이폰 홈바 대응

### encyclopedia.api.ts 추가
```ts
export interface TargetCareer {
  refType: 'jobCode' | 'custom'
  ref: string
  title: string | null
  classification?: { primary: string; secondary: string } | null
}
export const fetchTargetCareer = () => req.get('/api/user/target-career')
export const updateTargetCareer = (data) => req.put('/api/user/target-career', data)
```

---

## 2026-05-19 인증 / 회원 기능

- JWT 인증: `localStorage('lh_token')` + Axios `Authorization` 헤더 자동 주입
- `useAuthStore` (Pinia): `token`, `user`, `isLoggedIn`, `setAuth`, `fetchMe`, `logout`
- `App.vue`: 앱 마운트 시 `fetchMe()` 자동 호출 (토큰 있을 때만)
- 비회원 검사 완료 후 회원가입 → 검사 결과 자동 연결 (tryLinkSurvey)

---

## 설문 UI (2026-05-21 이전 완료)

### T3 업무환경 검사 UI 전면 교체
- 슬라이더 → **5개 이미지 카드 선택** 방식
- 카드: 이미지(`/public/t3_img/`) + 설명 텍스트 카드 내부 표시
- CSS Grid (`repeat(5, 1fr)`) — overflow 없는 반응형
- 기본 선택값 제거 (0 → 미선택 상태)
- DEV skip 버튼: T3 랜덤값 자동 입력 + 마지막 T3 페이지로 이동

### T23 가치관 검사 UI 전면 교체
- 텍스트 리스트 → **4열 이미지 카드 그리드**
- 이미지: `/public/t23_img/{VALUE_CODE}_transparent.png` (13개)
- 상단 슬롯 3개: 선택한 순위 이미지 + 정의 문장 표시
- 순위 배지 (보라색 원형), 카드 내부는 이름 아닌 **정의 문장** 표시
- API response에 `value_code`, `value_name` 필드 추가 (백엔드 배포 완료)

### 결과 보고서 "좋아하는 일" 카드
- 재능·관심·가치관 섹션 최하단에 "나는 __ 분야에서 __ 을 활용해 __ 을 쫓는 일을 할 때 가장 빛나요" 카드 추가

---

## 최근 업데이트 (2026-06-11) — 최초 진입 온보딩 + 설계 전 메인 스테퍼

### 신규 온보딩 모듈 (`src/modules/onboarding/`)
최초 진입 사용자 플로우를 신규 구현. 흐름:
`/onboarding`(스플래시) → `/onboarding/auth`(로그인·회원가입) → `/onboarding/signup`(가입 위저드) → `/onboarding/intro`(서비스 소개 3슬라이드) → `/onboarding/welcome` → `/main/before`
- **스플래시**: 로고(Symbol.svg) 인라인 SVG — 외곽선 그리기→색 채우기 애니메이션
- **AuthPage**: 회원가입 기본, SNS 버튼(카카오/Apple/구글, OAuth 미구현=준비중) + 이메일 가입 + 로그인 토글
- **가입 위저드**: 계정→이름→나이/성별→Q1(상황,단일)→Q2(고민,중복)→Q3(자기이해,단일). 이메일 단계에서 `GET /api/auth/check-email` 중복체크. 진로답변 Q1~Q3은 localStorage 임시 저장(백엔드 미반영)
- **welcome**: 성공 애니메이션 + 이름 호명

### 프로젝트 설계 전 메인 (`/main/before` = MainBeforePage)
"클리어하고 다음 단계로 넘기는" 3단계 가로 박스 스테퍼:
- ① 자기이해 검사 ② 목표 진로 결정 ③ 진로 프로젝트 설계
- 순차 활성화(이전 done이어야 active), done/active/locked 상태 표시, 상단 진행바
- 각 단계는 해당 플로우를 마치면 `/main/before`로 복귀(sessionStorage 컨텍스트 플래그)
  - 1단계: 검사 결과 보고서 맨 아래 "다음으로"
  - 2단계: 진로백과 직업상세 "목표진로로 설정하기" → 확인 후 설정·복귀
  - 3단계: 진로계획 결과 페이지 "다음으로" → 계획 active 전환 후 복귀
- 3단계 모두 완료 시 "진로달성 시작하기!" → `/career-achievement`

### 진로계획/주간일정 개선·버그픽스
- **신규 진로계획 시작일을 사용자 기준 "오늘"로 고정** (읽기전용) — 미래 시작일로 인한 빈 주간일정 방지
- **주간일정/리뷰/데일리 빈 화면 버그 수정**: 주차 범위 계산이 reviewDay를 쓰지 않는데 가드가 reviewDay를 필수로 요구해 빈 화면이 되던 문제 → startDate만 있으면 계산. 시작 전이면 "아직 시작 전" 안내 표시
- 진로계획 페이지 하단 "목표 진로 설정하기" 버튼 제거(목표진로는 진로백과에서 설정)

### 백엔드 변경 (배포 완료)
- `GET /api/auth/check-email?email=` → `{ available }` (회원가입 이메일 중복체크)

---

## 모듈 구조

```
src/modules/
├── survey/
│   ├── pages/, components/, composables/useSurvey.ts, types/survey.ts, survey.api.ts
├── encyclopedia/
│   ├── pages/, components/, composables/useEncyclopedia.ts
│   ├── types/encyclopedia.ts
│   └── encyclopedia.api.ts
└── career-design/
    ├── pages/, components/, composables/useCareerDesign.ts, types/career-design.ts
```

---

## 남은 작업

- [ ] 워크넷 공식 API 적용 — 채용정보 탭(`/api/job/:jobCode/recruitment`) 기능 구현
- [ ] 진로계획 UI 및 기능 개선 (진로계획 작성/타임라인/완성 플로우) — 프로젝트 추가 2단계 분리(2026-08-27)와 타임라인 주차 전환(2026-08-28, `v0.1.8`)은 완료. 아래 참조
- [x] 진로달성 페이지 생성 (단계 1 메인 + 단계 2 시작/완료 완료)
- [x] 진로달성 BE 연동 (entry 업로드 API + 인증사진 S3 업로드) — **배포 완료**. 2026-08-07 실측 정정: 오랫동안 '배포 대기'로 잘못 적혀 있었으나 API·FE·S3 CORS 전부 반영된 상태였다. `achievement.api.ts`에 presign/uploadPhoto 배선 완료, localStorage는 오프라인 캐시일 뿐 서버가 source of truth
- [ ] 진로달성 피드 페이지 (다른 사용자의 인증 기록 모아보기)
- [ ] 목표진로 "진로백과에서 선택하기" 연동 (검색 선택 플로우)
- [x] 최초 진입 온보딩 플로우 (스플래시~welcome) + 설계 전 메인 `/main/before` 3단계 스테퍼
- [x] 설계 후 메인 — **`/main` 제거하고 진로달성(`/career-achievement`)으로 일원화**(2026-08-07, `v0.1.5`). 아래 참조
- [ ] 회원가입 진로답변(Q1/Q2/Q3) 백엔드 저장 (현재 localStorage 임시)
- [ ] 메인페이지 종합 (홈 화면에 각 섹션 요약 연결)
- [ ] 랜딩페이지 연결 (www.lighthouse.career)
- [ ] 카카오 소셜 로그인 / SNS OAuth

---

## 네비게이션 / 뒤로가기 안전 기준 (2026-07-22 수립)

모든 "나가기·뒤로" 처리는 아래 5개 규칙으로 판단한다. (감사 결과 기반)

- **R1 — 백 목적지 결정성**: 화면이 딥링크·새로고침·`router.replace` 이후로 진입될 수 있으면
  바(bare) `router.back()` 금지. `shared/utils/navigation.ts`의 `safeBack(router, fallback)`처럼
  히스토리 없으면 명시적 목적지로 이동. `back()`은 "직전 화면이 반드시 존재"가 보장될 때만.
- **R2 — 진행 중 데이터 보호**: 미저장 폼·타이머·멀티스텝은 `onBeforeRouteLeave` + confirm.
  인페이지 back 버튼도 같은 confirm 공유, 정상 저장/완료 경로는 `bypass` 플래그로 통과.
  (표준 예: `career-achievement/CareerAchievementStartPage.vue`)
- **R3 — 자동저장 우선**: 가능하면 설문처럼 localStorage 자동저장으로 유실을 원천 제거.
  (표준 예: `survey/composables/useSurvey.ts` persistProgress)
- **R4 — 하드웨어 백 일원화**: Capacitor `@capacitor/app` backButton 리스너를 전역 1곳(App.vue).
  루트/홈(`/`, `/career-achievement`, `/main/before`, `/onboarding`)에서는 "한 번 더 누르면 종료", 그 외엔 라우터 뒤로.
  (2026-08-07 갱신: `/main` 제거, 설계 전 메인 `/main/before`도 루트 취급에 추가)
- **R5 — 인증 경계**: 로그인 페이지(`/onboarding/auth`) 진입 시 토큰 있으면 로그아웃 confirm.
  (전역 가드 `shared/router/app.ts` beforeEach)

### 감사에서 발견된 조치 대상
- [x] R5 로그인 경계 로그아웃 확인 (app.ts 전역 가드)
- [x] R4 하드웨어 백버튼 전역 처리 (`@capacitor/app` + `useHardwareBack.ts` + App.vue 토스트)
- [x] R1 바 `router.back()` → `safeBack` (`shared/utils/navigation.ts`): JobDetailHeader, CdProjectDetail, MyPage, CdYellowHeader fallback, Project/RoutineWrite
- [x] R2 작성 폼 이탈 가드 (`shared/composables/useUnsavedGuard.ts`): CareerDesign Plan/Project/Routine Write
- [x] R3 career-design draft 자동저장/복원 (`useCareerDesign.ts` localStorage `lh_cd_draft` + deep watch) — 새로고침·앱종료 유실 방지

---

## 하단 네비게이션 (베타 3탭, 2026-07-31)

베타 기준 하단 탭을 5→3으로 축소. 핵심 루프(계획→실행→조정)에 집중.

- **노출 3탭**: 로드맵 · **홈(중앙 FAB)** · 마이. (구 '일정' → **'로드맵'** 리네임: 라벨 + 지도 아이콘, 기능·라우트명 동일 `Career Achievement Weekly Schedule`)
- **커뮤니티·커리어**: 나브에서 제거하되 **코드·라우트·아이콘 보존**. `packages/core/src/shared/config/features.ts`(`community:false, career:false`) 플래그로만 제어 → 재오픈 시 flip.
- **딥링크 차단**: `stubRoutes.ts`의 `/career-hub`·`/community`에 `beforeEnter` 가드 → 플래그 off면 홈 리다이렉트.
- 구현: `shared/components/BottomNav.vue`(navItems를 `visibleNavItems` computed로 필터). i18n 미도입이라 라벨은 인라인 문자열, Tabler 미사용이라 아이콘은 인라인 SVG.
- 배포: 커밋 eafbcf1(+27076ba 사이드 탭 세로정렬) → main push → 스테이징(test.lighthouse.career) 반영.
- **prod 반영 완료 (2026-08-07, `v0.1.4`)**: app.lighthouse.career 배포 확인 — 아래 참조.

---

## 프로덕션 릴리스 `v0.1.4` (2026-08-07)

`v0.1.3` 이후 3커밋을 본서비스(app.lighthouse.career)에 반영.

| 항목 | 내용 |
|------|------|
| 태그 | `v0.1.4` (annotated) |
| 워크플로우 | `deploy-app` run 31155237880 — success (43s) |
| 경로 | build → S3 `lighthouse-career-app` → CF `E3LGZIV007TKVC` 무효화 |
| 검증 | 프로덕션 index.html이 로컬 빌드와 동일한 메인 청크(`index-Br-PUT0x.js`) 참조, HTTP 200 |

**포함 변경**
- 하단 나브 3탭 축소 + '일정'→'로드맵' 리네임 (위 섹션)
- 하단 나브 사이드 탭 세로 정렬 (`align-items: flex-end` → `center`)
- `/main/before` 스테퍼: 완료된 단계는 설명 대신 **결과 한 줄** 표시(검사 유형 / 목표진로명 / 계획명)
- `CareerDesignPlanWritePage`: **종료(완료)일 미입력 시 '다음으로' 비활성화** — 날짜 없이 다음 단계 진입 방지

**참고**: 워크플로우가 쓰는 `actions/checkout@v4` 등이 Node 20 타깃이라 러너가 Node 24로 강제 실행 중(deprecation 경고). 동작 영향은 없으나 액션 버전 상향 권장. `deploy-test.yml`도 동일.

---

## 프로덕션 릴리스 `v0.1.5` (2026-08-07) — 잔재 페이지 `/main` 제거

### 배경
`/main`(설계 후 메인)은 `"준비 중인 페이지입니다"`만 렌더하는 23줄짜리 플레이스홀더였는데,
진입가드(`shared/router/app.ts`)와 로그인 후 리다이렉트(`AuthPage.vue`)가 **활성 plan 보유자를 전부 여기로** 보내고 있었다.

> 단, "깨진 경로"는 아니었다. `/main`에 `meta.showBottomNav: true`가 있고 하단 나브 노출 3조건
> (`showBottomNav` && `isLoggedIn` && `hasActivePlan`)이 이 상황에서 전부 참이라 나브가 정상 렌더됐고,
> 홈 탭을 누르면 곧바로 진로달성으로 이동 가능했다. 실제 영향은 "앱 열 때마다 군더더기 한 탭 + 나쁜 첫인상" 수준.

**판단(사용자)**: 진로달성(`/career-achievement`)이 사실상 설계 후 메인이고 `/main`은 쓸모없는 잔재 → 일원화.

### 변경 (8파일, +11 / -97)
| 파일 | 변경 |
|---|---|
| `modules/survey/survey.routes.ts` | `/main`을 `redirect: '/career-achievement'`로 교체. 컴포넌트·name `'Main'`·meta `mainState` 제거 |
| `shared/router/app.ts` | 진입가드 `hasActivePlan ? '/career-achievement' : '/main/before'` |
| `modules/onboarding/pages/AuthPage.vue` | 로그인 후 replace 목적지 동일 변경 |
| `shared/composables/useHardwareBack.ts` | `ROOT_PATHS` → `['/', '/career-achievement', '/main/before', '/onboarding']` |
| `modules/survey/pages/HomePage.vue` | test 셸 dev 런처의 '메인 페이지' 전/후 선택 모달 제거 → `메인 페이지(설계 전)` 단일 항목 |
| 삭제 | `survey/pages/MainPage.vue`, `appearance/modules/survey/MainPage.scss` (+ `styles.scss`의 `@use`) |

**라우트를 지우지 않고 redirect로 남긴 이유**: PWA `start_url`·북마크·기존 히스토리가 `/main`을 가리킬 수 있고,
S3+CloudFront SPA fallback 구조에서 매칭 라우트가 없으면 빈 화면이 되기 때문.

**곁다리 수정**: `ROOT_PATHS`에 `/main/before`를 새로 추가했다. 그간 설계 전 메인이 빠져 있어
안드로이드 하드웨어 백에서 루트 취급을 못 받았다(종료 확인 없이 그냥 뒤로 감).

### 배포·검증
| 항목 | 내용 |
|---|---|
| 커밋 / 태그 | `a82c689` → `v0.1.5` |
| 스테이징 | `deploy-test` run 31157015624 — success |
| 프로덕션 | `deploy-app` run 31157118160 — success (40s) |

빌드 산출물 실측(프로덕션 `index-BlCd-V4X.js`, 로컬 빌드와 해시 일치):
- `path:"/main",redirect:"/career-achievement"` ✓
- `hasActivePlan?"/career-achievement":"/main/before"` ✓ (index·AuthPage 두 청크 모두)
- `ROOT_PATHS` = `["/","/career-achievement","/main/before","/onboarding"]` ✓
- 플레이스홀더 문구 "준비 중인 페이지입니다" 전 자산에서 소멸, PWA precache 135 → 134 entries

> 참고: 구 청크 URL(`/assets/MainPage-*.js`)을 직접 치면 HTTP 200이 나오는데, S3에서는 이미 삭제됐고
> CloudFront의 SPA fallback이 `index.html`을 돌려주는 것이다(`content-type: text/html`). 정상 동작.

---

## 프로덕션 릴리스 `v0.1.6` (2026-08-17) — 진로백과 024101 3개 탭 채우기

광고·홍보·마케팅전문가(`024101`) 상세의 후기·준비과정·채용 탭을 013601과 동일 수준으로 채움.
08-12 작업분이 미커밋으로 남아 있던 것을 커밋·배포하여 종료.

| 탭 | 변경 |
|---|---|
| 준비과정 | `SAMPLE_JOURNEYS_BY_JOB`에 024101 현직자 여정 3건(퍼포먼스 마케팅 / 대행사 AE / 브랜드 커뮤니케이션). 각 projects 7건 + routines 2건 |
| 채용 | `SAMPLE_POSTINGS_BY_JOB`에 024101 공고 3건(제일기획·무신사·당근). 마감일 미래 날짜 |
| 후기 | 코드 변경 없음. 프로덕션 Atlas `job_data.job_reviews`에 승인 더미 4건 시딩(08-12, 만족도 66/74/71/68). 롤백 마커 `adminNote: "seed:024101-dummy-20260812"` |

### 배포·검증
| 항목 | 내용 |
|---|---|
| 커밋 / 태그 | `217bb43` → `v0.1.6` |
| 스테이징 | `Deploy TEST` success — `EncyclopediaJobDetailPage-s4TV3CFD.js` |
| 프로덕션 | `Deploy PROD` run 32007955416 success — `index-B3RqrZrE.js` → `EncyclopediaJobDetailPage-DO35JUO9.js` |

라이브 실측: 프로덕션 청크에 제일기획·무신사·당근·"퍼포먼스 마케팅 리드" 포함 ✓,
`GET /api/job/024101/reviews` → count 4 · `adminNote` 미노출 ✓

### 남은 것
- **013601 채용공고 마감일이 과거 날짜**(2026-07-18/25)라 D-day 만료로 표시됨 — 갱신 여부 미결
- 준비과정·채용의 FE 하드코딩 구조 자체는 그대로(DB 이관 미착수)

---

## 새 프로젝트 추가 2단계 분리 (2026-08-27)

`/career-design/project/new` 한 화면에서 '주차 추가' 버튼으로 커리큘럼을 직접 쌓던 방식을 둘로 나눴다.

| 단계 | 경로 | 내용 |
|---|---|---|
| 1 | `/career-design/project/new` (기존) | 커리큘럼 섹션 제거 → **프로젝트 기간 스테퍼**(−/+, 1~52주, 기본 4주). CTA `추가하기` → `다음` |
| 2 | `/career-design/project/curriculum` (신규) | 주차 수만큼 카드 자동 생성, 제목 기본값 `"{프로젝트명} - n주차"`. 제목 수정·항목 추가 후 저장 |

커리큘럼이 '선택'에서 **필수 단계**로 바뀌었다. 제목이 기본값으로 차 있어 그냥 넘겨도 빈 값이 안 된다.

### 변경 파일
| 파일 | 내용 |
|---|---|
| `pages/CareerDesignProjectWritePage.vue` | 커리큘럼 섹션·주차 편집 함수 제거, 기간 스테퍼 추가 |
| `pages/CareerDesignProjectCurriculumPage.vue` (NEW) | 2단계 전체 |
| `composables/useProjectCurriculum.ts` (NEW) | `MIN/MAX/DEFAULT_WEEKS`, `clampWeeks`, `defaultWeekTitle`, `syncCurriculumLength` |
| `career-design.routes.ts` | `/project/curriculum` — **`/project/:id` 보다 앞에** 둬야 `:id`로 매칭되지 않음 |
| `composables/useCareerDesign.ts` | `draftProject` 초기값·`resetDraftProject`에 `weeks` |
| `pages/CareerDesignProjectsPage.vue` | 수정 진입 시 `weeks`를 `curriculum.length`에서 복원 |

### ⚠️ 서버는 `weeks`를 저장하지 않는다
`syncAddProject`/`syncUpdateProject`가 서버로 보내는 건 `curriculum`뿐이다.
`Project.weeks`는 타입에만 있고 템플릿 더미데이터에서만 쓰였다.
→ **수정 재진입 시 기간은 `curriculum.length`에서 유도**한다. 서버 필드가 필요해지면 `lighthouse-api` 별도 작업.

### 함정 2건 (브라우저 실측으로 발견)
1. **입력 유실** — 2단계가 커리큘럼을 로컬 `ref`로 들고 있으면 기간 고치러 1단계 다녀오는 사이 항목이 날아간다.
   → `draftProject.curriculum`에 직접 쓴다. draft 자동저장(R3, `lh_cd_draft`)에도 실린다.
2. **저장 후 엉뚱한 화면** — `safeBack`은 히스토리를 되감으므로 단계가 늘어나면 목록이 아니라 1단계로 간다.
   → `router.replace('/career-design/plan/projects')`.

### 배포·검증
| 항목 | 내용 |
|---|---|
| 커밋 / 태그 | `dbaba72` → 머지 `4755e0c` → **`v0.1.7`** |
| 스테이징 | `Deploy TEST` run 33043783828 **success** |
| 프로덕션 | `Deploy PROD` run 33044088117 **success** |

라이브 실측(test.lighthouse.career): `index-DGH377r1.js` → `CareerDesignProjectCurriculumPage-CRRSmL1m.js` 청크에
"주차별 커리큘럼"·"주차 제목은 기본값이 채워져"·"항목 입력 후 Enter" 포함 ✓.
`CareerDesignProjectWritePage-CsmpoNxj.js`에 "프로젝트 기간"·"몇 주차 계획으로 만들까요" 포함,
구버전 "주차 추가"·"주차별 학습 내용을 추가해보세요" 제거 확인 ✓

프로덕션 실측(app.lighthouse.career): `index-BfFB_4Do.js` →
`CareerDesignProjectCurriculumPage-UDaXvjmi.js` 청크 존재 ✓,
`CareerDesignProjectWritePage-BLUME6XP.js`에 "프로젝트 기간"·"몇 주차 계획으로 만들까요" 포함,
구버전 "주차 추가" 제거 ✓

### v0.1.7 에 함께 실린 것 — 진로백과 스타일 분리
`dev`에만 있던 스타일 분리 리팩터링이 이 릴리스로 **배포 라인에 처음** 올라갔다.
프로덕션 전역 CSS `index-Chrwhc2v.css`(123KB)에 encyclopedia 스타일 포함 확인,
`EncyclopediaJobDetailPage-DFw-TNmL.js`에 제일기획·무신사·당근·"퍼포먼스 마케팅 리드" 잔존 확인,
라이브 화면에서 024101 채용 탭 공고 3건 정상 렌더 ✓ (스타일 유실 없음)

---

## 브랜치 정리 — `main` ↔ `dev` 동일화 (2026-08-27)

`dev`가 `main`보다 divergent한 채 방치돼 있었다(dev 6커밋 / main 4커밋, 공통조상 `d912512`).
양방향 머지로 **두 브랜치를 동일 상태(`4755e0c`, 트리 `90cbd59`)로** 맞췄다.

| 방향 | 방식 | 결과 |
|---|---|---|
| main → dev | `git merge main` | 머지커밋 `4755e0c`, 충돌 0건 |
| dev → main | `git merge --ff-only dev` | fast-forward |

`main`의 4커밋(하단나브 3탭·나브정렬·`/main` 제거·024101 더미데이터)과
`dev`의 진로백과 스타일 분리(`.vue`의 `<style>` → `appearance/modules/encyclopedia/*.scss`)가
겹치는 파일이 없어 충돌이 나지 않았다.

### 클린 머지 ≠ 정상
git이 조용히 합쳐도 한쪽이 증발할 수 있어 파일 단위로 대조했다.
main이 건드린 19개 중 16개 byte-identical, 삭제 2건 정상 반영, 나머지 3건(`styles.scss`,
`Preparation/RecruitmentTab.vue`)은 dev도 손댄 파일로 양쪽 작업이 모두 살아있음을 확인.

### ⚠️ 머지 직후의 sass 에러는 코드 버그가 아니다
```
[sass] Can't find stylesheet to import.  @use './modules/survey/MainPage.scss';  ← styles.scss 4:1
```
`a82c689`가 `MainPage.scss`와 그 `@use` 줄을 함께 지웠으므로 디스크는 정합하다.
정체는 **머지 이전에 띄워둔 dev 서버**가 옛 `styles.scss`를 모듈 그래프에 들고 있던 것.
에러가 가리키는 4번 줄이 현재 파일에 없다는 게 증거. → **dev 서버 재시작으로 해결.**
브랜치를 오래 갈라둔 뒤 머지하면 실행 중인 dev 서버는 반드시 한 번 헛돈다. 머지 후 재시작이 기본.


---

## 타임라인 배치 월별 → 주차별 전환 (2026-08-28, `v0.1.8`)

`/career-design/complete`의 배치 단위를 월에서 주차로 바꿨다. 구현은 8/27, 배포는 8/28.
FE와 서버 스키마가 함께 바뀌므로 **서버(`lighthouse-api` `cce2853`) 먼저, FE 나중** 순서로 배포했다.

### 주차 규칙 — `usePlanTimeline`이 정본
- 한 주 = **월요일~일요일**. 그 주는 **월요일이 속한 달**에 귀속
- → 한 달의 주차 수 = 그 달의 월요일 개수 = **항상 4 또는 5**
- → 모든 주가 정확히 7일 ⇒ "n주 프로젝트 = n×7일"이 배치 위치와 무관하게 보장
- 1일이 주 중간이면 그 며칠은 전달 마지막 주 (2026-08-01 토 → **7월 4주차**)
- `reviewDay`는 여전히 주 경계가 아니다

대안이던 "짧은 주도 그 달 1주차"안은 6주차가 생기고(2026~2099 중 191개월) 프로젝트 실기간이
배치 위치마다 달라져(3주 프로젝트가 16~21일) 커리큘럼 주차와 날짜가 어긋난다.

`data/month-weeks.ts`는 2026~2099 888개월 테이블(`scripts/generate-month-weeks.mjs`로 생성, 멱등).
2100년 이후는 `weeksInMonth` 즉석 계산으로 fallback.

### 주요 변경
| 파일 | 내용 |
|---|---|
| `composables/usePlanTimeline.ts` (NEW) | 주차 계산 정본 |
| `types/career-design.ts` | `TimelineSlot.month: string` → `week: number`. `WeekCurriculum.description` 추가 |
| `CareerDesignCompletePage.vue` | 계획 기간만큼 고정된 주차 행, 겹침 허용(다중 레인), 계획 끝 넘는 배치 비활성, 행 라벨 "8월 1주차" + 달 경계 구분선, 바에 그 주차 커리큘럼 설명 표시 |
| `CareerDesignProjectCurriculumPage.vue` | 항목 목록·추가버튼 제거 → **설명 textarea 1개**. 투명해서 안 보이던 주차 제목 input에 옅은 배경 부여 |
| `useAchievement.ts` / `useWeeklySchedule.ts` | 월 라벨 파싱 제거 → 날짜 기준. `curriculumWeek = 계획주차 − 시작주차 + 1`로 단순화 |

**시작주만 저장하고 점유 구간은 저장하지 않는다.** 저장하면 프로젝트 기간을 고쳤을 때 둘이 어긋난다.

### 🐛 타임라인 슬롯의 stale 프로젝트 복사본
슬롯이 배치 시점의 프로젝트 **복사본**을 들고 있었다. `draftPlan.projects`와 메모리상으론 같은
참조지만 **localStorage 복원(`lh_cd_draft`)이나 `loadPlanFromApi`를 거치면 별개 객체로 갈라진다.**
→ 배치 후 커리큘럼·기간을 고쳐도 타임라인과 진로달성이 옛 값을 봤다.

`resolveProject(p, projects)`로 슬롯의 프로젝트를 **항상 id로 원본에서 다시 집어오게** 고쳤다.
커리큘럼 표시 요청이 없었으면 안 드러났을 뿐, **기간 변경이 반영되지 않는** 더 넓은 문제였다.

### 배포·검증
| 항목 | 내용 |
|---|---|
| 커밋 / 태그 | `8438439` (main=dev) → **`v0.1.8`** |
| 스테이징 | `Deploy TEST` run 33147620244 **success** |
| 프로덕션 | `Deploy PROD` run 33148109016 **success** |
| 서버 | `lighthouse-api` `cce2853`, run 33147384945 success |

라이브 실측: test/app 양쪽 `CareerDesignProjectCurriculumPage` 청크에 신규 placeholder
"이 주차에 무엇을 할지 적어보세요" 존재 ✓, 구 "항목" UI 문구 0건 ✓,
`CareerDesignCompletePage`에 "주차" 6건, index 청크에 month-weeks 테이블 포함 ✓

### ⚠️ 배포하며 드러난 것 두 가지
1. **8/27 로그가 기록한 단위테스트가 레포에 없다.** "주차규칙 29건 / 주간일정 11건 통과"로
   남아 있지만 spec 파일이 없어 재실행 불가였다. 핵심 명제(월별 주차 수 = 그 달 월요일 개수)만
   독립 계산으로 888개월 전수 대조해 대체했다(불일치 0건, 5주차 달 309개월).
   → **같은 날 해결**: `usePlanTimeline.spec.ts`(34건) + `useWeeklySchedule.spec.ts`(16건)
   총 50건을 레포에 심었다(`dbfdfb4`). 돌연변이 검증(구 규칙 복원 시 15건 실패)까지 확인.
2. ~~**루트 `pnpm type-check`는 2건 실패한다**~~ — 모노레포 전환 잔재였다.
   `vitest.config.ts`가 없는 루트 `./vite.config`를 참조하고 `tsconfig.vitest.json`의 include 대상이 0개.
   **`dbfdfb4`에서 해결 → 이제 루트 `pnpm type-check` 0건, `pnpm test` 50건.**

> 번들 실측 시 `grep -c`를 믿지 말 것. minify된 청크는 한 줄이라 매칭 **줄** 수가 항상 1이다.
> `grep -o | wc -l`로 세야 한다.


---

## ⚠️ envDir 누락 — 로컬 빌드에 API base URL 이 없었다 (2026-08-28, `dbfdfb4`)

`apps/*/vite.config.ts` 에 **`envDir` 이 없어** Vite 가 각 앱 디렉터리(`apps/app`, `apps/test`)에서만
env 파일을 찾았다. `.env.production` 은 모노레포 **루트**에 있으므로 무시됐고,
로컬 빌드는 `VITE_API` 가 `undefined` 인 채로 만들어지고 있었다.

```
grep -o 'api.lighthouse.career' apps/app/dist/assets/index-*.js   # → 0건
```

CI 는 워크플로우(`deploy-test.yml`/`deploy-app.yml`)가 `VITE_API` 를 직접 주입해서 통과할 뿐이었다.
"로컬 빌드 해시 ≠ 라이브 해시" 는 이것의 부산물이다.

**조치**: 두 앱의 vite.config 에 `envDir` = 모노레포 루트(`publicDir` 과 같은 패턴).

| | 로컬 | 라이브 |
|---|---|---|
| prod | `index-CCgTL8Du.js` | `index-CCgTL8Du.js` |
| test | `index-B4Dr35q3.js` | `index-B4Dr35q3.js` |

> 함정은 루트에 `.env.production` 이 **있는데도** 안 먹는다는 것이다. 파일이 보이니 읽힌다고 믿게 된다.
> pnpm workspaces + Vite 조합에서 `envDir` 을 명시하지 않으면 기준은 앱 디렉터리다.

→ 이제 로컬 `pnpm build:app` 산출 해시를 라이브와 대조하는 검증법이 실제로 통한다.

## 테스트 (2026-08-28 신설)

`pnpm test` (vitest). 대상은 `packages/core/src/**/__tests__/**/*.spec.ts`.

| spec | 건수 | 범위 |
|---|---|---|
| `career-design/__tests__/usePlanTimeline.spec.ts` | 34 | 주 경계, month-weeks 888개월 전수, 주차↔날짜 왕복, 넘침·겹침, stale 복사본 방어 |
| `career-achievement/__tests__/useWeeklySchedule.spec.ts` | 16 | reviewDay 가 경계가 아님, 커리큘럼 매핑, 계획 밖 날짜 클램프 |

`tsconfig.vitest.json` include 에 `packages/core/src/env.d.ts` 가 필요하다 —
테스트가 `useWeeklySchedule` → `@/shared/api` 를 끌어오는데 거기서 `import.meta.env` 를 쓴다.
