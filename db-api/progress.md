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

### 소셜 로그인 (OAuth) — 카카오 2026-09-10 / 구글 2026-09-17 배포
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/auth/providers` | 사용 가능한 소셜 로그인 목록. **FE 버튼 on/off 의 유일한 진실** |
| `GET /api/auth/kakao` | 카카오 인가 페이지로 302 (state = 서명된 10분 JWT) |
| `GET /api/auth/kakao/callback` | 코드→토큰→프로필→계정→우리 JWT 발급 후 FE 로 302 |
| `POST /api/auth/complete-profile` | 소셜 가입자의 위저드 완료 저장(name·age·gender·onboarding). 인증 필요 |
| `GET /api/auth/google` | 구글 동의 화면으로 302 (scope=openid email profile, prompt=select_account) |
| `GET /api/auth/google/callback` | 코드→토큰→userinfo→계정→우리 JWT 발급 후 FE 로 302 |

**구현 파일**: `controllers/oauthController.js`, `routes/auth.js`
**env**: 제공자별로 3개씩. 시크릿 2개는 GitHub Secrets, Redirect URI 는 deploy.yml 평문.
- 카카오: `KAKAO_REST_API_KEY`·`KAKAO_CLIENT_SECRET` + `KAKAO_REDIRECT_URI`
- 구글: `GOOGLE_CLIENT_ID`·`GOOGLE_CLIENT_SECRET` + `GOOGLE_REDIRECT_URI`
- 공통: `OAUTH_ALLOWED_ORIGINS`

셋 다 갖춰진 제공자만 켜진다(fail-closed). 하나라도 없으면 `providers` 가 false 를 보고하고
`/api/auth/<제공자>` 는 503 이다. **Redirect URI 를 평문으로 둔 이유**: 콘솔 등록값과 한 글자만
달라도 실패하는데(카카오 KOE006 / 구글 redirect_uri_mismatch) 값이 가려지면 대조를 못 한다.

> ⚠️ **시크릿 등록만으로는 서버에 안 들어간다.** `deploy.yml` 이 Lightsail 배포 스펙에
> env 를 한 줄씩 명시하는 구조다. 새 env 는 워크플로에도 추가해야 한다.
> 단 소셜 키(카카오·구글)는 `os.environ.get` 으로 읽어 미등록이면 항목을 뺀다 — `os.environ[]` 로 쓰면
> 키 넣기 전까지 배포 전체가 죽는다(`ADMIN_API_KEY` 와 의도가 반대).

> ⚠️ 소셜은 **콜백에서 계정이 이미 만들어진다.** 그래서 위저드 끝에서 `register` 를 부르면 409 다 —
> `complete-profile` 로 나머지를 채운다(검증은 `register` 와 같은 `buildOnboarding` 재사용).
> 카카오에서 받는 것은 **이메일·닉네임뿐**이고 나이·성별·진로답변은 위저드에서 받는다.

> ⚠️ 신원은 **카카오 회원번호(providerId)** 로만 판단한다. 이메일은 바뀔 수 있어 표시용 스냅샷일 뿐이고,
> 같은 이메일의 로컬 계정이 있어도 **자동 연결하지 않는다**(계정 탈취 경로) → `error=email_taken`.
> 이메일 동의는 선택이라 **이메일 없는 카카오 계정이 정상적으로 존재한다**(`email` 은 sparse unique).

#### 제공자가 늘어도 갈라지지 않게 (2026-09-17)

계정 정책은 `findOrCreateSocialUser` **한 곳**에 있다. 제공자는 `normalize<제공자>Profile` 로
응답 모양만 맞춰 넘긴다. 따로 두면 신원 판단·이메일 충돌·`lastLoginAt` 규칙이 반드시 갈라진다.
`signState`(state 서명)와 `issueAppToken`(우리 JWT)도 공통이다.

| | 카카오 | 구글 |
|---|---|---|
| 신원 식별자 | 회원번호(`id`) | `sub` |
| 이메일 채택 조건 | `is_email_valid && is_email_verified` | `email_verified` |
| 이름 | `kakao_account.profile.nickname` | `name` |
| scope | 콘솔 동의항목으로 정해짐(생략) | **필수** — `openid email profile` |
| 기타 | client_secret 기본 활성 | `prompt=select_account` 필수적으로 붙임 |

> ⚠️ 구글 `prompt=select_account` 가 없으면 브라우저에 구글 세션이 하나 있을 때
> **묻지도 않고** 그 계정으로 로그인되어 다른 계정으로 바꿀 방법이 없다.

> ⚠️ 미인증 이메일(`email_verified:false`)은 저장하지 않는다. 받으면 그 이메일의 주인이 아닌
> 계정이 우리 쪽 이메일 칸을 차지할 수 있다.

#### ⚠️ 복귀 URL 허용목록 — 로컬에서는 소셜 로그인을 검증할 수 없다 (2026-09-23)

`sanitizeReturnUrl` 은 `?redirect=` 가 `OAUTH_ALLOWED_ORIGINS` 밖이면 **에러가 아니라
기본값으로 대체**한다(오픈 리다이렉트 방지 — JWT 를 외부 도메인에 넘기지 않으려는 의도적 설계).

현재 값: `https://app.lighthouse.career,https://test.lighthouse.career` — **localhost 는 없다.**

