# 고용24 OPEN-API 사용 가이드

한국고용정보원 고용24 OPEN-API 13개 서비스 · 43개 API(탭 포함)의 사용 가이드.
원본 명세(https://www.work24.go.kr/cm/e/a/0110/selectOpenApiIntro.do)를 정리하고 **승인받은 키로 실제 호출해 확인**했다(2026-10-16).

## 꼭 알아둘 것
- **인증키는 서비스마다 다르다.** 다른 서비스 키로 부르면 `<error>신청하신 OpenApi 서비스가 존재하지 않습니다</error>`.
  키는 `lighthouse-api/.env` 의 `WORK24_KEY_<서비스>` (아래 표). **값을 문서·코드·채팅에 적지 말 것.** 배포에 쓰려면 GitHub Secrets 에도 같은 이름으로.
- 응답은 대부분 **XML**(UTF-8). 직무정보(40·41)는 JSON. 오류도 HTTP 200 으로 오고 본문의 `<error>`·`<message>` 로 알린다 — 상태코드로 성공을 판단하지 말 것.
- 상세 API 는 목록 응답의 ID 가 필요하다(공고번호·훈련과정ID·사업ID 등).
- 원본 명세 HTML 은 로컬 `LighthouseProject/reference /work24-openapi/` 에도 있다.

## 서비스 · 키 · 호출 결과

| 서비스 | 키(환경변수) | 문서 | API | 결과 |
|---|---|---|---|---|
| 국민내일배움카드 훈련과정 | `WORK24_KEY_TRAIN_CARD` | [train-card.md](train-card.md) | 목록 | ✅ |
|  |  |  | 과정/기관정보 | ✅ |
|  |  |  | 훈련일정 | ✅ |
| 사업주훈련 훈련과정 | `WORK24_KEY_TRAIN_EMPLOYER` | [train-employer.md](train-employer.md) | 목록 | ✅ |
|  |  |  | 과정/기관정보 | ✅ |
|  |  |  | 훈련일정 | ✅ |
| 국가인적자원개발 컨소시엄 훈련과정 | `WORK24_KEY_TRAIN_CONSORTIUM` | [train-consortium.md](train-consortium.md) | 목록 | ✅ |
|  |  |  | 과정/기관정보 | ✅ |
|  |  |  | 훈련일정 | ✅ |
| 일학습병행 훈련과정 | `WORK24_KEY_TRAIN_WORKSTUDY` | [train-workstudy.md](train-workstudy.md) | 목록 | ✅ |
|  |  |  | 과정/기관정보 | ✅ |
|  |  |  | 훈련일정 | ✅ |
| 채용정보 | `WORK24_KEY_RECRUIT` | [recruit.md](recruit.md) | 채용정보 | ✅ |
|  |  |  | 채용정보상세 | ✅ |
|  |  |  | 채용행사 | ✅ |
|  |  |  | 채용행사상세 | ✅ |
|  |  |  | 공채속보 | ✅ |
|  |  |  | 공채기업정보 | ✅ |
|  |  |  | 임금체불 명단공개 사업주 여부 | ✅ |
| 정부지원일자리정보 | `WORK24_KEY_GOV_JOBS` | [gov-jobs.md](gov-jobs.md) | 참여자모집정보 | ✅ |
|  |  |  | 참여자모집상세정보 | ✅ |
|  |  |  | 일자리사업정보 | ✅ |
|  |  |  | 일자리사업상세정보 | ✅ |
|  |  |  | 기관기본정보 | ❌ |
|  |  |  | 참여자통계 | ✅ |
| 구직자취업역량 강화프로그램 | `WORK24_KEY_JOBSEEKER_PROGRAM` | [jobseeker-program.md](jobseeker-program.md) | 구직자취업역량 강화프로그램 | ✅ |
| 학과정보 | `WORK24_KEY_MAJOR` | [major.md](major.md) | 학과정보 목록 | ✅ |
|  |  |  | 일반학과 상세 | ✅ |
|  |  |  | 이색학과 상세 | ❌ |
| 직업정보 | `WORK24_KEY_JOB_INFO` | [job-info.md](job-info.md) | 직업정보 | ✅ |
|  |  |  | 직업정보 상세 | ✅ |
|  |  |  | 직업사전 | ✅ |
| 강소기업 | `WORK24_KEY_SMALL_GIANT` | [small-giant.md](small-giant.md) | 강소기업 | ✅ |
|  |  |  | 강소기업현장탐방기 | ✅ |
|  |  |  | 청년강소기업체험 | ✅ |
|  |  |  | 청년친화강소기업 | ✅ |
| 공통코드 | `WORK24_KEY_COMMON_CODE` | [common-code.md](common-code.md) | 채용(지역,직종,종류 등) | ✅ |
|  |  |  | 훈련(KECO,NCS,훈련종류 등) | ✅ |
| 심리검사 | `WORK24_KEY_PSY_TEST` | [psy-test.md](psy-test.md) | 심리검사결과 | ⏭️ |
|  |  |  | (신규) 심리검사결과 | ⏭️ |
|  |  |  | 한국고용직업분류 매핑코드 | ❌ |
| 직무정보 | `WORK24_KEY_DUTY` | [duty.md](duty.md) | 표준직무기술서 | ✅ |
|  |  |  | 직무데이터사전 | ✅ |

✅ 호출 확인 38 · ❌ 실패 3 · ⏭️ 호출 안 함 2 (전체 43)

실패·미호출 이유는 각 문서의 ⚠️ 참조.
