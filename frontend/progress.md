# Frontend 진행상황

**프로젝트**: lighthouse_FE (LightHouse_app)
**스택**: Vue 3 + TypeScript + Vite
**상태**: 🟡 개발 중

## 기술 스택 (확정)

| 항목 | 기술 |
|------|------|
| 프레임워크 | Vue 3.5 (Composition API) |
| 빌드 도구 | Vite 7.3 |
| 언어 | TypeScript 5.9 |
| 라우터 | Vue Router 4.6 |
| 상태 관리 | Composable 패턴 (Pinia 설치됨) |
| HTTP | Axios 1.13 |
| 스타일 | SCSS (Pretendard 폰트) |
| PWA | vite-plugin-pwa |
| 모바일 | Capacitor 8 (iOS / Android 하이브리드) |
| 배포 | Vercel (API 프록시 포함) |

## 구현된 페이지

| 페이지 | 경로 | 상태 |
|--------|------|------|
| 홈 | `/` | ✅ 완료 |
| 설문 소개 | `/self-understanding` | ✅ 완료 |
| 설문 유형 선택 | `/self-understanding/select` | ✅ 완료 |
| 설문 진행 | `/self-understanding/test` | ✅ 완료 |
| 직업 검색 홈 | `/career-encyclopedia` | ✅ 완료 |
| 추천 직업 목록 | `/career-encyclopedia/recommended` | ✅ 완료 |
| 직업 상세 | `/career-encyclopedia/job/:jobCode` | ✅ 완료 |
| 결과 보고서 | `/result/:survey_id` | 🔴 미구현 |

## API 연동 현황

```
GET  /api/survey/form                  ✅ 연동됨
POST /api/survey/response              ✅ 연동됨
POST /api/survey/report                🔴 미연동 (결과 보고서 페이지 미구현)
GET  /api/job/:jobCode                 ✅ 연동됨
GET  /api/job/search?name=             ✅ 연동됨
GET  /api/job/recommend                ✅ 연동됨
GET  /api/job/:jobCode/review          ✅ 연동됨
GET  /api/job/:jobCode/preparation     ✅ 연동됨
GET  /api/job/:jobCode/recruitment     ✅ 연동됨
GET  /api/reference/survey-elements    🔴 미연동
GET  /api/reference/career-attributes  🔴 미연동
```

## 모듈 구조

```
src/modules/
├── survey/           # 자기이해(설문) 모듈
│   ├── pages/        # 4개 페이지
│   ├── components/   # 14개 컴포넌트 (질문 유형별)
│   ├── composables/  # useSurvey.ts
│   ├── types/        # survey.ts
│   └── survey.api.ts
└── encyclopedia/     # 진로백과 모듈
    ├── pages/        # 3개 페이지
    ├── components/   # 10개 컴포넌트
    ├── composables/  # useEncyclopedia.ts
    ├── types/        # encyclopedia.ts
    └── encyclopedia.api.ts
```

## 지원 질문 유형 (설문)

- 2지선다 / 5지선다 / 10지선다 (ScaleQuestion)
- 다중선택 (MultiSelectQuestion)
- 우선순위 (PriorityQuestion)
- 3지선다 (ThreeChoiceQuestion)

## 결과 보고서 응답 구조 (연동 예정)

```json
{
  "survey_id": "...",
  "answer_type": "type_10",
  "T1": { "E": { "user": 0.533, "average": 0.521, "top_percent": 48.2 } },
  "T21": { "L": { "user": 0.611, "average": 0.498, "top_percent": 32.1 } },
  "T22": { "checked": ["T22_BUS_1", "..."] },
  "T23": { "priority_1": "T3_1", "priority_2": "T3_2", "priority_3": "T3_3" },
  "T3": { "O": [...], "M": [...], "X": [...] }
}
```

## 남은 작업

- [ ] 결과 보고서 페이지 (`/result/:survey_id`) 구현
- [ ] `/api/survey/report` API 연동
- [ ] `/api/reference/survey-elements`, `/api/reference/career-attributes` 연동
