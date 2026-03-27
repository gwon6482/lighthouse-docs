# 🛠️ Lighthouse Admin 프로젝트 시작 프롬프트

> 어드민 프로젝트 신규 시작 시 이 내용을 첫 메시지로 붙여넣으세요.

---

```
안녕! 나는 Lighthouse 프로젝트의 어드민 대시보드를 새로 개발하려고 해.
아래에 기존 프로젝트의 모든 정보가 있으니 숙지하고 작업을 도와줘.

---

## 📌 프로젝트 개요

Lighthouse는 진로 적성검사 다차원 설문조사 서비스야.
3개의 서브 프로젝트로 구성돼 있어:
- **DB API** (완성 ~90%): Node.js + Express + MongoDB Atlas, Vercel 배포
- **Frontend** (미시작): 사용자 설문 진행 및 결과 확인
- **Admin** (신규 시작): 어드민 대시보드 ← 지금 여기

**어드민 목표**: 유저, 설문지, 설문 문항, 참조데이터(reference_data) 관리 + 로그 확인

---

## 🌐 DB API 서버 정보

- **배포 URL**: https://lighthouse-db-api.vercel.app (또는 최신 Vercel URL 확인)
- **Swagger 문서**: [배포URL]/api-docs
- **응답 형식**: `{ success: true/false, data: ..., count: ..., error: ... }`
- ⚠️ `/api/admin` 전체가 현재 인증 없이 오픈 상태 → 어드민 개발 시 인증 미들웨어 추가 필요

---

## 🗄️ 데이터베이스 구성 (MongoDB Atlas)

### 1. `survey_questions` DB — 설문 문항 데이터

5개 컬렉션, 총 ~200건의 질문 데이터

| 컬렉션 | 영역 | 문항 수 | ID 필드 |
|--------|------|---------|---------|
| `T1_personality` | 성격/심리특성 | 43건 | question_id |
| `T2_1_talent` | 재능 | 61건 | question_id |
| `T2_2_interest` | 흥미/관심사 | 33건 | field_id |
| `T2_3_values` | 가치관 | 13건 | value_id |
| `T3_environmental` | 업무환경 | 49건 | item_id |

**T1_personality / T2_1_talent 공통 필드:**
```json
{
  "question_id": "T1_E1",
  "collection_code": "T1",
  "upper_element_code": "E",
  "upper_element_name": "외향성",
  "upper_element_definition": "...",
  "sub_element_code": "E1",
  "sub_element_name": "활동성",
  "sub_element_definition": "...",
  "question_text": "질문 내용",
  "created_at": "2025-06-18T...",
  "version": "1.0"
}
```

**T2_2_interest 필드:**
```json
{
  "field_id": "T22_SOC_6",
  "collection_code": "T2_2",
  "upper_field_code": "SOC",
  "upper_field_name": "사회 및 인문 분야",
  "field_code": "SOC_6",
  "field_name": "법",
  "field_definition": "..."
}
```

**T2_3_values 필드:**
```json
{
  "value_id": "T23_6",
  "value_name": "인정",
  "value_code": "RECOGNITION",
  "value_definition": "...",
  "value_question": "..."
}
```

**T3_environmental 필드 (3단계 계층):**
```json
{
  "item_id": "T3_3_1_1",
  "collection_code": "T3",
  "category_id": "T3_3",
  "category_code": "INTERPERSONAL_RESPONSIBILITY",
  "category_name": "대인 관계 및 책임",
  "sub_category_id": "T3_3_1",
  "sub_category_code": "HUMAN_CONTACT",
  "sub_category_name": "인적 접촉",
  "item_code": "DIRECT_CONTACT",
  "item_name": "사람들과 직접 접촉",
  "item_definition": "..."
}
```

---

### 2. `survey_data` DB — 설문 응답 및 통계

**`survey_results` 컬렉션 필드:**
```json
{
  "survey_id": "uuid",
  "respondent_id": "...",
  "submitted_at": "2025-...",
  "answers": {
    "T1": { "T1_E1": "O", "T1_E2": "X", ... },
    "T21": { "T21_L1": "O", ... },
    "T22": { "checked": ["T22_SOC_6", ...] },
    "T23": { "priority_1": "T23_6", "priority_2": "...", "priority_3": "..." },
    "T3": { "T3_3_1_1": "O", ... }
  },
  "raw_payload": { ... }
}
```

**`survey_statistics` 컬렉션 필드:**
```json
{
  "generated_at": "2025-...",
  "total_surveys": 42,
  "question_stats": { "T1_E1": { "mean": 0.52, "stddev": 0.18, "count": 42, "M2": ... } },
  "group_stats": {
    "T1_E": { "mean": 0.533, "stddev": 0.12, "count": 42, "M2": ... },
    "T21_L": { ... }
  },
  "last_survey_id": "uuid"
}
```

---

### 3. `reference_data` DB — 참조 코드 데이터 (어드민에서 직접 수정 가능해야 함)

**`survey_elements` 컬렉션 (239건)** — 검사 영역별 요소 정의

| test_code | area | level | 설명 |
|-----------|------|-------|------|
| T1 | personality | upper / sub | 성격 상위/하위 요소 |
| T21 | talent | upper / sub | 재능 상위/하위 요소 |
| T22 | interest | upper / sub | 흥미 분야 |
| T23 | values | item | 가치관 (단일 레벨) |
| T3 | environmental | upper / sub / item | 업무환경 (3단계) |

```json
{
  "test_code": "T1",
  "area": "personality",
  "level": "upper",
  "code": "E",
  "name": "외향성",
  "definition": "...",
  "parent_code": null
}
```

**`career_attributes` 컬렉션 (202건)** — 진로백과 직업 속성 정의

| category | 코드 형식 | 건수 |
|----------|----------|------|
| work_activity | A01~A41 | 41건 |
| ability | AB01~AB44 | 44건 |
| knowledge | KN01~KN33 | 33건 |
| work_environment | WE01~WE49 | 49건 |
| personality | PS01~PS16 | 16건 |
| interest | R, I, A, S, E, C | 6건 |
| value | VA01~VA13 | 13건 |

```json
{
  "category": "ability",
  "code": "AB01",
  "name": "기술 분석",
  "definition": "..."
}
```

---

### 4. `job_data` DB — 직업 정보

**`job_info` 컬렉션 (538건)** — 워크넷 전체 직업 데이터

```json
{
  "jobCode": "1101",
  "classification": "경영·사무",
  "title": "직업명",
  "overview": "직업 개요",
  "duties": "주요 업무",
  "details": { ... },
  "salary": { "lower": 2800, "median": 3500, "upper": 5200 },
  "jobSatisfaction": 72.5,
  "lastUpdated": "2025-03-18"
}
```

---

## 🔌 DB API 주요 엔드포인트

### 설문 문항 관리 (`/api/admin`)
```
GET    /api/admin/questions/stats                          전체 통계
GET    /api/admin/questions/:collection_type               질문 목록
GET    /api/admin/questions/:collection_type/stats         컬렉션별 통계
GET    /api/admin/questions/:collection_type/:question_id  단건 조회
POST   /api/admin/questions/:collection_type               질문 생성
PUT    /api/admin/questions/:collection_type/:question_id  질문 수정
DELETE /api/admin/questions/:collection_type/:question_id  질문 삭제

