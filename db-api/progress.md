# DB API 진행상황

**프로젝트**: lighthouse-api
**스택**: Node.js + Express + MongoDB (Mongoose) + Docker
**배포**: ~~홈서버(port 3000) → CloudFront~~ → **AWS Lightsail 컨테이너(서울, port 8080)** → api.lighthouse.career (2026-06-25 클라우드 이전)
- 이미지: `ghcr.io/gwon6482/lighthouse-api`(public). CI: `main push → Docker 빌드 → ghcr push → Lightsail 자동 재배포`
- DB는 MongoDB Atlas(클라우드), 파일 업로드는 S3. 상세는 `devlog/2026-06-25.md`

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
**타임라인 주차 모델 (2026-08-28, `cce2853`)**: `TimelineSlotSchema.month`(required 'YYYY.MM') → **`week: Number`**(1-based 시작주차).
`month`는 legacy optional로 잔존. **시작주만 저장하고 점유 구간은 저장하지 않는다** — 저장하면 프로젝트 기간 수정 시 둘이 어긋난다.
주차 경계 정본은 FE `usePlanTimeline`(월~일 달력 주, `startDate`가 속한 주 = 1주차).
`_weekFromLegacyMonth`가 `week` 없는 구 문서를 read 시 환산해서 내려주고, `saveTimeline`은 week 정수·1이상·프로젝트 존재분만 저장한다.
같은 커밋에서 `CurriculumWeekSchema.description`(주차당 설명 1건) 추가, `items`는 레거시 읽기 호환으로 유지.
⚠️ 주 경계가 바뀌어 기존 `WeeklySchedule.weekStart`는 새 계산과 어긋난다(구 레코드 미조회 → 새로 생성, 고아 잔존).
**실측(2026-08-28)**: `weekly_schedules` 18건 중 7건이 구 경계(weekStart 가 월요일 아님, 2026-07-01~08-27 생성),
`career_plans` 21건 중 15건에 타임라인·14건에 레거시 month 슬롯. 전부 테스트 데이터로 확인돼 마이그레이션은 생략했다.
단순히 weekStart 를 월요일로 옮기는 마이그레이션은 안 된다 — 구 주는 `weekStart..+6`(예: 수~화)이라
새 월~일 창 밖으로 나가는 항목이 레코드당 1~8건 생긴다. 항목 재분배가 필요하다.
점검은 `scripts/inspect-timeline-week-data.js`(읽기 전용)로 언제든 다시 셀 수 있다.

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

### 진로달성 기록 (Achievement) — 2026-06-15 구현 ✅ 배포 완료
진로달성 모듈의 실제 달성 행위(완료 토글 / 인증사진·난이도·메모 / 커리큘럼 체크)를 서버 영속화.
이전에는 전부 브라우저 localStorage 에만 저장되어 기기 변경 시 소실되던 데이터. 인증사진은 base64 를 DB 에 넣지 않고 **S3 presigned 업로드 후 URL 만 저장**.

> 상태: **운영 반영 완료** (2026-08-07 실측 확인). 오랫동안 "배포 대기"로 잘못 적혀 있던 항목 — 정정함.
> - 프로덕션 `POST /api/career-plan/uploads/presign`, `GET/PUT/DELETE /api/career-plan/:planId/achievements/...` 모두 **401 응답**(=라우트 생존, 인증 요구).
> - S3 `lighthouse-uploads` 버킷 CORS 설정 완료 — `AllowedMethods: PUT/GET/HEAD`, `AllowedOrigins: app·test.lighthouse.career + localhost:5173`.
> - FE(`modules/career-achievement/achievement.api.ts`)도 `presignUpload`/`uploadPhoto`까지 배선 완료. localStorage는 **오프라인 캐시**일 뿐 서버가 source of truth.
>
> ⚠️ 찾을 때 주의: 라우트가 `routes/achievement.js`가 아니라 **`routes/careerPlan.js`**에 들어있다. 파일명으로 찾으면 없는 것처럼 보인다.

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
| OAuth 로그인 | Google/Kakao provider 스키마 준비됨, 구현 미완 |
| 테스트 코드 | 없음 |
| CORS 오리진 화이트리스트 | 현재 전체 허용(`app.use(cors())`). 모바일 오리진 확정 후 예정 |

---

## 보안 (2026-07-31 강화) 🔒

관리자/서비스 API 인증 감사 후 다음을 적용(배포·라이브 검증 완료).

| 조치 | 내용 |
|------|------|
| `/api/admin/*` 인증 | `adminAuth` 미들웨어(`x-admin-key` 상수시간 비교, `ADMIN_API_KEY` 미설정 시 503 fail-closed). Admin은 Vercel 서버 프록시(`/api/proxy`)가 NextAuth 세션 검증 후 키를 서버사이드 주입 |
| 공개 쓰기 차단 | `job` `POST/PUT/DELETE`, `reference` `POST/PUT/DELETE`(survey-elements·career-attributes), `survey` `POST /statistics/update`·`GET /result/list`에 `adminAuth`. GET 조회는 공개 유지 |
| 검사결과 IDOR | `GET /analysis/:survey_id`·`/t1-result/:survey_id`에 `authenticate` + 소유권(`User.surveyResults`, 미소유 시 claim-on-read). `POST /report`는 관리자 전용(`adminAuth`) |
| 레이트리밋 | `express-rate-limit` + `trust proxy 1`. `/login`(실패 10회/10분, 성공 제외), `/check-email`(30회/10분) |
| env | `ADMIN_API_KEY`를 GitHub Secret(lighthouse-api)·Vercel(lighthouse-admin) 양쪽 동일값. 배포 순서 Admin→API |

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
| user_data | achievement_records | — | 2026-06-15 신규, 배포 완료 |
| user_data | curriculum_completions | — | 2026-06-15 신규, 배포 완료 |
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

## 설문 문항 카피 교정 (2026-07-23)

`survey_questions` DB 문항 텍스트 22건 교정 (프로덕션 Atlas 직접 반영, 스키마·유저응답 무관):
- T1(question_text) 오탈자 5 + 따옴표→자기서술 2 + 주어 "나는" 통일 10
- T21(question_text) 유일한 질문형 → 서술형 1 (`편인가요?`→`편이다.`)
- T23(value_question) 오탈자 2 (프로젝트를통해, 주변으로 부터)
- T3(part_name) 파트명 2: 커뮤니케이션 강도→소통 강도, 업무 유동성→업무 변화 강도
- 제외: T3 존댓말 질문 어투(part_question) 통일은 보류.

## Swagger API 문서

- **로컬**: `http://localhost:3000/api-docs`
- **프로덕션**: `https://api.lighthouse.career/api-docs`