그래서 로컬 FE(`localhost:5173`)에서 소셜 로그인을 누르면 **실패하지 않고 조용히
프로덕션으로 넘어가서 성공한다.**

```
localhost:5173 에서 시작
  → state.returnTo = https://app.lighthouse.career/onboarding/oauth  (localhost 가 잘림)
  → 콜백 후 프로덕션 app 에 로그인된 채 착지. 로컬은 토큰을 못 받는다
  → 위저드도 로컬 번들이 아니라 프로덕션 태그 시점 번들로 돈다
  → 신규 계정이 프로덕션 user_data.users 에 진짜로 생긴다
```

2026-09-21 에 실제로 이렇게 테스트 계정 1건이 프로덕션에 생겼다(이후 정리, 총 유저 31 → 28).

> **소셜 로그인 변경은 `test.lighthouse.career` 에 올려서 검증할 것.** 굳이 로컬이 필요하면
> `OAUTH_ALLOWED_ORIGINS` 에 `http://localhost:5173` 을 임시로 넣고 끝나면 뺀다.
> 프로덕션 허용목록에 개발 오리진을 상주시키지 말 것.

> ⚠️ 제공자측 에러(구글 `access_denied` 등)는 콜백에서 `req.query.error` 로 들어와
> **전부 `cancelled`** 로 뭉개진다. '테스트 사용자가 아님'과 '사용자가 취소함'이 구분되지 않는다.
> (2026-09-25 동의화면을 프로덕션 게시한 뒤로는 실질적으로 취소만 남는다)

> ⚠️ **비활성 계정 가드는 2026-09-25 에야 붙었다.** 그전까지 `authController.login` 은
> `isActive=false` 를 403 으로 막는데 `oauthController` 에는 검사가 **아예 없어서**,
> 비활성화된 계정이 카카오·구글로는 그대로 로그인됐다.
> 지금은 `findOrCreateSocialUser` 가 `INACTIVE` 를 돌려 `?error=inactive` 로 보낸다.

#### 가입 경로별 저장 위치 (2026-09-17 정리)

둘 다 `user_data.users` 의 같은 `User` 문서다. 갈리는 것은 **누가 채우느냐와 계정이 언제 생기느냐**다.

