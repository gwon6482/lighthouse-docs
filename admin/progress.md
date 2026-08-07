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
| 후기 관리 UI | 승인/반려 버튼, 어드민 직접 등록 폼 미구현 |
| `encyclopediaApi.getReviews` 경로 | `/review` → `/reviews` 수정 필요. **2026-08-07 재확인 — 아직 그대로**(`src/lib/api.ts:74`) |

> ✅ **해결됨(2026-07-31)**: "Admin 인증 미들웨어 / DB API `/api/admin` 전체 오픈" 항목은 완료되어 위 표에서 제거했다.
> `/api/admin/*`에 `adminAuth`(`x-admin-key`, 미설정 시 503 fail-closed)가 붙었고,
> Admin은 `src/app/api/proxy/[...path]/route.ts`가 NextAuth 세션을 검증한 뒤 서버사이드에서 키를 주입한다(브라우저 미노출).
> `src/lib/api.ts`의 axios baseURL도 `/api/proxy`로 전환됨.

### ⚠️ 알려진 위험 — 관리자 비밀번호 (조치 보류)
프로덕션 admin.lighthouse.career는 `admin@lighthouse.com` / `changeme`로 로그인된다(2026-08-07 실측).
비밀번호는 DB가 아니라 Vercel production env `ADMIN_PASSWORD`와 평문 비교(`auth.ts`)이며, 아직 교체되지 않았다.
**사용자가 위험을 인지한 상태에서 현행 유지를 선택**했으므로 방치가 아니라 보류다.
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
