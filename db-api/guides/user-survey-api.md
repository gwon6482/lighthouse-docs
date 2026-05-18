# User Survey Results API 가이드

**Base URL**: `/api/user`  
**모든 엔드포인트**: `Authorization: Bearer <token>` 필요

---

## POST /api/user/survey-results — 설문 결과 연결

유저 계정에 완료한 설문 결과를 연결합니다.

**Request Body**
```json
{ "survey_id": "abc123" }
```

**에러**: `404` survey_id가 survey_data.survey_results에 없을 경우

---

## GET /api/user/survey-results — 내 설문 목록

**Response 200**
```json
{
  "success": true,
  "data": [
    { "survey_id": "abc123", "completedAt": "..." }
  ]
}
```

---

## 구현 파일
`controllers/userController.js` — `addSurveyResult`, `getSurveyResults`
