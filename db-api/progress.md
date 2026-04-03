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
| `GET /api/survey/result/list` | 응답 목록 (최근 20건) |

### 직업 (Job)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/job/list` | 전체 직업 목록 조회 (페이지네이션, 대분류/소분류/학과 필터) |
| `GET /api/job/:jobCode` | 직업 단건 조회 |
| `GET /api/job/search?name=` | 직업명 검색 |

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

### 참조 데이터 (Reference)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/reference/survey-elements` | 설문 요소 정의 (test_code, area, level 필터) |
| `GET /api/reference/survey-elements/:code` | 설문 요소 단건 |
| `GET /api/reference/career-attributes` | 진로백과 속성 (category 필터) |
| `GET /api/reference/career-attributes/:code` | 진로백과 속성 단건 |

### 관리자 (Admin)
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST/PUT/DELETE /api/admin/questions/:collection_type` | 질문 CRUD |

## 미완성 기능 ⚠️

| 항목 | 파일 | 비고 |
|------|------|------|
| `GET /api/survey/analysis/:survey_id` | `controllers/surveyController.js` | TODO 주석만 있음 |
| `GET /api/job/recommend` | - | Frontend 연동 목록에 있으나 미구현 |
| `GET /api/job/:jobCode/review` | - | Frontend 연동 목록에 있으나 미구현 |
| `GET /api/job/:jobCode/preparation` | - | Frontend 연동 목록에 있으나 미구현 |
| `GET /api/job/:jobCode/recruitment` | - | Frontend 연동 목록에 있으나 미구현 |
| 인증 미들웨어 | `/api/admin` 전체 오픈 상태 | 구현 필요 |
| 테스트 코드 | - | 없음 |

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

## 응답 타입 정규화 (0~1 스케일)
- **type_2** (OX): O=0.75, X=0.25
- **type_5** (ABCDE): A=0, B=0.25, C=0.5, D=0.75, E=1.0
- **type_10** (0~9): raw / 9

## 통계 구조 (Welford 알고리즘)
- `question_stats`: 개별 질문별 누적 (mean, stddev, count, M2)
- `group_stats`: 그룹별 누적
  - T1 그룹: T1_E, T1_C, T1_S, T1_A, T1_I, T1_R, T1_G, T1_U, T1_T
  - T21 그룹: T21_T, T21_L, T21_M, T21_B, T21_S, T21_I, T21_N, T21_A
