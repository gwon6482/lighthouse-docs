# Frontend 진행상황

**프로젝트**: lighthouse_FE (LightHouse_app)
**스택**: Vue 3 + TypeScript + Vite
**상태**: 🟡 개발 중

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
| 배포 | S3 + CloudFront → lighthouse.career |

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
GET  /api/job/:jobCode/preparation          🔴 백엔드 미구현
GET  /api/job/:jobCode/recruitment          🔴 백엔드 미구현 (워크넷 API 연동 예정)
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

### 다음 단계
- Phase 4: 주간 리뷰 페이지 본 구현 (지난 주 회고 + 다음 주 schedule 편집)
- (선택) Phase 5: zigzag week panel / curriculum bar 도 schedule 기반으로 동기화

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
- [ ] 진로계획 UI 및 기능 개선 (진로계획 작성/타임라인/완성 플로우)
- [x] 진로달성 페이지 생성 (단계 1 메인 + 단계 2 시작/완료 완료)
- [ ] 진로달성 BE 연동 (entry 업로드 API + 인증사진 파일 업로드)
- [ ] 진로달성 피드 페이지 (다른 사용자의 인증 기록 모아보기)
- [ ] 목표진로 "진로백과에서 선택하기" 연동 (검색 선택 플로우)
- [ ] 메인페이지 종합 (홈 화면에 각 섹션 요약 연결)
- [ ] 랜딩페이지 연결 (www.lighthouse.career)
- [ ] 카카오 소셜 로그인
