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

### 유저 (User)
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
| `POST /api/user/recommended-jobs` | 종합 추천 직업 저장 (jobCodes 배열, 최대 30) |
| `POST /api/user/devices` | FCM 기기 토큰 등록/갱신 (deviceId 기준) |
| `DELETE /api/user/devices/:deviceId` | FCM 기기 토큰 제거 |
| `GET /api/user/target-career` | 목표 진로 조회 (2026-05-21) |
| `PUT /api/user/target-career` | 목표 진로 설정/변경/삭제 (2026-05-21) |

**구현 파일**: `controllers/userController.js`, `routes/user.js`
**User 스키마**: `models/User.js` → `user_data.users` 컬렉션

#### User 스키마 주요 필드 (2026-05-21 기준)
```js
surveyResults:     [String]          // survey_id 참조
bookmarkedJobs:    [String]          // jobCode 참조
recommendedJobs:   [String]          // jobCode 참조 (최대 30)
targetCareer: {                      // 목표 진로 (2026-05-21 추가)
  refType: 'jobCode' | 'custom',     // 진로백과 직업 or 사용자 지정
  ref:     String                    // jobCode 또는 custom UID/이름
}
careerDesigns:     [String]          // 추후 careerDesign 컬렉션 UID
careerAchievements:[String]          // 추후 careerAchievement 컬렉션 UID
settings:          SettingsSchema
devices:           [DeviceSchema]
```

#### targetCareer API 동작 규칙
- `GET`: refType이 'jobCode'이면 job_info에서 title·classification 함께 반환
- `PUT body null 또는 ref 없음`: targetCareer 삭제
- `PUT refType='jobCode'`: jobCode 존재 여부 검증 후 저장
- `PUT refType='custom'`: 진로백과에 없는 직업명 자유 입력, 검증 없음

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

#### T23 survey/form 응답 추가 필드 (2026-05-21)
T23 items에 `value_code`, `value_name` 필드 추가됨:
```js
{ item_id, value_code, value_name, item_text, item_definition }
```

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
| `GET /api/job/recommend-t2/:survey_id` | T2 전용 직업 추천 (상위 5건) |
| `GET /api/job/:jobCode/match?survey_id=` | 특정 직업 매칭 점수 |
| `POST /api/job/:jobCode/match` | 점수 직접 전달 매칭 |

**종합 매칭 알고리즘**: T1×0.20 + T21×0.25 + T22×0.25 + T23×0.20 + T3×0.10
**T2 전용 알고리즘**: T21(재능)×0.36 + T22(흥미)×0.36 + T23(가치관)×0.28

### 직업 후기 (Review) — 2026-05-07 구현
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/job/:jobCode/reviews` | 승인된 후기 목록 (FE 조회용) |
| `POST /api/job/:jobCode/reviews` | 사용자 후기 제출 (pending 상태) |
| `GET /api/admin/reviews` | 전체 후기 목록 (Admin) |
| `POST /api/admin/reviews` | 어드민 직접 후기 등록 |
| `PUT /api/admin/reviews/:id` | 후기 승인/반려/수정 |
| `DELETE /api/admin/reviews/:id` | 후기 삭제 |

### 참조 데이터 (Reference)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST/PUT/DELETE /api/reference/survey-elements` | 설문 요소 CRUD |
| `GET/POST/PUT/DELETE /api/reference/career-attributes` | 진로백과 속성 CRUD |
| `GET /api/reference/t1-types` | T1 성격 유형 목록 |
| `GET /api/reference/t1-types/:type_code` | T1 성격 유형 단건 |

### 진로계획 (CareerPlan) — 2026-05-21 구현
| 엔드포인트 | 설명 |
|-----------|------|
| `POST /api/career-plan` | 계획 생성 (STEP1 — name/targetJob/startDate/endDate) |
| `GET /api/career-plan` | 내 계획 목록 |
| `GET /api/career-plan/:planId` | 계획 상세 조회 |
| `PUT /api/career-plan/:planId` | 계획 기본 정보 수정 |
| `DELETE /api/career-plan/:planId` | 계획 삭제 |
| `POST /api/career-plan/:planId/projects` | 프로젝트 추가 (STEP2) |
| `PUT /api/career-plan/:planId/projects/:projId` | 프로젝트 수정 |
| `DELETE /api/career-plan/:planId/projects/:projId` | 프로젝트 삭제 |
| `POST /api/career-plan/:planId/routines` | 루틴 추가 (2026-05-26) |
| `PUT /api/career-plan/:planId/routines/:routineId` | 루틴 수정 (2026-05-26) |
| `DELETE /api/career-plan/:planId/routines/:routineId` | 루틴 삭제 (2026-05-26) |
| `PUT /api/career-plan/:planId/timeline` | 타임라인 저장 (STEP3) |
| `GET /api/career-plan/templates?q=` | 공개 진로계획 템플릿 목록 (인증 불필요, 2026-05-21) |

