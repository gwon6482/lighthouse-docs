# Lighthouse 약식코드 레퍼런스

> 2026-04-21 코드베이스 전체 탐색 후 정리. 세 서브 프로젝트(DB API / FE / Admin)가 공유하는 코드 체계.

---

## 1. 설문 영역 코드 (collection_type)

| 코드 | 전체명 | 의미 |
|------|--------|------|
| T1 | T1_personality | 성격/심리특성 |
| T21 | T2_1_talent | 재능 |
| T22 | T2_2_interest | 흥미/관심분야 |
| T23 | T2_3_values | 가치관 |
| T3 | T3_environmental | 업무환경 |

---

## 2. T1 성격 그룹 코드 (9가지)

| 코드 | 의미 |
|------|------|
| T1_E | Extraversion (외향성) |
| T1_C | Conscientiousness (성실성) |
| T1_S | Sensitivity (민감성) |
| T1_A | Agreeableness (친화성) |
| T1_I | Intellect/Openness (지성) |
| T1_R | Realism (현실성) |
| T1_G | Group Harmony (집단화합성) |
| T1_U | Uniqueness (독특성) |
| T1_T | Tenacity (끈기) |

하위 항목은 `T1_E1`, `T1_C3` 형태로 숫자 suffix 추가.

---

## 3. T21 재능 그룹 코드 (8가지)

| 코드 | 의미 |
|------|------|
| T21_T | Technical (기술) |
| T21_L | Logic/Mathematics (논리수학) |
| T21_M | Music (음악) |
| T21_B | Bodily (신체운동) |
| T21_S | Spatial (공간) |
| T21_I | Interpersonal (대인관계) |
| T21_N | Naturalistic (자연) |
| T21_A | Abstract/Linguistic (추상/언어) |

---

## 4. T3 업무환경 카테고리 코드

| 코드 | 의미 |
|------|------|
| T3_PHY | Physical work environment intensity (근무환경 강도) |
| T3_PEO | People contact intensity (대인접촉 강도) |
| T3_COM | Communication intensity (커뮤니케이션 강도) |
| T3_RES | Responsibility/Authority intensity (책임·권한 강도) |
| T3_STR | Stress intensity (스트레스 강도) |
| T3_FLX | Work flexibility/Fluidity (업무 유동성) |

---

## 5. 답변 타입 코드

| 코드 | 의미 |
|------|------|
| type_2 | 이진(O/X) 선택 |
| type_5 | 5점(A/B/C/D/E) 척도 |
| type_10 | 10점 척도 |
| multiple_choice | 다중 선택 |
| priority_choice | 우선순위 선택 (priority_1 / priority_2 / priority_3) |

응답값: `O`=긍정, `X`=부정, `M`=중립(T3 전용), `A/B/C/D/E`=5점 척도

---

## 6. 직업 코드 구조

- **형식**: 6자리 숫자 `[중분류 2자리][소분류 2자리][세분류 순번 2자리]`
- **예시**: `011102` = 행정부고위공무원
- **Holland 흥미 코드**: R / I / A / S / E / C

---

## 7. 직업 속성 카테고리 코드 (CareerAttribute.category)

| 코드 | 의미 |
|------|------|
| work_activity | 업무활동 |
| ability | 업무수행능력 |
| knowledge | 지식 |
| work_environment | 업무환경 |
| personality | 성격 |
| interest | 흥미 (Holland 코드) |
| value | 가치관 |

---

## 8. SurveyElement 계층 코드 (level)

| 코드 | 의미 |
|------|------|
| upper | 상위 그룹 |
| sub | 중간 그룹 |
| item | 개별 항목 |

---

## 9. survey_id 포맷

```
SURVyyyyMMddD_HHmmssT
예: SURV20260305D_120000T
```

---

## 10. 주요 DB 필드명 약어

| 필드 | 의미 |
|------|------|
| test_code | 설문 영역 코드 (T1/T21/T22/T23/T3) |
| upper_element | 상위 그룹 |
| lower_element | 하위 항목 |
| collection_type | 설문 영역 전체명 (T1_personality 등) |
| is_active | 활성 여부 플래그 |
| client_info | IP + user_agent 메타 |
| type2_score | 이진(O/X) 통계 |
| type5_score | 5점 척도 통계 |
| group_stats | 그룹별 통계 |
| overall_stats | 전체 완료 통계 |
| top_percent | 백분위 |
| adoption_rate | 선택률 (T22 전용) |

---

## 11. API 경로 요약

### Survey
```
GET  /api/survey/form              설문지 조회
POST /api/survey/response          응답 제출
POST /api/survey/report            결과 보고서 생성
GET  /api/survey/analysis/:id      분석 조회
GET  /api/survey/statistics        전체 통계
GET  /api/survey/result/list       결과 목록
```

### Job
```
GET  /api/job/list                 직업 목록 (페이지네이션)
GET  /api/job/classifications      분류 트리
GET  /api/job/majors               관련 학과
GET  /api/job/search               직업 검색
GET  /api/job/:jobCode             직업 상세
```

### Reference
```
GET  /api/reference/survey-elements
GET  /api/reference/survey-elements/:code
GET  /api/reference/career-attributes
GET  /api/reference/career-attributes/:code
```

### Admin
```
GET/POST/PUT/DELETE /api/admin/questions/:collection_type
GET /api/admin/questions/stats
```

---

## 12. Frontend TypeScript 주요 타입명

| 타입명 | 설명 |
|--------|------|
| SurveyFormResponse | 전체 설문지 응답 |
| PageInfo | 페이지 단위 정보 |
| SurveyQuestion | 단일 질문 데이터 |
| SurveyItem | 설문 항목 (T22/T23/T3) |
| QuestionT1T21 | 2계층 구조 질문 (T1/T21) |
| QuestionT22 | 흥미 분야 질문 |
| QuestionT23 | 가치관 질문 |
| QuestionT3 | 3계층 구조 질문 |
| MultiSelectItem | 다중 선택 항목 |
| PriorityItem | 우선순위 선택 항목 |
| ThreeChoiceItem | O/M/X 3지선다 항목 |
| GroupScore | 그룹 통계 (user / average / top_percent) |
