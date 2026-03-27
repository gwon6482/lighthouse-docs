# Admin 프로젝트 진행상황

**프로젝트**: lighthouse_admin
**기술스택**: Next.js 권장 (미정)
**상태**: 🔴 미시작

## 구현 예정 기능

| 기능 | 설명 | 우선순위 |
|------|------|---------|
| 유저 관리 | 설문 응답자 목록/상세 조회 | 높음 |
| 설문지 관리 | 설문 응답 결과 조회/관리 | 높음 |
| 설문 문항 관리 | 질문 CRUD (5개 영역) | 높음 |
| 참조데이터 관리 | survey_elements / career_attributes CRUD | 중간 |
| 로그 조회 | 설문 통계, 응답 로그 확인 | 중간 |

## 연동할 주요 API (DB API 서버)

```
# 질문 관리
GET    /api/admin/questions/:collection_type
POST   /api/admin/questions/:collection_type
PUT    /api/admin/questions/:collection_type/:id
DELETE /api/admin/questions/:collection_type/:id

# 설문 응답
GET /api/survey/result/list
GET /api/survey/statistics

# 참조데이터
GET /api/reference/survey-elements
GET /api/reference/career-attributes

# 직업 정보
GET /api/job/search?name=
GET /api/job/:jobCode
```

## 선행 필요 작업

- `/api/admin` 인증 미들웨어 구현 (현재 전체 오픈 상태)