**구현 파일**: `models/CareerPlan.js`, `models/PublicCareerPlan.js`, `controllers/careerPlanController.js`, `routes/careerPlan.js`
**DB**: `user_data.career_plans` — projects/routines/timeline은 CareerPlan에 embedded
**Routine 스키마**: `name`(필수), `days[]`, `duration`(분), `notificationTime`("HH:MM"), `notification`(bool), `memo`
**공개 템플릿 DB**: `user_data.public_career_plans` — 시드 3건 (마케팅 기획자/퍼포먼스 마케터/신입 마케터)
**reviewDay 필드 (2026-05-28)**: `CareerPlan.reviewDay: String` 추가. 일주일의 끝이자 시작이 되는 요일 ('월'~'일'). create/update 모두 수용.

### 주간 일정 (WeeklySchedule) — 2026-05-28 Phase 1
진로계획 본체는 마스터 데이터로 가볍게 두고, 매주 한 번씩 그 주에 실제로 잡힌 일정만 별도 컬렉션에 저장한다.
일정이 밀리거나 변경되면 그 주 schedule 1건만 수정 → 진로계획 본체 무변동 → 가벼움.

| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/career-plan/:planId/weekly-schedule` | 그 plan 의 모든 주간 일정 (weekStart desc) |
| `GET /api/career-plan/:planId/weekly-schedule/:weekStart` | 특정 주 1건 (없으면 schedule=null) |
| `POST /api/career-plan/:planId/weekly-schedule` | 신규 생성 (body: weekStart, weekEnd, items?). 중복 weekStart 면 409 + 기존 schedule 반환 |
| `PUT /api/career-plan/:planId/weekly-schedule/:weekStart` | 부분 업데이트 (items / weekEnd / reviewNote / status). status='reviewed' 면 reviewedAt 자동 기록 |
| `DELETE /api/career-plan/:planId/weekly-schedule/:weekStart` | 삭제 |

**스키마** (`user_data.weekly_schedules`, planId+weekStart 유니크 인덱스):
- `scheduleId` (uuid), `planId`, `userUid`, `weekStart`/`weekEnd` ('YYYY-MM-DD')
- `items: [{ id, itemType:'project'|'routine', itemId, date, curriculumWeek?, note }]`
- `status:'pending'|'reviewed'`, `reviewedAt`, `reviewNote`

**구현 파일**: `models/WeeklySchedule.js`, `controllers/weeklyScheduleController.js`, `routes/careerPlan.js` (기존 라우터에 endpoint 추가)

### 진로달성 기록 (Achievement) — 2026-06-15 구현 ⚠️ 배포 대기
진로달성 모듈의 실제 달성 행위(완료 토글 / 인증사진·난이도·메모 / 커리큘럼 체크)를 서버 영속화.
이전에는 전부 브라우저 localStorage 에만 저장되어 기기 변경 시 소실되던 데이터. 인증사진은 base64 를 DB 에 넣지 않고 **S3 presigned 업로드 후 URL 만 저장**.

> 상태: **코드 구현 + 로컬 검증 완료 / 미배포**. 운영 반영 전 AWS 버킷 CORS·운영 env(`S3_UPLOAD_PUBLIC_BASE`)·IAM PutObject 확인 필요.

| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/career-plan/:planId/achievements?from=&to=` | 달성 기록 목록 (완료상태 복원 + 피드, date 범위) |
| `PUT /api/career-plan/:planId/achievements/:date/:itemType/:itemId` | upsert (단순 완료 토글 ~ 전체 인증 기록) |
| `DELETE /api/career-plan/:planId/achievements/:date/:itemType/:itemId` | 삭제 (완료 토글 off) |
| `GET /api/career-plan/:planId/curriculum` | 커리큘럼 항목 완료 목록 |
| `PUT /api/career-plan/:planId/curriculum/:projectId/:week/:idx` | 커리큘럼 항목 토글 (body.done=false 면 해제) |
| `POST /api/career-plan/uploads/presign` | 인증사진 S3 presigned PUT URL 발급 (body: contentType → uploadUrl/fileUrl/key) |

