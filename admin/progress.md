# Admin 프로젝트 진행상황

**프로젝트**: lighthouse-admin
**레포**: https://github.com/gwon6482/lighthouse-admin
**스택**: Next.js 16 + TypeScript + Tailwind CSS + NextAuth v5
**배포**: ~~홈서버 pm2(port 3010) → CloudFront~~ → **Vercel** → admin.lighthouse.career (2026-06-25 이전). main push → Vercel Git 자동배포
**상태**: 🟡 개발 중

## 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/login/page.tsx                 # 로그인 ✅
│   ├── (dashboard)/
│   │   ├── layout.tsx                        # Sidebar 레이아웃 ✅
│   │   └── dashboard/
│   │       ├── page.tsx                      # 메인 대시보드 ✅
│   │       ├── schedule/page.tsx             # 일정관리 — 캘린더·할 일·향후 계획·개발일지 ✅ (2026-11-02)
│   │       ├── questions/page.tsx            # 설문 문항 CRUD ✅
│   │       ├── responses/page.tsx            # 응답 목록 + 상세 모달 ✅
│   │       ├── reference/page.tsx            # 참조데이터 CRUD ✅
│   │       ├── statistics/page.tsx           # 통계 조회 ✅
│   │       ├── onboarding/page.tsx          # 가입 설문 Q1~Q3 분포 ✅ (2026-09-17)
│   │       ├── research/page.tsx            # 연구 설문(/survey) 모집 현황 ✅ (2026-10-24)
│   │       ├── research/FeedbackStats.tsx   # 검사·결과지 평가 집계 ✅ (2026-11-15)
│   │       ├── career-path/page.tsx         # 직업인 진로과정 검수 ✅ (2026-10-26)
│   │       ├── users/page.tsx                # 회원 관리 (목록·검색·삭제) ✅ (2026-09-25)
│   │       ├── reviews/page.tsx              # 직업 후기 검수 (승인 대기·승인·반려·수정·삭제) ✅ (2026-10-15)
│   │       ├── work24/page.tsx               # 고용24 API 탐색기(Swagger 형태, 41개 API 호출) ✅ (2026-10-16)
│   │       ├── jobs/page.tsx                 # 직업 검색/상세 ✅
│   │       └── encyclopedia/page.tsx         # 진로백과 (후기/준비과정/채용) ✅
│   ├── api/auth/[...nextauth]/route.ts       # NextAuth 핸들러 ✅
│   └── api/proxy/[...path]/route.ts          # API 프록시 (세션 검증 + x-admin-key 주입) ✅
├── components/
│   └── users/UserDetailModal.tsx             # 회원 상세 + 단계별 리셋 ✅ (2026-09-26)
├── lib/
│   ├── api.ts                                # axios 클라이언트 + API 함수 ✅
│   ├── auth.ts                               # NextAuth v5 설정 ✅
│   └── onboardingLabels.ts                   # Q1~Q3 해석표 (분포 화면·상세 팝업 공용) ✅
└── types/index.ts                            # 전체 타입 정의 ✅
```

## lib/api.ts API 함수 목록

**BASE URL**: `/api/proxy`(이 앱의 서버 프록시 — 세션 검증 + `x-admin-key` 주입, 2026-07-31~). 프록시가 `API_BASE_URL || NEXT_PUBLIC_API_URL || "https://api.lighthouse.career"` 로 넘긴다(`src/app/api/proxy/[...path]/route.ts`)

| export | 메서드 | 엔드포인트 |
|--------|--------|-----------|
| `questionsApi.getStats()` | GET | `/api/admin/questions/stats` |
| `questionsApi.getList(collectionType)` | GET | `/api/admin/questions/:collection_type` |
| `questionsApi.create/update/delete(...)` | POST/PUT/DELETE | `/api/admin/questions/:collection_type` |
| `surveyApi.getResultList()` | GET | `/api/survey/result/list` |
| `surveyApi.getStatistics()` | GET | `/api/survey/statistics` |
| `surveyApi.getReport(surveyId)` | POST | `/api/survey/report` |
| `referenceApi.getSurveyElements(params)` | GET | `/api/reference/survey-elements` |
| `referenceApi.getCareerAttributes(params)` | GET | `/api/reference/career-attributes` |
| `referenceApi.create/update/delete(...)` | POST/PUT/DELETE | `/api/reference/...` |
| `encyclopediaApi.getReviews(jobCode)` | GET | `/api/job/:jobCode/reviews` (2026-09-09 `28ff3cc` 에서 `/review` → `/reviews`) |
| `encyclopediaApi.getPreparation(jobCode)` | GET | `/api/job/:jobCode/preparation` (API 2026-11-15~) |
| `encyclopediaApi.getRecruitment(jobCode)` | GET | `/api/job/:jobCode/recruitment` (API 2026-10-15~) |
| `reviewsApi.list/update/remove` | GET/PUT/DELETE | `/api/admin/reviews`, `/api/admin/reviews/:id` (2026-10-15 `a00960f`) |
| `usersApi.list/detail/reset/remove` | GET/POST/DELETE | `/api/admin/users`, `/:uid`, `/:uid/reset` (2026-09-25~26) |
| `careerPathApi.list/update/remove` | GET/PATCH/DELETE | `/api/admin/career-path`, `/:id` (2026-10-26) |
| `scheduleApi.*` | GET/POST/PUT/DELETE | `/api/admin/schedule/items[/:id]`, `/api/admin/schedule/members[/:id]` (2026-11-02) |
| `work24Api.endpoints/call` | GET/POST | `/api/admin/work24/endpoints`, `/api/admin/work24/call` (2026-10-16) |
| `devlogApi.month(month)` | GET | 이 앱의 서버 라우트 `/api/devlog` — lighthouse-docs devlog 를 읽는다 (2026-11-02) |
| `jobApi.search(name)` | GET | `/api/job/search?name=` |
| `onboardingApi.getStats()` | GET | `/api/admin/onboarding/stats` (2026-09-17) |
| `researchApi.getStats(includeTest)` | GET | `/api/survey/research/stats` (2026-10-24, 테스트 응답 기본 제외) |
| `researchApi.getFeedbackStats(includeTest)` | GET | `/api/survey/research/feedback-stats` (2026-11-15, 검사·결과지 평가 집계) |
| `jobApi.getOne(jobCode)` | GET | `/api/job/:jobCode` |

> ✅ 두 가지 모두 해결됨(2026-11-17 바로잡음 — 예전엔 아래 둘이 '수정 필요·미추가'로 남아 있었다)
> - `encyclopediaApi.getReviews` 경로 `/review`(단수) → `/reviews` — 2026-09-09 `28ff3cc`
> - 후기 관리(승인/반려) API 함수 `reviewsApi` — 2026-10-15 `a00960f`(화면 `/dashboard/reviews`)

## 완성된 기능 ✅

| 경로 | 설명 |
|------|------|
| `/login` | 로그인 (NextAuth v5) |
| `/dashboard/schedule` | **일정관리**(사이드바 맨 위) — 팀 기록·개발일정·향후 계획·할 일(API /api/admin/schedule, DB admin_data) + 개발일지 자동 표시(/api/devlog → lighthouse-docs devlog). 담당자 = 팀원 목록 (2026-11-02) |
| `/dashboard` | 메인 대시보드 (통계 카드) |
| `/dashboard/questions` | T1/T21/T22/T23/T3 설문 문항 조회/편집 |
| `/dashboard/responses` | 응답 목록 + 상세 모달 (파트별 탭) |
| `/dashboard/reference` | survey-elements / career-attributes CRUD |
| `/dashboard/statistics` | 그룹별/문항별 통계, MeanBar 차트 |
| `/dashboard/jobs` | 직업 검색/상세 |
| `/dashboard/encyclopedia` | 직업 검색 + 후기/준비과정/채용 탭 조회 |
| `/dashboard/onboarding` | 회원가입 진로답변 Q1~Q3 분포 |
| `/dashboard/career-path` | 직업인 진로과정 검수 — 승인 대기/승인/반려, 종류(나의 진로과정·템플릿 의견), 해 온 것 분류 고쳐 승인, 책·강의 '차시 조사 필요', 제출 확인 번호로 찾아 삭제(삭제 요청) |
| `/dashboard/research` | 연구 설문 모집 현황 — 역할별 목표 대비 진척·완주율, 적합도, 불성실 의심, 직업 대분류 쏠림, 중단 지점, 테스트 응답 포함 토글 + **검사·결과지 평가**(2026-11-15): 평가 ①·② 응답률, 문항별 분포(전체·실무자·예비 사용자), 길이 체감×실제 시간, 집중도×의심 표시, 글 답변. 문항 이름·보기는 API 가 준다 |
| `/dashboard/users` | **회원 관리** — 목록·검색·상세 팝업·단계별 리셋·영구 삭제 (2026-09-25~26) |
| `/dashboard/reviews` | **직업 후기 검수** — 승인 대기 → 승인·반려·수정·삭제 (2026-10-15 `a00960f`). 연구 설문 실무자 후기가 pending 으로 들어오고, 승인 전엔 진로백과에 안 보인다 |
| `/dashboard/work24` | 고용24 API 탐색기 — 41개 API 호출, 키는 API 서버에서만 붙는다 (2026-10-16) |

### 회원 관리 (`/dashboard/users`)

행 클릭 → 상세 모달(가입설문 / 자기이해검사 / 진로탐색 / 진로설계 / 단계별 리셋).

| 단계 | 지워지는 것 |
|---|---|
| `design` 진로설계 전 | 진로계획·주간일정·달성기록·커리큘럼완료·인증사진(S3) |
| `survey` 검사 전 | 검사결과·추천직업·북마크·목표진로 **+ design** |
| `signup` 가입 직후 | 이름·나이·성별·가입설문 **+ survey + design** |

> 🚨 **`signup` 리셋이 가입 위저드를 다시 띄우는 것은 소셜 계정뿐이다.**
> 앱 진입 가드(`lighthouse-test shared/router/entryGuard.ts` — 2026-11-04 까지는 `app.ts`)가 `socialOnly && !onboarding.answeredAt`
> 일 때만 위저드로 보낸다. 이메일 계정은 onboarding 을 지워도 `/main/before` 로 간다.
> 가드를 "local 이 없으면 소셜"로 뒤집으면 **authProviders 가 빈 옛 계정이 위저드에 갇힌다**
> (2026-09-09 이전 이메일 가입자). 그래서 가드는 두고, 응답 `wizardWillShow` 와 모달 배너로 알린다.

> ⚠️ 삭제 확인은 **이메일(없으면 uid)을 그대로 입력**해야 버튼이 열린다. 하드 삭제라 되돌릴 수 없다.

> ⚠️ 가입 설문 **문구의 정본은 FE `SignupWizardPage.vue`** 다. API 는 숫자 코드만 준다.
> 해석표는 `src/lib/onboardingLabels.ts` 하나뿐이고 분포 화면과 상세 팝업이 **공유**한다 —
> 두 곳에 복사하면 한쪽만 고쳐져 같은 코드가 다르게 해석된다.

> ℹ️ 2026-09-26 기준 28명 중 **가입설문 응답이 있는 계정은 0명**이다. onboarding 필드는
> 2026-09-09 에 생겼고 값을 가진 소셜 계정은 9/23 에 정리됐다. "응답 없음"이 정상이다.

## 미완성 기능 ⚠️

| 기능 | 비고 |
|------|------|
| 후기 직접 등록 폼 | 검수 화면(승인 대기 → 승인·반려·수정·삭제)은 2026-10-15 `a00960f` 로 완성(위 '프로젝트 구조'·'완성된 기능'의 `/dashboard/reviews`). 남은 것은 어드민이 후기를 **직접 등록**하는 폼뿐 — API `POST /api/admin/reviews` 는 있고 `reviewsApi` 에 create 가 없다 |
| 진로백과 준비과정·채용 탭 화면 | API 는 생겼다(채용 2026-10-15 `411b019` · 준비과정 2026-11-15, 둘 다 운영). 어드민 탭은 응답 JSON 을 그대로 찍는다(`TabContent`) — 전용 화면 없음. '준비 중' 안내는 404 일 때만 뜬다. ⚠️ `lib/api.ts` 의 "두 경로는 API 에 아직 없다" 주석과 안내 문구 '로드맵 1·2번'은 옛 내용 |

> ✅ **해결됨(2026-09-09)**: `getReviews` 경로 오타(`/review`)를 `/reviews` 로 수정(`28ff3cc`).
> dead code 가 아니라 실제 호출 경로였고 직업 선택 시 기본 탭이라 매번 404 였다.
> 같은 커밋에서 '준비 중' 안내가 한 번도 켜지지 않던 문제도 고쳤다(메시지 문자열 판정 → HTTP status).


> ✅ **해결됨(2026-07-31)**: "Admin 인증 미들웨어 / DB API `/api/admin` 전체 오픈" 항목은 완료되어 위 표에서 제거했다.
> `/api/admin/*`에 `adminAuth`(`x-admin-key`, 미설정 시 503 fail-closed)가 붙었고,
> Admin은 `src/app/api/proxy/[...path]/route.ts`가 NextAuth 세션을 검증한 뒤 서버사이드에서 키를 주입한다(브라우저 미노출).
> `src/lib/api.ts`의 axios baseURL도 `/api/proxy`로 전환됨.

> ✅ **해결됨(2026-09-26)**: 로그인이 "로그인 중..." 에서 멈추면 화면에 단서가 0개였다.
> `signIn` 호출에 try/catch 가 없어 reject 시 `setLoading(false)` 에 영원히 도달하지 못했다(`ad99bc5`).
> 함께 `router.push` → `window.location.assign` 으로 바꿨다 — App Router 가 캐시한
> **로그인 전 `/dashboard` RSC 페이로드**를 쓰면 `auth()` 가 null 을 보고 `/login` 으로 되돌린다.
> ⚠️ 무한 로딩 **자체는 재현하지 못했다.** 원인 특정이 아니라 다음에 원인이 보이게 만든 것이다.

### ⚠️ 알려진 위험 — 관리자 비밀번호 (조치 보류)
프로덕션 admin.lighthouse.career는 **처음 정한 기본 관리자 계정·비밀번호 그대로** 로그인된다(2026-08-07 실측).
값은 공개 문서에 적지 않는다(이 레포는 공개 — 2026-11-17 이 자리에 적혀 있던 계정·비밀번호를 지움).
비밀번호는 DB가 아니라 Vercel production env `ADMIN_PASSWORD`와 평문 비교(`auth.ts`)이며, 아직 교체되지 않았다.
**사용자가 위험을 인지한 상태에서 현행 유지를 선택**했으므로 방치가 아니라 보류다.

> ⚠️ **2026-09-25~26 에 전제가 바뀌었다.** 판단 당시 어드민이 할 수 있는 최악은 문항·후기 수정이었는데,
> 지금은 `/dashboard/users` 에서 **전 회원과 딸린 데이터를 되돌릴 수 없게 삭제**할 수 있다.
> 결정을 바꾸라는 뜻은 아니지만, 근거가 된 조건이 달라졌다는 사실은 기록해 둔다.
조치 시: Vercel → Settings → Environment Variables → Production 에서 변경 후 재배포.
NextAuth JWT 세션은 서버 무효화가 불가하므로 기존 세션까지 끊으려면 `AUTH_SECRET`도 함께 로테이션해야 한다.

## 인프라 메모

- **로컬 dev**: `next dev --webpack` (port 3000, `NEXTAUTH_URL=http://localhost:3000`)
- **운영**: ~~홈서버 PM2 port 3010~~ → **Vercel** (2026-06-25 이전 완료). 구 PM2 방식은 폐기됨
- **env 위치 주의**: Admin은 **Vercel 프로젝트 env**를 읽는다(GitHub Secrets 아님).
  API(`lighthouse-api`)는 **GitHub 레포 시크릿**을 읽어 Lightsail에 주입한다. `ADMIN_API_KEY`는 **양쪽에 같은 값**이 있어야 하며,
  과거 이 둘을 혼동해 API가 빈 키로 떠서 전 관리자 API가 503된 사고가 있었다(2026-07-31)
- **CORS 이슈 해결됨 (2026-05-07)**: DB API에 `app.options('*', cors())` 추가 배포 완료
  - 브라우저 cross-origin preflight OPTIONS → CloudFront 504 문제 수정

## 개발일지
- [2026-03-27] 프로젝트 초기 세팅, 인증, 라우트, hydration 버그 수정
- [2026-04-02] API 엔드포인트 변경 (Vercel → api.lighthouse.career), 빌드 검증
- [2026-05-07] CORS preflight 버그 수정, 진로백과 후기 탭 연동
- 회원 상세 '진로 탐색'에서 **'추천 직업 N개' 줄을 뺐다**(2026-11-24, `ea0752f`) — 앱 v0.1.51부터 추천을 계정에 저장하지 않고 볼 때 계산한다. 남은 저장값은 옛 목록이고 새 회원은 늘 0개라 오해를 불렀다. API 응답 칸(`recommendedJobs`)은 그대로다(다음 처리방침 개정 때 정리).
