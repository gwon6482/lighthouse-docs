# 직업 정보 구성 (job_info)

> DB: `job_data.job_info` — 537건 (워크넷 진로백과 전체 직업 정보)

---

## 컬렉션 개요

| 항목 | 내용 |
|------|------|
| DB | job_data |
| 컬렉션 | job_info |
| 문서 수 | 537건 |
| 식별자 | `jobCode` (6자리 숫자 문자열, KSCO 기반) |
| 출처 | 워크넷 진로백과 크롤링 |
| 마지막 업데이트 | 2026-03-27 |

---

## 도큐먼트 전체 필드

```json
{
  "_id": "011102",
  "jobCode": "011102",
  "classification": {
    "primary": "경영·사무·금융·보험직",
    "secondary": "사회복지 관리자"
  },
  "title": "사회복지관리자",
  "overview": "사회복지시설의 인사 및 재정 전반을 관리·감독하고...",
  "duties": ["영아원, 육아원, 아동입양위탁시설...", "..."],
  "relatedMajors": ["사회복지학과"],
  "relatedCertifications": ["사회복지사 1, 2, 3급(국가전문)"],
  "salary": {
    "lower": 3600,
    "median": 4500,
    "upper": 4973
  },
  "jobSatisfaction": 76.1,
  "details": { ... },
  "lastUpdated": "2026-03-27T06:56:19.207Z"
}
```

---

## 필드별 상세 설명

| 필드 | 타입 | 설명 | 비고 |
|------|------|------|------|
| `jobCode` | String | 6자리 직업 코드 (예: `011102`) | 한국표준직업분류(KSCO) 기반 |
| `classification.primary` | String | 대분류명 | 10개 대분류 |
| `classification.secondary` | String | 소분류명 | 387개 소분류 |
| `title` | String | 직업명 | |
| `overview` | String | 직업 개요 | |
| `duties` | Array\<String\> | 수행 직무 목록 | |
| `relatedMajors` | Array\<String\> | 관련학과 목록 | 없으면 `[]` |
| `relatedCertifications` | Array\<String\> | 관련자격 목록 | 없으면 `[]` |
| `salary.lower` | Number | 하위(25%) 임금 (만원) | |
| `salary.median` | Number | 중위값 임금 (만원) | |
| `salary.upper` | Number | 상위(25%) 임금 (만원) | |
| `jobSatisfaction` | Number | 직업만족도 (백점 기준) | 예: 80.3 |
| `details` | Object | 7개 카테고리 직업 속성 데이터 | 아래 구조 참조 |
| `lastUpdated` | String | 마지막 크롤링 일시 | ISO 8601 |

---

## 직업 분류 체계

### 대분류 10개

| # | 대분류 |
|---|--------|
| 1 | 경영·사무·금융·보험직 |
| 2 | 연구직 및 공학기술직 |
| 3 | 교육·법률·사회복지·경찰·소방직 및 군인 |
| 4 | 보건·의료직 |
| 5 | 예술·디자인·방송·스포츠직 |
| 6 | 미용·여행·숙박·음식·경비·청소직 |
| 7 | 영업·판매·운전·운송직 |
| 8 | 건설·채굴직 |
| 9 | 설치·정비·생산직 |
| 10 | 농림어업직 |

- 소분류: 387개 (trailing space 포함 가능 → 필터 시 `.trim()` 처리)
- 관련학과: 130개 고유 학과명

---

## details 구조

`details` 필드는 7개 카테고리로 구성되며, 각 카테고리는 워크넷에서 수집한 상위 5개 항목을 저장합니다.

### 기본 구조

```json
{
  "details": {
    "업무수행능력": { ... },
    "지식":        { ... },
    "업무환경":    { ... },
    "성격":        { ... },
    "흥미":        { ... },
    "가치관":      { ... },
    "업무활동":    { ... }
  }
}
```

### 카테고리별 구조

각 카테고리는 **중요도** (일부는 **수준**도 포함)로 구성됩니다.

**중요도/수준 구조:**
```json
{
  "중요도": {
    "직업내":  [ { "name": "항목명", "score": 3.9 }, ... ],
    "직업간":  [ { "name": "항목명", "score": 95  }, ... ]
  },
  "수준": {
    "직업내":  [ { "name": "항목명", "score": 5.0 }, ... ],
    "직업간":  [ { "name": "항목명", "score": 95  }, ... ]
  }
}
```

