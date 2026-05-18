# User Bookmark API 가이드

**Base URL**: `/api/user/bookmarks`  
**모든 엔드포인트**: `Authorization: Bearer <token>` 필요

---

## GET /api/user/bookmarks — 북마크 목록

job_data.job_info와 cross-join하여 직업 상세 정보 포함 반환.

**Response 200**
```json
{
  "success": true,
  "data": [
    {
      "jobCode": "013601",
      "title": "소프트웨어 개발자",
      "classification": "정보통신",
      "salary": "고",
      "jobSatisfaction": "매우높음",
      "addedAt": "..."
    }
  ]
}
```

---

## POST /api/user/bookmarks/:jobCode — 북마크 추가

이미 추가된 경우 `409` 반환.

---

## DELETE /api/user/bookmarks/:jobCode — 북마크 삭제

**Response 200**
```json
{ "success": true, "message": "북마크가 삭제되었습니다." }
```

---

## 구현 메모
- `getJobInfoModel()` 헬퍼로 Mongoose 모델 중복 컴파일 방지
- job_data DB: `mongoose.connection.useDb(process.env.JOB_DATA_DB || 'job_data')`