**스키마**:
- `user_data.achievement_records` — `(userUid, planId, date, itemType, itemId)` 유니크 + `(userUid, planId, doneAt desc)` 피드 인덱스. 필드: `done`, `itemName`, `itemCategory`, `duration`, `elapsedSec`, `doneAt`, `photoUrl`, `difficulty`(1~5), `note`, `curriculumWeek`
- `user_data.curriculum_completions` — `(userUid, planId, projectId, week, idx)` 유니크, `done`

**S3**: `config/s3.js` (region `ap-northeast-2`, env 또는 ~/.aws 자격증명), key `uploads/achievements/{uid}/{uuid}.jpg`, presign 만료 5분. 의존성 `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`.

**구현 파일**: `models/AchievementRecord.js`, `models/CurriculumCompletion.js`, `config/s3.js`, `controllers/achievementController.js`, `routes/careerPlan.js`. 소유권 검증은 weeklyScheduleController 의 `ensureOwnedPlan` 패턴 재사용.

### 관리자 (Admin)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST/PUT/DELETE /api/admin/questions/:collection_type` | 질문 CRUD |
| `GET /api/admin/t1-types` | T1 유형 목록 |
| `PUT /api/admin/t1-types/:type_code` | T1 유형 텍스트 수정 |

---

## 미완성 기능 ⚠️

| 항목 | 비고 |
|------|------|
| `GET /api/job/:jobCode/recruitment` | 워크넷 공식 API 연동 예정 |
| `GET /api/job/:jobCode/preparation` | 미구현 |
| Admin 인증 미들웨어 | `/api/admin` 전체 오픈 상태 |
| OAuth 로그인 | Google/Kakao provider 스키마 준비됨, 구현 미완 |
| 테스트 코드 | 없음 |

---

## 인프라 / 배포

### 배포 방식
- GitHub `main` 브랜치 push → `.github/workflows/deploy.yml` 자동 실행
- 홈서버: `git pull` → `npm install --omit=dev` → `pm2 reload lighthouse-db-api --update-env`
- SSH 인증: `SSH_HOST`, `SSH_USER=root`, `SSH_PASSWORD`

### CORS
```js
app.use(cors());
app.options('*', cors());  // OPTIONS preflight 처리
```

---

## DB 현황 (2026-05-21 기준)

| DB | 컬렉션 | 건수 | 비고 |
|----|--------|------|------|
| user_data | users | 2건+ | targetCareer 필드 추가됨 |
| user_data | career_plans | 0건 | 2026-05-21 신규 생성 |
| user_data | public_career_plans | 3건 | 2026-05-21 신규, 마케팅 직군 예시 3종 시드 |
| user_data | weekly_schedules | — | 2026-05-28 신규 |
| user_data | achievement_records | — | 2026-06-15 신규 ⚠️ 배포 대기 |
| user_data | curriculum_completions | — | 2026-06-15 신규 ⚠️ 배포 대기 |
| job_data | job_info | 537건 | details 정규화 완료 |
| job_data | job_reviews | 4건 | 013601 테스트 더미 |
| reference_data | survey_elements | 239건 | |
| reference_data | career_attributes | 202건 | |
| reference_data | t1_types | 145건 | |
| survey_questions | T1_personality | 43건 | |
| survey_questions | T2_1_talent | 61건 | |
| survey_questions | T2_2_interest | 33건 | |
| survey_questions | T2_3_values | 13건 | |
| survey_questions | T3_environmental | 6건 | |
| survey_data | survey_results | 42건+ | |
| survey_data | survey_statistics | 2건+ | |

## Swagger API 문서

- **로컬**: `http://localhost:3000/api-docs`
- **프로덕션**: `https://api.lighthouse.career/api-docs`
