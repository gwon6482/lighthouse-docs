# Frontend 진행상황

**프로젝트**: lighthouse_FE
**스택**: (미정)
**상태**: 🔴 미시작

## 구현 예정 페이지

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 서비스 소개 및 검사 시작 |
| 설문 | `/survey` | 다단계 설문 진행 |
| 결과 | `/result/:survey_id` | 검사 결과 보고서 |
| 직업 탐색 | `/jobs` | 직업 검색 및 상세 |

## 연동할 주요 API

```
GET  /api/survey/form                  설문지 조회
POST /api/survey/response              응답 제출
POST /api/survey/report                결과 보고서
GET  /api/job/search?name=             직업 검색
GET  /api/reference/survey-elements   요소 정의 조회
GET  /api/reference/career-attributes 진로백과 속성 조회
```

## 결과 보고서 응답 구조

```json
{
  "survey_id": "...",
  "answer_type": "type_10",
  "T1": { "E": { "user": 0.533, "average": 0.521, "top_percent": 48.2 } },
  "T21": { "L": { "user": 0.611, "average": 0.498, "top_percent": 32.1 } },
  "T22": { "checked": ["T22_BUS_1", "..."] },
  "T23": { "priority_1": "T3_1", "priority_2": "T3_2", "priority_3": "T3_3" },
  "T3": { "O": [...], "M": [...], "X": [...] }
}
```