| 비교 유형 | 설명 | 점수 범위 |
|----------|------|---------|
| 직업내 | 해당 직업 내에서의 상대적 중요도/수준 | 1.0~6.0 (리커트) |
| 직업간 | 전체 직업 대비 백분위 (상위 N%) | 1~100 |

### 카테고리별 수록 항목

| 카테고리 | 중요도 | 수준 | 항목 코드 |
|---------|--------|------|---------|
| 업무수행능력 | ✅ | ✅ | `career_attributes.ability` (AB01~AB44) |
| 지식 | ✅ | ✅ | `career_attributes.knowledge` (KN01~KN33) |
| 업무환경 | ✅ | — | `career_attributes.work_environment` (WE01~WE49) |
| 성격 | ✅ | — | `career_attributes.personality` (PS01~PS16) |
| 흥미 | ✅ | — | `career_attributes.interest` (R,I,A,S,E,C) |
| 가치관 | ✅ | — | `career_attributes.value` (VA01~VA13) |
| 업무활동 | ✅ | ✅ | `career_attributes.work_activity` (A01~A41) |

> 각 카테고리의 항목명·정의는 [reference_data.md](./reference_data.md) 참조

### 실제 예시

```json
"details": {
  "업무수행능력": {
    "중요도": {
      "직업내": [
        { "name": "서비스 지향", "score": 3.9 },
        { "name": "문제 해결",   "score": 3.8 },
        { "name": "사람 파악",   "score": 3.8 }
      ],
      "직업간": [
        { "name": "모니터링(Monitoring)", "score": 95 },
        { "name": "설득",                "score": 94 }
      ]
    },
    "수준": {
      "직업내": [
        { "name": "모니터링(Monitoring)", "score": 5.0 }
      ],
      "직업간": [
        { "name": "재정 관리", "score": 95 }
      ]
    }
  },
  "흥미": {
    "중요도": {
      "직업내": [
        { "name": "사회형(Social)",    "score": 4.7 },
        { "name": "진취형(Enterprising)", "score": 3.8 }
      ],
      "직업간": [
        { "name": "사회형(Social)",    "score": 100 },
        { "name": "진취형(Enterprising)", "score": 97 }
      ]
    }
  }
}
```

---

## API 조회

| 엔드포인트 | 설명 | 제공 필드 |
|-----------|------|---------|
| `GET /api/job/list` | 전체 목록 (페이지네이션) | 경량 필드만 (overview·duties·details 제외) |
| `GET /api/job/:jobCode` | 단건 상세 | 전체 필드 |
| `GET /api/job/search?name=` | 이름 검색 | jobCode, title, classification |
| `GET /api/job/classifications` | 대→소분류 트리 | `{ "대분류명": ["소분류명", ...] }` |
| `GET /api/job/majors` | 관련학과 목록 | 130개 정렬 배열 |

### GET /api/job/list — Response 경량 필드
```json
{
  "jobCode": "011102",
  "title": "사회복지관리자",
  "classification": { "primary": "경영·사무·금융·보험직", "secondary": "사회복지 관리자" },
  "salary": { "lower": 3600, "median": 4500, "upper": 4973 },
  "jobSatisfaction": 76.1,
  "relatedMajors": ["사회복지학과"],
  "relatedCertifications": ["사회복지사 1, 2, 3급(국가전문)"]
}
```
> `overview`, `duties`, `details`는 단건 조회(`GET /api/job/:jobCode`)에서만 제공

---

## 크롤링 스크립트

| 스크립트 | 용도 |
|---------|------|
| `temp/crawl_missing_jobs.js --all` | 전체 재크롤링 (overview, duties, details, salary, jobSatisfaction) |
| `temp/crawl_path_info.js` | relatedMajors, relatedCertifications 추가 |
| `temp/build_job_code_list.js` | 워크넷 전체 직업코드 목록 수집 → `temp/job_code_list.json` |
| `temp/sync_check.js` | DB vs 워크넷 diff 체크 (신규 직업 감지용) |
