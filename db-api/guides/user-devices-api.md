# User Devices (FCM) API 가이드

**Base URL**: `/api/user/devices`  
**모든 엔드포인트**: `Authorization: Bearer <token>` 필요

---

## POST /api/user/devices — 기기 토큰 등록/갱신

FCM 푸시 알림용 기기 토큰을 등록합니다. `deviceId` 기준으로 upsert.

**Request Body**
```json
{
  "deviceId": "device-uuid-1234",
  "token": "fcm-token-xyz",
  "platform": "android"
}
```

`platform`: `"android"` | `"ios"` | `"web"`

---

## DELETE /api/user/devices/:deviceId — 기기 토큰 제거

로그아웃 시 해당 기기의 토큰을 삭제합니다.

**Response 200**
```json
{ "success": true, "message": "기기가 제거되었습니다." }
```

---

## 구현 파일
`controllers/userController.js` — `registerDevice`, `removeDevice`