collection_type: T1_personality | T2_1_talent | T2_2_interest | T2_3_values | T3_environmental
```

### 설문 응답 조회 (`/api/survey`)
```
GET  /api/survey/result/list       최근 응답 목록 (최근 20건)
GET  /api/survey/statistics        전체 통계
POST /api/survey/report            결과 보고서 (body: { survey_id })
```

### 참조데이터 (`/api/reference`)
```
GET /api/reference/survey-elements?test_code=T1&area=personality&level=upper
GET /api/reference/survey-elements/:code
GET /api/reference/career-attributes?category=ability
GET /api/reference/career-attributes/:code
```
⚠️ 현재 참조데이터 수정 API 없음 → 어드민에서 직접 MongoDB 연결 또는 DB API에 CRUD 추가 필요

### 직업 정보 (`/api/job`)
```
GET /api/job/search?name=          직업 검색
GET /api/job/:jobCode              직업 상세
```

---

## ⚠️ 어드민 개발 시 주의사항

1. **인증 미들웨어 필수**: `/api/admin` 현재 전체 오픈 → JWT 또는 세션 기반 인증 선행 구현
2. **참조데이터 수정 API 없음**: `reference_data` DB의 survey_elements, career_attributes 수정은 현재 API 없음 → DB API에 추가하거나 어드민에서 직접 연결
3. **설문 영역별 스키마 다름**: T1/T21은 upper→sub 2단계, T23은 flat 1단계, T3는 3단계 계층 구조

---

## 📁 공유 문서 레포
- 전체 개요: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/overview.md
- DB API 현황: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/db-api/progress.md
- Admin 현황: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/admin/progress.md

작업이 끝나면 admin/progress.md를 업데이트해줘.

---

오늘 작업 내용:
```