| User 필드 | 이메일 (`register` 1회) | 카카오 (콜백 + `complete-profile`) |
|---|---|---|
| `email` | 입력값 | 동의 시에만. 미동의면 **없음** |
| `passwordHash` | bcrypt(10) | **없음** → 이메일 로그인 영구 불가 |
| `authProviders` | `[{local, providerId: 이메일}]` | `[{kakao, providerId: 회원번호}]` |
| `name` | 위저드 입력 | 콜백이 닉네임으로 선채움 → 위저드에서 수정 |
| `age`·`gender` | 위저드 입력 | 콜백엔 없음 → `complete-profile` 에서만 |
| `onboarding` | `register` 본문에 동봉 | `complete-profile` 에서만 |
| `lastLoginAt` | `login` 이 갱신 | 콜백이 갱신 (2026-09-17 추가, 그 전엔 **안 찍혔다**) |
| 계정 생성 시점 | 위저드 **끝** | 위저드 **전**(콜백) |

> ⚠️ 카카오는 계정이 먼저 생기므로 위저드 도중 이탈하면 **나이·성별·진로답변이 빈 계정이 남는다.**
> 재진입 가드는 `apps/app` 라우터에만 있어 **test 셸에서는 검증이 불가능**하다.

> ⚠️ `lastLoginAt` 갱신은 `save()` 가 아니라 `updateOne` 이다. `save()` 는 문서 전체 검증을
> 다시 돌려서, 옛 계정에 스키마와 어긋난 값이 하나라도 있으면 **로그인 자체가 실패한다.**

**검증 공유**: 나이·성별은 `validateProfile`, 진로답변은 `buildOnboarding` 을 `register` 와
`completeProfile` 이 **같이 쓴다**(2026-09-17 통합). 그 전에는 `register` 에만 age 검증이 없어
잘못된 값이 400 이 아니라 **500**(Mongoose ValidationError)으로 샜다.
⚠️ 빈 문자열은 '보내지 않음'으로 통과시키므로 **대입부에도 `age !== ''` 가드가 필요하다**
(`Number('') === 0` → 스키마 `min:1` 위반).

### 관리자 — 가입 설문 분포 (2026-09-17 신규)

| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/admin/onboarding/stats` | 회원가입 Q1~Q3 답변 분포. `adminAuth`(x-admin-key) 뒤 |

**구현 파일**: `controllers/onboardingStatsController.js`, `routes/admin.js`
**응답**: `{ total, answered, byStatus(1~4), byConcern(1~6), bySelfAwareness(1~3) }`
(선택되지 않은 코드도 0 으로 채워 보낸다 — 화면이 흔들리지 않게)

> ⚠️ **비율의 분모는 `total` 이 아니라 `answered` 다.** `onboarding` 필드는 2026-09-09 에 생겨서
> 그 전 가입자에겐 필드 자체가 없다(2026-09-17 실측: total 29 / onboarding 있음 0 / gender 있음 22).
> 전체를 분모로 잡으면 비율이 통째로 어긋난다.

> ⚠️ `byConcern` 합계는 `answered` 를 **넘을 수 있고 그게 정상**이다. Q2 는 복수 선택이라
> `$unwind` 로 세므로 '응답자 수'가 아니라 **'선택 수'**다.

> ⚠️ 선택지 **문구는 API 에 두지 않았다.** 값은 숫자 코드뿐이고 해석표의 정본은
> FE `SignupWizardPage.vue` 와 `models/User.js` 의 OnboardingSchema 주석이다.
> API 에 복사해두면 FE 가 문구를 바꿨을 때 조용히 어긋난다.

### 유저 (User)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/user/profile` | 내 프로필 조회 |
| `PUT /api/user/profile` | 설정 수정 (settings — theme/language/notifications) |
| `DELETE /api/user` | 계정 탈퇴 (**하드 삭제** — 2026-09-25 전환. 아래 주의 참조) |
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

#### ⚠️ 회원 탈퇴는 하드 삭제다 (2026-09-25 전환)

옛 구현은 `isActive=false` 만 찍고 문서를 그대로 뒀다. 그런데 개인정보처리방침이
"탈퇴 시 지체 없이 파기"라고 공개돼 있어 사실과 달랐다(법 제21조상 파기 의무).
소프트 삭제는 **같은 소셜 계정 재가입 충돌**의 원인이기도 했다.

