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

---

## 13. WE 코드 — 업무환경 항목 (WE01~WE49)

직업 DB의 업무환경 특성 코드. `career_attributes.work_environment` 카테고리에 저장되며, T3 검사의 `related_WE` 가중치 매핑에 사용됨.

| 코드 | 이름 | 정의 |
|------|------|------|
| WE01 | 실내 근무 | 실내에서 근무하는 빈도 |
| WE02 | 앉아서 근무 | 앉아서 근무하는 빈도 |
| WE03 | 이메일 이용하기 | 업무 수행하면서 이메일 사용하는 정도 |
| WE04 | 사람들과 직접 접촉 | 다른 사람과 전화, 대면, 전자메일 등으로 접촉하는 빈도 |
| WE05 | 다른 사람과의 상호작용 | 업무 수행위해 팀/집단으로 함께 일하는 것의 중요성 |
| WE06 | 다른 사람과의 접촉 | 업무 수행하면서 사람들과 접촉(전화, 대면, 메신저 등) 정도 |
| WE07 | 다른 사람들을 조율하거나 이끌기 | 업무 특성상 다른 사람들을 조율하거나 이끄는 것의 중요성 |
| WE08 | 공문, 문서 주고받기 | 업무 수행하면서 공문이나 문서를 주고받는 정도 |
| WE09 | 전화 대화하기 | 업무 수행하면서 전화로 대화하는 정도 |
| WE10 | 외부 고객 대하기 | 외부 고객 혹은 민원인을 대하는 것의 중요성 |
| WE11 | 정확성, 정밀성 유지 | 업무 수행을 위해 정밀하거나 정확한 것의 중요성 |
| WE12 | 이미지/평판/재정에 미치는 강도 | 본인의 의사결정이 다른 사람 또는 회사 이미지/평판/재정에 어느 정도의 결과 초래 |
| WE13 | 반복적인 신체행동, 정신적 활동 | 지속적이고 반복적인 신체적 행동이나 정신적 활동의 중요성 |
| WE14 | 의사결정 권한 | 해야 할 일, 일의 우선순위, 목표를 정할 수 있는 재량 정도 |
| WE15 | 결과에 대한 책임 | 함께 근무하는 사람의 근무 결과에 대한 책임 |
| WE16 | 다른 사람과 신체적 접촉 | 업무 수행 시 다른 사람들과 신체적으로 거리 정도 |
| WE17 | 이미지/평판/재정에 미치는 영향력 | 본인의 의사결정이 다른 사람 또는 회사 이미지/평판/재정에 영향을 주는 빈도 |
| WE18 | 손사용 | 손으로 사물, 도구 혹은 조종 장치를 다루면서 근무하는 빈도 |
| WE19 | 마감시간 | 마감시간을 엄격하게 지켜야하는 빈도 |
| WE20 | 의사결정 가능성 | 관리자나 감독자(상사)의 개입 없이 의사결정 할 수 있는 재량 정도 |
| WE21 | 갈등 상황 | 업무 수행 시 갈등 상황 노출 정도 |
| WE22 | 균형을 유지하기 | (몸의) 균형을 유지하면서 근무하는 빈도 |
| WE23 | 건강 및 안전에 대한 책임 | 함께 근무하는 사람의 건강 및 안전에 대한 책임 |
| WE24 | 실외 근무 | 바깥공기에 노출되는 실외에서 근무하는 빈도 |
| WE25 | 연설, 발표, 회의하기 | 사람들 앞에서 공식적으로 연설(발표, 회의 등의 상황) |
| WE26 | 불쾌하거나 무례한 사람 상대 | 불쾌하거나, 화나거나, 혹은 무례한 사람을 대하는 빈도 |
| WE27 | 실수의 심각성 | 실수 결과의 심각성 |
| WE28 | 움직이는 기계 | 움직이는 기계(자동차, 트랙터 등)에서 근무 정도 |
| WE29 | 주말 및 공휴일 근무 | 주말 및 공휴일 출근 빈도 |
| WE30 | 치열한 경쟁 | 동료 혹은 다른 사람들과의 경쟁 정도 |
| WE31 | 소음 노출 | 산만하거나 불안할 정도의 소음에 노출되는 빈도 |
| WE32 | 자동화 정도 | 업무의 자동화 정도 |
| WE33 | 장비 속도에 보조 맞추기 | 장비 혹은 기계의 속도에 보조를 맞추는 것의 중요성 |
| WE34 | 매우 춥거나 더운 기온 | 매우 덥거나(섭씨 32도 이상) 매우 추운(섭씨 0도 이하) 기온에 노출되는 빈도 |
| WE35 | 재택근무 | 재택근무 가능성 |
| WE36 | 비좁은 업무 공간 | 불편한 자세를 취해야 하는 비좁은 공간에 노출되는 빈도 |
| WE37 | 극단적으로 밝거나 부적절한 조명 | 극단적으로 밝거나 혹은 부적절한 조명에 노출되는 빈도 |
| WE38 | 서서 근무 | 서서 근무하는 빈도 |
| WE39 | 경미한 화상, 자상, 찔림 등 노출 | 경미한 화상, 자상, 혹은 찔리는 것에 노출되는 빈도 |
| WE40 | 몸을 구부리거나 비틀기 | 몸을 구부리거나 비틀면서 근무하는 빈도 |
| WE41 | 걷거나 뛰기 | 걷거나 뛰면서 근무하는 빈도 |
| WE42 | 온몸 진동 노출 | 온몸 진동(예, 수동 드릴이나 혹은 착암기 작동)에 노출되는 빈도 |
| WE43 | 오염물질 노출 | 오염물질(가스, 먼지, 악취 등)에 노출되는 빈도 |
| WE44 | 보호장비 착용 | 업무 수행 시 보호장비(안전화, 보안경, 장갑, 귀마개, 안전모, 구명조끼, 전신보호복 등) 착용 정도 |
| WE45 | 위험한 장비 노출 | 위험한 장비(톱, 이동 기계, 차량)에 노출되는 빈도 |
| WE46 | 위험한 상태 노출 | 위험한 상태(고압 전류, 가연성 물질, 폭발물, 화학물 등)에 노출되는 빈도 |
| WE47 | 질병 혹은 감염 위험 노출 | 질병 혹은 병균에 노출되는 빈도 |
| WE48 | 고지대 작업 | 높은 곳에서(높은 철골구조 위, 타워 크레인 위, 혹은 고층 빌딩 위 등) 작업하는 빈도 |
| WE49 | 규칙적인 근무 | 근무 일정의 규칙성 |
