# 작업 계획 — 진로백과 후기 기능 (2026-05-06)

## 개요
진로백과(`/career-encyclopedia/job/:jobCode`) 에 직업 후기 기능을 추가한다.
데이터는 별도 DB 컬렉션(`job_data.job_reviews`)에 저장하며,
사용자 제출 + 어드민 승인 / 어드민 직접 입력 방식으로 운영한다.

---

## DB 스키마 (`job_data.job_reviews`)

```json
{
  "jobCode": "011102",
  "summary": "보람 있지만 체력적으로 힘든 직업",
  "satisfaction": 78,
  "pros": "연구 결과가 현장에 적용되는 걸 볼 때 보람차요",
  "cons": "야외 작업이 많아서 체력 소모가 큽니다",
  "recommendation": "자연과 함께하는 걸 좋아하는 사람",
  "personalityTags": ["I", "T"],
  "status": "pending",
  "submittedBy": "user",
  "submitterEmail": "abc@example.com",
  "adminNote": "",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

**`personalityTags`**: T1 9개 그룹 코드 복수 선택 (E/C/S/A/I/R/G/U/T)

**인덱스**: `jobCode`, `status`

---

## 구현 범위

### 1. lighthouse_DB_API

#### 모델
- `models/JobReview.js` 신규 생성

#### 컨트롤러 / 라우트
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/job/:jobCode/reviews` | 승인된 후기 목록 (FE용) |
| POST | `/api/job/:jobCode/reviews` | 사용자 후기 제출 → status: pending |
| GET | `/api/admin/reviews` | 전체 후기 목록 (status 필터, 어드민용) |
| POST | `/api/admin/reviews` | 어드민 직접 입력 → status: approved |
| PUT | `/api/admin/reviews/:id` | 승인 / 반려 / 내용 수정 |
| DELETE | `/api/admin/reviews/:id` | 삭제 |

---

### 2. lightHouse_admin

**`/dashboard/encyclopedia`** 후기 탭 UI:
- 전체 후기 목록 테이블 (jobCode, 한줄평, 만족도, status)
- status 필터 (전체 / 대기 / 승인 / 반려)
- 행 클릭 → 상세 모달 (내용 전체 확인 + 승인/반려/수정/삭제)
- 어드민 직접 입력 모달 (+ 추가 버튼)

---

### 3. LightHouse_app

**`/career-encyclopedia/job/:jobCode`** — 후기 탭(`ReviewTab.vue`):
- `GET /api/job/:jobCode/reviews` 연동
- 후기 카드 컴포넌트 (`ReviewCard.vue`)
  - 한줄평 (summary)
  - 만족도 게이지 바 (satisfaction %)
  - 좋아요 / 힘든점 / 추천 섹션
  - 진로성향 태그 버튼 (personalityTags → T1 그룹 이름 표시)
- 후기 없을 때 빈 상태 표시
- 후기 제출 버튼 → 제출 폼 (추후)

---

## 작업 순서

1. `lighthouse_DB_API` — JobReview 모델 + 라우트/컨트롤러
2. `lightHouse_admin` — 어드민 후기 관리 UI
3. `LightHouse_app` — ReviewTab 카드 UI

---

## 미결 사항
- 사용자 후기 제출 폼 (FE): 로그인 없이 허용할지 여부
- 크롤링 기반 채용정보 / 준비과정 구조는 별도 논의 예정