| 대상 | 처리 | 키 |
|---|---|---|
| `user_data.users` | 삭제 | `uid` |
| `career_plans`/`weekly_schedules`/`achievement_records`/`curriculum_completions` | 삭제 | `userUid` |
| `survey_data.survey_results` | 삭제 | `survey_id ∈ User.surveyResults` **OR** `respondent_id == uid` |
| S3 `lighthouse-uploads` | 삭제 | 접두사 `uploads/achievements/<uid>/` |
| `job_data.job_reviews` | **익명화**(submitterEmail 만 비움) | `submitterEmail == user.email` |
| `public_career_plans` | **제외** | 유저 참조 없는 큐레이션 콘텐츠 |

> ⚠️ **삭제 순서: 딸린 것 먼저, `users` 문서 맨 마지막.** 중간 실패 시 계정이 남아 같은 토큰으로
> 재시도할 수 있다. 반대로 하면 재인증이 불가능해져 고아 데이터만 남는다.
> 트랜잭션은 쓰지 않는다 — S3 가 못 들어가고 DB 3개에 걸쳐 있다.

> ⚠️ `respondent_id` 는 클라이언트가 보내는 값이라 빌 수 있다. `survey_id` 와 **OR** 로 걸어야 한다.

> ⚠️ S3 는 **접두사 기준**으로 지운다. `photoUrl` 을 훑으면 presigned 업로드만 되고 DB 기록이
> 안 남은 **고아 파일**을 놓친다.

> ⚠️ 후기는 지우지 않는다. 본문은 다른 이용자가 보는 공개 정보이고 개인 식별자는
> `submitterEmail` 하나뿐이라 그것만 비운다.

> ⚠️ **FE 에 계정 삭제 UI 가 아직 없다.** 이 엔드포인트를 호출하는 코드가 FE 전체에 0건이다.

점검용 읽기 전용 스크립트: `scripts/inspect-deletion-scope.js`, `scripts/inspect-orphans.js`.
⚠️ 후자는 버킷을 **프로덕션 값으로 명시**한다 — `config/s3.js` 기본값(`lighthouse-career-fe`)에
맡기면 엉뚱한 버킷을 본다(프로덕션은 deploy.yml 이 `lighthouse-uploads` 주입).
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
| OAuth 로그인 | **카카오 완료(2026-09-10, 라이브)**. Google/Apple 은 `providers` 에서 false 고정, 미구현 |
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

### 라이브 로그 (2026-09-23 정리)

요청 로그(morgan)는 **AWS Lightsail 컨테이너 로그에만** 남는다. 파일도 pm2 도 CloudWatch 도 아니다.
**보존은 약 3일.**

```bash
aws lightsail get-container-log --region ap-northeast-2 \
  --service-name lighthouse-api --container-name app \
  --start-time <epoch> --end-time <epoch> --filter-pattern 'auth' \
  --query 'logEvents[].{t:createdAt,m:message}' --output text
```

> ⚠️ **`--filter-pattern` 은 지정 구간 전체를 스캔하지 않는다.** 한 페이지(100건)만 훑고 멈춘다.
> 실측에서 **48h 창은 `auth=1`, 96h 창은 `auth=0`** 이 나왔다 — 넓은 창이 더 적게 잡히는
> 모순이 곧 증거다. 로그의 99%가 헬스체크(ELB 4대 × 10초 = 분당 24건)라 상한을 금방 채운다.
> **창을 4분 단위로 쪼개서** 돌 것(4분 ≈ 100건).

> ⚠️ morgan 이 쿼리스트링을 통째로 찍어 OAuth `code=`·`state=` 가 평문으로 남는다.
> 단명이라 위험은 낮지만 붙여넣을 때는 잘라낼 것. `state` 는 base64 라 디코드하면
> `returnTo` 가 바로 보인다 — 어느 도메인으로 돌아갔는지 확정하는 가장 빠른 방법.

**점검 스크립트**: `scripts/inspect-social-accounts.js` (읽기 전용, `d5c6314`) —
소셜 계정 전량 + 계정별 딸린 데이터 건수. 계정 정리 전 고아 확인용.

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
