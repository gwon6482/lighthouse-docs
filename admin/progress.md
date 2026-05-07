# Admin 프로젝트 진행상황

**프로젝트**: lighthouse_admin
**레포**: https://github.com/gwon6482/lightHouse_admin
**스택**: Next.js 16 + TypeScript + Tailwind CSS + NextAuth v5
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
│   │       ├── questions/page.tsx            # 설문 문항 CRUD ✅
│   │       ├── responses/page.tsx            # 응답 목록 + 상세 모달 ✅
│   │       ├── reference/page.tsx            # 참조데이터 CRUD ✅
│   │       ├── statistics/page.tsx           # 통계 조회 ✅
│   │       ├── jobs/page.tsx                 # 직업 검색/상세 ✅
│   │       └── encyclopedia/page.tsx         # 진로백과 (후기/준비과정/채용) ✅
│   └── api/auth/[...nextauth]/route.ts       # NextAuth 핸들러 ✅
├── lib/
│   ├── api.ts                                # axios 클라이언트 + API 함수 ✅
│   └── auth.ts                               # NextAuth v5 설정 ✅
└── types/index.ts                            # 전체 타입 정의 ✅
```

## lib/api.ts API 함수 목록

**BASE URL**: `process.env.NEXT_PUBLIC_API_URL || "https://api.lighthouse.career"`

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
| `encyclopediaApi.getReviews(jobCode)` | GET | `/api/job/:jobCode/review` ⚠️ |
| `encyclopediaApi.getPreparation(jobCode)` | GET | `/api/job/:jobCode/preparation` |
| `encyclopediaApi.getRecruitment(jobCode)` | GET | `/api/job/:jobCode/recruitment` |
| `jobApi.search(name)` | GET | `/api/job/search?name=` |
| `jobApi.getOne(jobCode)` | GET | `/api/job/:jobCode` |

> ⚠️ `encyclopediaApi.getReviews` 경로가 `/review`(단수)로 되어 있음 → `/reviews`로 수정 필요
> 후기 관리(승인/반려) API 함수도 미추가 상태

## 완성된 기능 ✅

| 경로 | 설명 |
|------|------|
| `/login` | 로그인 (NextAuth v5) |
| `/dashboard` | 메인 대시보드 (통계 카드) |
| `/dashboard/questions` | T1/T21/T22/T23/T3 설문 문항 조회/편집 |
| `/dashboard/responses` | 응답 목록 + 상세 모달 (파트별 탭) |
| `/dashboard/reference` | survey-elements / career-attributes CRUD |
| `/dashboard/statistics` | 그룹별/문항별 통계, MeanBar 차트 |
| `/dashboard/jobs` | 직업 검색/상세 |
| `/dashboard/encyclopedia` | 직업 검색 + 후기/준비과정/채용 탭 조회 |

## 미완성 기능 ⚠️

| 기능 | 비고 |
|------|------|
| Admin 인증 미들웨어 | DB API `/api/admin` 전체 오픈 상태 |
| 후기 관리 UI | 승인/반려 버튼, 어드민 직접 등록 폼 미구현 |
| `encyclopediaApi.getReviews` 경로 | `/review` → `/reviews` 수정 필요 |

## 인프라 메모

- **로컬 dev**: `next dev --webpack` (port 3000, `NEXTAUTH_URL=http://localhost:3000`)
- **운영**: 홈서버 PM2 port 3010
- **CORS 이슈 해결됨 (2026-05-07)**: DB API에 `app.options('*', cors())` 추가 배포 완료
  - 브라우저 cross-origin preflight OPTIONS → CloudFront 504 문제 수정

## 개발일지
- [2026-03-27] 프로젝트 초기 세팅, 인증, 라우트, hydration 버그 수정
- [2026-04-02] API 엔드포인트 변경 (Vercel → api.lighthouse.career), 빌드 검증
- [2026-05-07] CORS preflight 버그 수정, 진로백과 후기 탭 연동
