# DB API 진행상황

**프로젝트**: lighthouse_DB_API
**스택**: Node.js + Express + MongoDB (Mongoose) + Vercel
**배포**: Vercel (vercel.json 설정 완료)

## 완성된 기능 ✅

### 설문 (Survey)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/survey/form` | 설문지 조회 (survey_id 자동 생성, 시드 기반 셔플) |
| `POST /api/survey/response` | 응답 제출 + 통계 자동 업데이트 |
| `POST /api/survey/report` | 결과 보고서 (정규화/그룹통계/상위%) |
| `GET /api/survey/statistics` | 전체 통계 조회 |
| `GET /api/survey/result/list` | 응답 목록 (페이지네이션, page/limit 파라미터 지원) |
| `GET /api/survey/analysis/:survey_id` | 설문 분석 결과 (성격·재능 Top3/전체, 관심분야, 가치관, 환경 선호도) |

### 직업 (Job)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/job/list` | 전체 직업 목록 조회 (페이지네이션, 대분류/소분류/학과 필터) |
| `GET /api/job/classifications` | 대분류→소분류 트리 조회 (필터 드롭다운용) |
| `GET /api/job/majors` | 관련학과 전체 고유 목록 조회 (130개) |
| `GET /api/job/search?name=` | 직업명 검색 |
| `GET /api/job/:jobCode` | 직업 단건 상세 조회 |
| `POST /api/job` | 직업 생성 (jobCode 중복 시 409) |
| `PUT /api/job/:jobCode` | 직업 정보 수정 (jobCode 변경 불가) |
| `DELETE /api/job/:jobCode` | 직업 삭제 |

#### GET /api/job/list — Query Parameters
| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---------|------|------|--------|------|
| `page` | integer | N | 1 | 페이지 번호 |
| `limit` | integer | N | 50 | 페이지당 항목 수 (최대 100) |
| `primary` | string | N | - | 대분류 필터 (`classification.primary` 일치) |
| `secondary` | string | N | - | 소분류 필터 (`classification.secondary` 일치) |
| `major` | string | N | - | 관련학과 필터 (`relatedMajors` 배열에 포함) |

**Response 필드**: `jobCode`, `title`, `classification`, `salary`, `jobSatisfaction`, `relatedMajors`, `relatedCertifications`  
**미포함 필드**: `overview`, `duties`, `details` (무거운 필드는 단건 조회에서만 제공)

#### GET /api/job/classifications — Response 구조
```json
{ "대분류명": ["소분류명", ...] }
```
대분류 10개, 소분류 387개. Admin 필터 드롭다운 구성에 사용.

#### GET /api/job/majors — Response 구조
```json
{ "success": true, "count": 130, "data": ["학과명", ...] }
```

### 참조 데이터 (Reference)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/reference/survey-elements` | 설문 요소 정의 목록 (test_code, area, level, parent_code 필터) |
| `POST /api/reference/survey-elements` | 설문 요소 생성 (code 중복 시 409) |
| `GET /api/reference/survey-elements/:code` | 설문 요소 단건 (sub이면 parent도 반환) |
| `PUT /api/reference/survey-elements/:code` | 설문 요소 수정 (code 변경 불가) |
| `DELETE /api/reference/survey-elements/:code` | 설문 요소 삭제 |
| `GET /api/reference/career-attributes` | 진로백과 속성 목록 (category 필터) |
| `POST /api/reference/career-attributes` | 진로백과 속성 생성 (code 중복 시 409) |
| `GET /api/reference/career-attributes/:code` | 진로백과 속성 단건 |
| `PUT /api/reference/career-attributes/:code` | 진로백과 속성 수정 (code 변경 불가) |
| `DELETE /api/reference/career-attributes/:code` | 진로백과 속성 삭제 |

### 관리자 (Admin)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST/PUT/DELETE /api/admin/questions/:collection_type` | 질문 CRUD |

## 미완성 기능 ⚠️

| 항목 | 파일 | 비고 |
|------|------|------|
| `GET /api/job/recommend` | - | Frontend 연동 목록에 있으나 미구현 |
| `GET /api/job/:jobCode/review` | - | Frontend 연동 목록에 있으나 미구현 |
| `GET /api/job/:jobCode/preparation` | - | Frontend 연동 목록에 있으나 미구현 |
| `GET /api/job/:jobCode/recruitment` | - | Frontend 연동 목록에 있으나 미구현 |
| 인증 미들웨어 | `/api/admin` 전체 오픈 상태 | 구현 필요 |
| 테스트 코드 | - | 없음 |

## DB 현황 (2026-04-08 기준 실측)

| DB | 컬렉션 | 건수 |
|----|--------|------|
| job_data | job_info | 537건 |
| reference_data | survey_elements | 239건 |
| reference_data | career_attributes | 202건 |
| survey_data | survey_questionnaire | 148건 |
| survey_data | survey_results | 42건 |
| survey_data | survey_statistics | 2건 |
| survey_questions | T1_personality | 43건 |
| survey_questions | T2_1_talent | 61건 |
| survey_questions | T2_2_interest | 33건 |
| survey_questions | T2_3_values | 13건 |
| survey_questions | T3_environmental | 6건 (파트 도큐먼트로 교체) |

## DB 컬렉션 상세

### reference_data.survey_elements (239건)
설문 검사 요소 정의. `test_code` + `area` + `level` 필드로 구분.

