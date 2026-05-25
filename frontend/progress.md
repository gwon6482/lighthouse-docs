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
| 진로달성 | `/career-achievement` | 🔴 준비 중 |

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
- [ ] 진로달성 페이지 생성
- [ ] 목표진로 "진로백과에서 선택하기" 연동 (검색 선택 플로우)
- [ ] 메인페이지 종합 (홈 화면에 각 섹션 요약 연결)
- [ ] 랜딩페이지 연결 (www.lighthouse.career)
- [ ] 카카오 소셜 로그인
