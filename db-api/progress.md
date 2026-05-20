# DB API 진행상황

**프로젝트**: lighthouse_DB_API
**스택**: Node.js + Express + MongoDB (Mongoose)
**배포**: 홈서버(port 3000) → CloudFront → api.lighthouse.career

## 완성된 기능 ✅

### 인증 (Auth) — 2026-05-19 구현
| 엔드포인트 | 설명 |
|-----------|------|
| `POST /api/auth/register` | 회원가입 (이메일+비밀번호, JWT 발급) |
| `POST /api/auth/login` | 로그인 (JWT 발급, lastLoginAt 갱신) |
| `POST /api/auth/logout` | 로그아웃 (클라이언트 토큰 삭제 안내) |
| `GET /api/auth/me` | 현재 유저 정보 조회 (토큰 검증) |

**인증 방식**: JWT Bearer Token (7일 유효, `process.env.JWT_SECRET`)
**구현 파일**: `middleware/auth.js`, `controllers/authController.js`, `routes/auth.js`
**테스트 계정**: email: `test`, password: `test`

### 유저 (User) — 2026-05-19 구현
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/user/profile` | 내 프로필 조회 |
| `PUT /api/user/profile` | 설정 수정 (settings — theme/language/notifications) |
| `DELETE /api/user` | 계정 탈퇴 (isActive: false 소프트 삭제) |
| `POST /api/user/survey-results` | 설문 결과를 유저에 연결 |
| `GET /api/user/survey-results` | 내 설문 결과 목록 조회 |
| `GET /api/user/bookmarks` | 북마크 직업 목록 조회 (job_data join) |
| `POST /api/user/bookmarks/:jobCode` | 직업 북마크 추가 |
| `DELETE /api/user/bookmarks/:jobCode` | 직업 북마크 삭제 |
| `POST /api/user/devices` | FCM 기기 토큰 등록/갱신 (deviceId 기준) |
| `DELETE /api/user/devices/:deviceId` | FCM 기기 토큰 제거 |
| `POST /api/user/recommended-jobs` | 종합 추천 직업 저장 (jobCodes 배열, 최대 30) |

**구현 파일**: `controllers/userController.js`, `routes/user.js`
**User 스키마**: `models/User.js` → `user_data.users` 컬렉션
**추가 필드 (2026-05-20)**: `recommendedJobs: [String]` — 종합 추천 직업 jobCode 목록

### 설문 (Survey)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/survey/form` | 설문지 조회 (survey_id 자동 생성, 시드 기반 셔플) |
| `POST /api/survey/response` | 응답 제출 + 통계 자동 업데이트 |
| `POST /api/survey/report` | 결과 보고서 (정규화/그룹통계/상위%) |
| `GET /api/survey/statistics` | 전체 통계 조회 |
| `GET /api/survey/result/list` | 응답 목록 (페이지네이션) |
| `GET /api/survey/analysis/:survey_id` | 설문 분석 결과 (personality_type 포함) |
| `GET /api/survey/t1-result/:survey_id` | T1 성격 유형 결과 |

### 직업 (Job)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/job/list` | 전체 직업 목록 (페이지네이션, 필터) |
| `GET /api/job/classifications` | 대분류→소분류 트리 |
| `GET /api/job/majors` | 관련학과 전체 목록 |
| `GET /api/job/search?name=` | 직업명 검색 |
| `GET /api/job/:jobCode` | 직업 단건 상세 조회 |
| `POST /api/job` | 직업 생성 |
| `PUT /api/job/:jobCode` | 직업 수정 |
| `DELETE /api/job/:jobCode` | 직업 삭제 |

### 직업 추천 / 매칭 (Recommend)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/job/recommend/:survey_id` | survey_id 기반 직업 추천 (최대 30건) |
| `POST /api/job/recommend` | 점수 직접 전달 추천 (테스트용) |
| `GET /api/job/recommend-t2/:survey_id` | T2 전용 직업 추천 (상위 5건) — 2026-05-15 추가 |
| `GET /api/job/:jobCode/match?survey_id=` | 특정 직업 매칭 점수 |
| `POST /api/job/:jobCode/match` | 점수 직접 전달 매칭 |

