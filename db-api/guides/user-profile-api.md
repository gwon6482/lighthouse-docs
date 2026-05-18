# User Profile API 가이드

**Base URL**: `/api/user`  
**모든 엔드포인트**: `Authorization: Bearer <token>` 필요

---

## GET /api/user/profile — 프로필 조회

**Response 200**
```json
{
  "success": true,
  "data": {
    "uid": "...", "email": "...",
    "settings": { "theme": "light", "language": "ko", "notifications": true },
    "createdAt": "..."
  }
}
```

---

## PUT /api/user/profile — 설정 수정

**Request Body** (부분 업데이트 가능)
```json
{ "settings": { "theme": "dark" } }
```

settings 객체는 기존 값과 병합됩니다.

---

## DELETE /api/user — 계정 탈퇴

소프트 삭제 (`isActive: false`). 실제 데이터 보존.

**Response 200**
```json
{ "success": true, "message": "계정이 비활성화되었습니다." }
```

---

## 구현 파일
`controllers/userController.js`, `routes/user.js`, `models/User.js`
