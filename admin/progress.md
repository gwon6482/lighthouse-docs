# Admin 진행상황

**프로젝트**: lighthouse_admin
**스택**: (미정, Next.js 권장)
**상태**: 🔴 미시작

## 구현 예정 기능

| 기능 | 설명 |
|------|------|
| 질문 관리 | 설문 질문 CRUD (T1~T3 각 컬렉션) |
| 응답 목록 | 설문 응답 조회 및 검색 |
| 통계 대시보드 | 그룹별/질문별 통계 시각화 |
| 직업 관리 | job_data 조회 및 수정 |

## 연동할 주요 API

```
GET/POST/PUT/DELETE /api/admin/questions/:collection_type   질문 CRUD
GET /api/survey/result/list                                 응답 목록
GET /api/survey/statistics                                  통계
GET /api/job/:jobCode                                       직업 조회
```

## collection_type 목록

| 값 | 영역 |
|----|------|
| `T1_personality` | 성격/심리특성 |
| `T2_1_talent` | 재능 |
| `T2_2_interest` | 흥미 |
| `T2_3_values` | 가치관 |
| `T3_environmental` | 업무환경 |

## 주의사항

- `/api/admin` 현재 인증 미들웨어 없음 → 어드민 개발 전 인증 구현 필요
