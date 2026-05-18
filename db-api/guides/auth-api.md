# Auth API 가이드

## 개요
JWT 기반 회원가입/로그인 인증 API.

**Base URL**: `/api/auth`

---

## POST /api/auth/register — 회원가입

**Request Body**
```json
{ "email": "user@example.com", "password": "123456" }
```

**Response 200**
```json
{ "success": true, "data": { "token": "<JWT>", "user": { "uid": "...", "email": "..." } } }
```

**에러**: `400` 누락 | `409` 중복 이메일

---

## POST /api/auth/login — 로그인

**Request Body**
```json
{ "email": "user@example.com", "password": "123456" }
```

**Response 200**
```json
{ "success": true, "data": { "token": "<JWT>", "user": { "uid": "...", "email": "...", "lastLoginAt": "..." } } }
```

**에러**: `401` 이메일 없음 또는 비밀번호 불일치

---

## POST /api/auth/logout 🔒

`Authorization: Bearer <token>` 필요. Stateless — 클라이언트가 토큰 삭제.

---

## GET /api/auth/me 🔒

**Response 200**
```json
{ "success": true, "data": { "uid": "...", "email": "...", "createdAt": "...", "lastLoginAt": "..." } }
```

---

## JWT 설정
- 유효기간: 7일 (`JWT_EXPIRES_IN`)
- 서명 키: `JWT_SECRET`
- 구현: `middleware/auth.js`, `controllers/authController.js`, `routes/auth.js`
