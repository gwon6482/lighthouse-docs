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
| 직업 검색 홈 | `/career-encyclopedia` | ✅ |
| 추천 직업 목록 | `/career-encyclopedia/recommended` | ✅ |
| 직업 상세 | `/career-encyclopedia/job/:jobCode` | ✅ |
| 결과 보고서 | `/result/:survey_id` | ✅ |
| 마이페이지 | `/mypage` | ✅ |
| 진로계획 | `/career-design` | 🟡 개발 중 |
| 진로달성 | `/career-achievement` | 🔴 준비 중 |

## API 연동 현황

```
GET  /api/survey/form                       ✅ 연동됨
POST /api/survey/response                   ✅ 연동됨
GET  /api/survey/analysis/:survey_id        ✅ 연동됨 (결과 보고서)
POST /api/survey/report                     🔴 미연동 (현재 /analysis 사용 중)
GET  /api/job/:jobCode                      ✅ 연동됨
GET  /api/job/search?name=                  ✅ 연동됨
GET  /api/job/recommend                     ⚠️ 경로 불일치 (FE: /recommend, BE: /recommend/:survey_id)
GET  /api/job/:jobCode/reviews              ✅ 연동됨 (ReviewTab, 조회 전용)
GET  /api/job/:jobCode/preparation          🔴 백엔드 미구현
GET  /api/job/:jobCode/recruitment          🔴 백엔드 미구현
GET  /api/reference/survey-elements         🔴 미연동
GET  /api/reference/career-attributes       🔴 미연동
```

## 진로백과 후기 탭 (2026-05-07 구현)

`ReviewTab.vue` — 직업 상세 페이지 후기 탭

- 마운트 시 `GET /api/job/:jobCode/reviews` 로컬 상태로 조회 (전역 isLoading 미사용)
- 후기 카드: 만족도 그라데이션 바, 요약, 장점/단점(색상 뱃지), 추천 의견, T1 성격 태그
- **후기 작성 버튼 없음** — 후기는 Admin에서만 등록 가능

### 주의: isLoading 격리
`useEncyclopedia`의 `isLoading`은 전역 공유 상태이므로, ReviewTab은 composable을 거치지 않고
`fetchJobReviews`를 직접 호출하며 로컬 ref를 사용함.
(전역 isLoading을 건드리면 부모 페이지 탭 UI가 사라지는 버그 발생)

### encyclopedia.ts 타입 (2026-05-07 업데이트)
```ts
export type T1GroupCode = 'E' | 'C' | 'S' | 'A' | 'I' | 'R' | 'G' | 'U' | 'T'

export interface JobReview {
  _id: string
  jobCode: string
  summary: string
  satisfaction: number   // 0~100
  pros: string
  cons: string
  recommendation: string
  personalityTags: T1GroupCode[]
  status: 'pending' | 'approved' | 'rejected'
  submittedBy: 'user' | 'admin'
  submitterEmail: string
  adminNote: string
  createdAt: string
  updatedAt: string
}
```

## 모듈 구조

```
src/modules/
├── survey/
│   ├── pages/, components/, composables/useSurvey.ts, types/survey.ts, survey.api.ts
└── encyclopedia/
    ├── pages/, components/, composables/useEncyclopedia.ts
    ├── types/encyclopedia.ts
    └── encyclopedia.api.ts
```

## 인증 / 회원 기능 (2026-05-19)

- JWT 인증: `localStorage('lh_token')` + Axios `Authorization` 헤더 자동 주입
- `useAuthStore` (Pinia): `token`, `user`, `isLoggedIn`, `setAuth`, `fetchMe`, `logout`
- `App.vue`: 앱 마운트 시 `fetchMe()` 자동 호출 (토큰 있을 때만)
- `HomePage.vue`: 로그인 전/후 분기 UI (user-panel 카드, 로그아웃 버튼)
- `SignUpModal.vue`: 회원가입 완료 후 `@registered` 이벤트로 토큰/유저 전달
- 비회원 검사 완료 후 회원가입 → 검사 결과 자동 연결 (tryLinkSurvey)
- 마이페이지: 내 검사 결과 목록 (T1 유형 뱃지 포함)

## 공통 컴포넌트 (2026-05-19)

- `AppHeader.vue`: 스티키 로고 헤더 (로고 클릭 → 메인 이동, slot으로 CTA 버튼 주입)
- `JourneyIntro.vue`: 4단계 진로 breadcrumb + 소개 박스 (step prop 0~3으로 상태 자동 계산)

## 남은 작업

- [ ] `fetchRecommendedJobs()` → `/api/job/recommend/:survey_id` 경로 수정 + survey_id 전달
- [ ] `/api/job/:jobCode/preparation`, `/recruitment` 백엔드 구현 대기
- [ ] `/api/reference/survey-elements`, `/api/reference/career-attributes` 연동
- [ ] 카카오 소셜 로그인
