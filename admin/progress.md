# Admin 프로젝트 진행상황

**프로젝트**: lighthouse_admin
**레포**: https://github.com/gwon6482/lightHouse_admin
**스택**: Next.js 16 + TypeScript + Tailwind CSS + NextAuth v5
**상태**: 🟡 개발 중

## 완성된 기능 ✅

### 프로젝트 초기 세팅
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- NextAuth v5 JWT 기반 인증 (Credentials Provider)
- 환경변수: ADMIN_EMAIL, ADMIN_PASSWORD, NEXTAUTH_SECRET

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

### 공통 모듈
| 파일 | 역할 |
|------|------|
| `src/lib/api.ts` | DB API axios 클라이언트 (questionsApi, surveyApi, referenceApi, jobApi) |
| `src/lib/auth.ts` | NextAuth v5 설정 |
| `src/types/index.ts` | 전체 타입 정의 (설문 5종, 응답/통계, 참조데이터, 직업) |
| `src/components/layout/Sidebar.tsx` | 사이드바 네비게이션 (ssr: false로 hydration 이슈 해결) |
| `src/components/layout/SidebarWrapper.tsx` | Client Component 래퍼 (ssr: false 허용) |

## 미완성 기능 ⚠️

| 기능 | 경로 | 비고 |
|------|------|------|
| 설문 문항 CRUD | `/dashboard/questions` | 뼈대만 존재 |
| 응답/통계 조회 | `/dashboard/responses` | 뼈대만 존재 |
| 참조데이터 CRUD | `/dashboard/reference` | 뼈대만 존재, 수정 API도 없음 |
| 직업 정보 검색 | `/dashboard/jobs` | 뼈대만 존재 |

## 연동 중인 API

```
GET    /api/admin/questions/stats                    ← 대시보드 통계 카드
GET    /api/admin/questions/:collection_type         ← 문항 목록 (구현 예정)
POST   /api/admin/questions/:collection_type         ← 문항 생성 (구현 예정)
PUT    /api/admin/questions/:collection_type/:id     ← 문항 수정 (구현 예정)
DELETE /api/admin/questions/:collection_type/:id     ← 문항 삭제 (구현 예정)
GET    /api/survey/result/list                       ← 응답 목록 (구현 예정)
GET    /api/survey/statistics                        ← 전체 통계 (구현 예정)
GET    /api/reference/survey-elements                ← 참조데이터 (구현 예정)
GET    /api/reference/career-attributes              ← 참조데이터 (구현 예정)
GET    /api/job/search?name=                         ← 직업 검색 (구현 예정)
```

## 남은 작업

- [ ] 설문 문항 관리 페이지 구현 (목록/상세/CRUD)
- [ ] 응답/통계 조회 페이지 구현
- [ ] 참조데이터 관리 페이지 구현 (DB API에 수정 API 추가 필요)
- [ ] 직업 정보 검색/상세 페이지 구현

## 개발일지
- [2026-03-27](https://github.com/gwon6482/lightHouse_admin/blob/main/devlog/2026-03-27.md) — 프로젝트 초기 세팅, 인증, 라우트, hydration 버그 수정
- [2026-04-02](https://github.com/gwon6482/lightHouse_admin/blob/main/devlog/2026-04-02.md) — API 엔드포인트 변경 (Vercel → api.lighthouse.career), 빌드 검증 완료