| test_code | area | level | 건수 |
|-----------|------|-------|------|
| T1 | personality | upper/sub | 52건 |
| T21 | talent | upper/sub | 69건 |
| T22 | interest | upper/sub | 40건 |
| T23 | values | item | 13건 |
| T3 | environmental | upper/sub/item | 65건 |

### reference_data.career_attributes (202건)
진로백과 속성 정의. `category` 필드로 구분.

| category | 코드 형식 | 건수 |
|----------|----------|------|
| work_activity | A01~A41 | 41건 |
| ability | AB01~AB44 | 44건 |
| knowledge | KN01~KN33 | 33건 |
| work_environment | WE01~WE49 | 49건 |
| personality | PS01~PS16 | 16건 |
| interest | R,I,A,S,E,C | 6건 |
| value | VA01~VA13 | 13건 |

### job_data.job_info (537건) — 2026-03-27 details 구조 개편 완료
워크넷 진로백과 전체 직업 정보. 한국표준직업분류(KSCO) 6자리 코드 기반.

**도큐먼트 필드:**

| 필드 | 타입 | 설명 |
|------|------|------|
| `jobCode` | String | 6자리 직업 코드 (예: `011102`) |
| `classification` | Object | `{ primary: 대분류명, secondary: 소분류명 }` |
| `title` | String | 직업명 |
| `overview` | String | 직업 개요 |
| `duties` | Array | 수행직무 목록 |
| `relatedMajors` | Array | 관련학과 목록 (없으면 `[]`) |
| `relatedCertifications` | Array | 관련자격 목록 (없으면 `[]`) |
| `salary` | Object | `{ lower, median, upper }` (만원 단위, 25%·중위·75%) |
| `jobSatisfaction` | Number | 직업만족도 (백점 기준, 예: `80.3`) |
| `details` | Object | 능력/지식/환경, 성격/흥미/가치관, 업무활동 (상위 5개 항목) |
| `lastUpdated` | String | 마지막 크롤링 일시 |

**details 구조 (플랫 구조, 배열 형식):**
```json
{
  "업무수행능력": { "중요도": { "직업내": [{"name":"...", "score": 100}, ...], "직업간": [...] }, "수준": { "직업내": [...], "직업간": [...] } },
  "지식":         { "중요도": { "직업내": [...], "직업간": [...] }, "수준": { "직업내": [...], "직업간": [...] } },
  "업무환경":     { "중요도": { "직업내": [...], "직업간": [...] } },
  "성격":         { "중요도": { "직업내": [...], "직업간": [...] } },
  "흥미":         { "중요도": { "직업내": [...], "직업간": [...] } },
  "가치관":       { "중요도": { "직업내": [...], "직업간": [...] } },
  "업무활동":     { "중요도": { "직업내": [...], "직업간": [...] }, "수준": { "직업내": [...], "직업간": [...] } }
}
```
- 각 배열 항목: `{ "name": "항목명", "score": 점수 }` (상위 5개)
- Cmpr 접미사 tbody ID = 직업내 비교, 없음 = 직업간 비교

**크롤링 스크립트:**
- `temp/crawl_missing_jobs.js --all` : 전체 재크롤링 (overview, duties, details, salary, jobSatisfaction)
- `temp/crawl_path_info.js` : relatedMajors, relatedCertifications 추가
- `temp/build_job_code_list.js` : 워크넷 전체 직업코드 목록 수집 → `temp/job_code_list.json`
- `temp/sync_check.js` : DB vs 워크넷 diff 체크 (신규 직업 감지용)

## T3 업무환경 검사 구조 (2026-04-22 교체)

기존 49개 개별 항목(O/M/X) 방식에서 6개 파트 슬라이더(1~5) 방식으로 전면 교체.

### survey_questions.T3_environmental — 6개 파트 도큐먼트
```json
{
  "part_code": "T3_PHY",
  "part_name": "근무환경 강도",
  "part_question": "...",
  "levels": [{ "level": 1, "description": "..." }, ...],
  "related_WE": {
    "up":   [{ "code": "WE24", "weight": 1.5 }],
    "down": [{ "code": "WE01", "weight": 1.5 }]
  }
}
```
파트 코드: `T3_PHY`, `T3_PEO`, `T3_COM`, `T3_RES`, `T3_STR`, `T3_FLX`

### survey_results T3 응답 형식
```json
"T3": { "T3_PHY": 3, "T3_PEO": 2, "T3_COM": 4, "T3_RES": 3, "T3_STR": 2, "T3_FLX": 5 }
```

### T3 통계/분석
- `question_stats`에 파트 코드(T3_PHY 등) 키로 Welford 누적 (값 1~5)
- `getSurveyReport` T3: 파트별 레벨값 그대로 반환
- `getSurveyAnalysis` T3: 파트별 레벨 + 이름 + 모집단 평균 + 상위% + 레벨 설명 반환

## 응답 타입 정규화 (0~1 스케일)
- **type_2** (OX): O=0.75, X=0.25
- **type_5** (ABCDE): A=0, B=0.25, C=0.5, D=0.75, E=1.0
- **type_10** (1~10): (raw - 1) / 9

## 통계 구조 (Welford 알고리즘)
- `question_stats`: 개별 질문별 누적 (mean, stddev, count, M2) — T3 파트도 포함
- `group_stats`: 그룹별 누적
  - T1 그룹: T1_E, T1_C, T1_S, T1_A, T1_I, T1_R, T1_G, T1_U, T1_T
  - T21 그룹: T21_T, T21_L, T21_M, T21_B, T21_S, T21_I, T21_N, T21_A