**종합 매칭 알고리즘**: T1×0.20 + T21×0.25 + T22×0.25 + T23×0.20 + T3×0.10
**T2 전용 알고리즘**: T21(재능)×0.36 + T22(흥미)×0.36 + T23(가치관)×0.28

### 직업 후기 (Review) — 2026-05-07 구현
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/job/:jobCode/reviews` | 승인된 후기 목록 (FE 조회용) |
| `POST /api/job/:jobCode/reviews` | 사용자 후기 제출 (pending 상태, 현재 미노출) |
| `GET /api/admin/reviews` | 전체 후기 목록 (status/jobCode 필터, 페이지네이션) |
| `POST /api/admin/reviews` | 어드민 직접 후기 등록 (approved 자동) |
| `PUT /api/admin/reviews/:id` | 후기 승인/반려/내용 수정 |
| `DELETE /api/admin/reviews/:id` | 후기 삭제 |

> FE에서는 후기 작성 버튼 제거 — 후기는 Admin에서만 등록/관리
> `job_data.job_reviews` 컬렉션 생성 완료, 테스트 더미 4건(013601) 삽입됨

### 참조 데이터 (Reference)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST/PUT/DELETE /api/reference/survey-elements` | 설문 요소 CRUD |
| `GET/POST/PUT/DELETE /api/reference/career-attributes` | 진로백과 속성 CRUD |
| `GET /api/reference/t1-types` | T1 성격 유형 목록 |
| `GET /api/reference/t1-types/:type_code` | T1 성격 유형 단건 |

### 관리자 (Admin)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST/PUT/DELETE /api/admin/questions/:collection_type` | 질문 CRUD |
| `GET /api/admin/t1-types` | T1 유형 목록 |
| `PUT /api/admin/t1-types/:type_code` | T1 유형 텍스트 수정 |

## 미완성 기능 ⚠️

| 항목 | 비고 |
|------|------|
| `GET /api/job/:jobCode/preparation` | 미구현 |
| `GET /api/job/:jobCode/recruitment` | 미구현 |
| Admin 인증 미들웨어 | `/api/admin` 전체 오픈 상태 |
| OAuth 로그인 | Google/Kakao provider 스키마는 준비됨, 구현 미완 |
| 테스트 코드 | 없음 |

## 인프라 / 서버 설정

### CORS (2026-05-07 수정)
```js
app.use(cors());
app.options('*', cors());  // OPTIONS preflight 명시적 처리 추가
```
**배경**: 브라우저의 cross-origin 요청 시 preflight OPTIONS 요청이 CloudFront를 통해 504를 반환하던 문제 수정.
GitHub Actions → 홈서버 자동 배포 완료.

### 배포
- GitHub `main` 브랜치 push → `.github/workflows/deploy.yml` 자동 실행
- 홈서버: `git pull` → `npm install --omit=dev` → `pm2 reload lighthouse-db-api --update-env`
- SSH 인증: 패스워드 인증 (`SSH_HOST`, `SSH_USER=root`, `SSH_PASSWORD`)

## DB 현황 (2026-05-19 기준)

| DB | 컬렉션 | 건수 | 비고 |
|----|--------|------|------|
| user_data | users | 2건+ | User 스키마 구현, 테스트 계정 포함 |
| job_data | job_info | 537건 | details 정규화 완료 |
| job_data | job_reviews | 4건 | 013601 테스트 더미 |
| reference_data | survey_elements | 239건 | |
| reference_data | career_attributes | 202건 | |
| reference_data | t1_types | 145건 | |
| survey_questions | T1_personality | 43건 | |
| survey_questions | T2_1_talent | 61건 | |
| survey_questions | T2_2_interest | 33건 | |
| survey_questions | T2_3_values | 13건 | |
| survey_questions | T3_environmental | 6건 | 파트 도큐먼트 |
| survey_data | survey_results | 42건+ | |
| survey_data | survey_statistics | 2건+ | |

## Swagger API 문서

- **로컬**: `http://localhost:3000/api-docs`
- **프로덕션**: `https://api.lighthouse.career/api-docs`
- **Bearer 인증**: Swagger UI 우상단 `Authorize` 버튼에 토큰 입력
