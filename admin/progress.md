# Admin 프로젝트 진행상황

**프로젝트**: lighthouse_admin
**레포**: https://github.com/gwon6482/lightHouse_admin
**스택**: Next.js 16 + TypeScript + Tailwind CSS + NextAuth v5
**상태**: 🟡 개발 중

---

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                        # 루트 레이아웃
│   ├── page.tsx                          # / → /dashboard 리다이렉트
│   ├── (auth)/
│   │   └── login/page.tsx                # 로그인 페이지 ✅
│   ├── (dashboard)/
│   │   ├── layout.tsx                    # 대시보드 레이아웃 (Sidebar 포함) ✅
│   │   └── dashboard/
│   │       ├── page.tsx                  # 통계 카드 + 빠른 이동 ✅
│   │       ├── questions/page.tsx        # 설문 문항 CRUD 🔴 뼈대만
│   │       ├── responses/page.tsx        # 응답/통계 조회 🔴 뼈대만
│   │       ├── reference/page.tsx        # 참조데이터 조회 🔴 뼈대만
│   │       └── jobs/page.tsx             # 직업 검색/상세 🔴 뼈대만
│   └── api/
│       └── auth/[...nextauth]/route.ts   # NextAuth 핸들러 ✅
├── components/
│   └── layout/
│       ├── Sidebar.tsx                   # 사이드바 (dynamic import, ssr:false) ✅
│       └── SidebarWrapper.tsx            # Client Component 래퍼 ✅
├── lib/
│   ├── api.ts                            # axios 클라이언트 + API 함수 모음 ✅
│   └── auth.ts                           # NextAuth v5 설정 ✅
└── types/
    └── index.ts                          # 전체 타입 정의 ✅
```

---

## lib/api.ts 구조

**BASE URL**: `process.env.NEXT_PUBLIC_API_URL || "https://api.lighthouse.career"`

| export | 메서드 | 엔드포인트 |
|--------|--------|-----------|
| `questionsApi.getStats()` | GET | `/api/admin/questions/stats` |
| `questionsApi.getList(collectionType)` | GET | `/api/admin/questions/:collection_type` |
| `questionsApi.getCollectionStats(collectionType)` | GET | `/api/admin/questions/:collection_type/stats` |
| `questionsApi.getOne(collectionType, id)` | GET | `/api/admin/questions/:collection_type/:id` |
| `questionsApi.create(collectionType, data)` | POST | `/api/admin/questions/:collection_type` |
| `questionsApi.update(collectionType, id, data)` | PUT | `/api/admin/questions/:collection_type/:id` |
| `questionsApi.delete(collectionType, id)` | DELETE | `/api/admin/questions/:collection_type/:id` |
| `surveyApi.getResultList()` | GET | `/api/survey/result/list` |
| `surveyApi.getStatistics()` | GET | `/api/survey/statistics` |
| `surveyApi.getReport(surveyId)` | POST | `/api/survey/report` |
| `referenceApi.getSurveyElements(params)` | GET | `/api/reference/survey-elements` |
| `referenceApi.getSurveyElement(code)` | GET | `/api/reference/survey-elements/:code` |
| `referenceApi.getCareerAttributes(params)` | GET | `/api/reference/career-attributes` |
| `referenceApi.getCareerAttribute(code)` | GET | `/api/reference/career-attributes/:code` |
| `jobApi.search(name)` | GET | `/api/job/search?name=` |
| `jobApi.getOne(jobCode)` | GET | `/api/job/:jobCode` |

---

## types/index.ts 구조

| 타입 | 설명 |
|------|------|
| `CollectionType` | `T1_personality` \| `T2_1_talent` \| `T2_2_interest` \| `T2_3_values` \| `T3_environmental` |
| `COLLECTION_LABELS` | CollectionType → 한글 레이블 매핑 |
| `QuestionT1T21` | T1/T2-1 문항 (2단계 계층: upper_element → sub_element) |
| `QuestionT22` | T2-2 문항 (관심분야: upper_field → field) |
| `QuestionT23` | T2-3 문항 (가치관 flat: value_id, value_name, value_code ...) |
| `QuestionT3` | T3 문항 (3단계 계층: category → sub_category → item) |
| `SurveyResult` | 설문 응답 결과 |
| `SurveyStatistics` | 설문 통계 (mean/stddev/count per question & group) |
| `SurveyElement` | 참조데이터 survey_elements |
| `CareerAttribute` | 참조데이터 career_attributes |
| `JobInfo` | 직업 정보 (salary, jobSatisfaction 포함) |

---

## 완성된 기능 ✅

### 인증
| 경로 | 설명 | 상태 |
|------|------|------|
| `/login` | 로그인 페이지 (이메일/비밀번호) | ✅ 완료 |
| `/api/auth/[...nextauth]` | NextAuth 핸들러 | ✅ 완료 |

### 라우트 구조
| 경로 | 설명 | 상태 |
|------|------|------|
| `/` | → `/dashboard` 리다이렉트 | ✅ |
| `/dashboard` | 메인 대시보드 (통계 카드) | ✅ 완료 |
| `/dashboard/questions` | 설문 문항 관리 | 🔴 뼈대만 |
| `/dashboard/responses` | 응답 / 통계 조회 | 🔴 뼈대만 |
| `/dashboard/reference` | 참조데이터 관리 | 🔴 뼈대만 |
| `/dashboard/jobs` | 직업 정보 검색 | 🔴 뼈대만 |

---

## 미완성 기능 ⚠️

| 기능 | 경로 | 비고 |
|------|------|------|
| 설문 문항 CRUD | `/dashboard/questions` | 뼈대만 존재 |
| 응답/통계 조회 | `/dashboard/responses` | 뼈대만 존재 |
| 참조데이터 CRUD | `/dashboard/reference` | 뼈대만 존재, 수정 API도 없음 |
| 직업 정보 검색 | `/dashboard/jobs` | 뼈대만 존재 |

---

## 남은 작업

- [ ] 설문 문항 관리 페이지 구현 (목록/상세/CRUD)
- [ ] 응답/통계 조회 페이지 구현
- [ ] 참조데이터 관리 페이지 구현 (DB API에 수정 API 추가 필요)
- [ ] 직업 정보 검색/상세 페이지 구현

---

## 개발일지
- [2026-03-27](https://github.com/gwon6482/lightHouse_admin/blob/main/devlog/2026-03-27.md) — 프로젝트 초기 세팅, 인증, 라우트, hydration 버그 수정
- [2026-04-02](https://github.com/gwon6482/lightHouse_admin/blob/main/devlog/2026-04-02.md) — API 엔드포인트 변경 (Vercel → api.lighthouse.career), 빌드 검증 완료
