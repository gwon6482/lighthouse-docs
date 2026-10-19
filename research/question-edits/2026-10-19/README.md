# 설문 문항 문구 수정 — 2026-10-19

프로덕션 DB(`survey_questions`)의 문항 문구를 고친 기록과 **되돌리기용 원본 백업**.
문항은 랜딩 `/survey`와 앱 자기이해 검사가 함께 쓴다. 고치면 두 화면에 바로 적용된다.

## 무엇을 바꿨나

**1차 — 문항 문구 60개** (성격 T1 13 · 재능 T21 30 · 흥미 T22 14 · 가치관 T23 2 · 업무 환경 T3 2)
- 대부분 띄어쓰기·표현 정리. 의미가 일부 달라진 것: T1_A6("아플 때"→"슬퍼하면"), T21_A5(목소리 구별),
  T21_S6("크기"→"높이"), T22_SOC_4("드라마"→"연극"), T3_FLX·T3_PHY 질문
- 문항 ID·개수·분야명·가치명은 그대로

**2차 — T3 업무 환경 6개 항목**
- 항목 이름 2개(대인 접촉 강도, 근무 환경 강도), T3_PHY 질문, 답변 단계 문구 29개(T3_STR 3단계만 그대로)
- 항목 코드·1~5 단계 값은 그대로라 응답·계산 영향 없음. 단, 답변 문구는 결과 화면의 업무 환경 설명에도 나온다
  (결과는 볼 때마다 계산하므로 기존 결과도 새 문구로 보인다)

반영 후 `GET /api/survey/form` 을 다시 받아 대조: 1차 60/60, 2차 42/42 일치.

## 파일

| 파일 | 내용 |
|---|---|
| `changes.json` | 1차 60개의 **수정 전(before)·후(after)** — 되돌리기 백업 |
| `revised.txt` · `preview-table.md` | 1차 수정본 원문 · 전후 비교표 |
| `apply-question-text.mjs` · `apply.log` | 1차 반영 스크립트 · 기록 |
| `t3-backup.json` | 2차 반영 **전** T3 6개 항목(이름·질문·답변) — 되돌리기 백업 |
| `t3-revised.json` | 2차 수정본 |
| `apply-t3.mjs` · `apply-t3.log` | 2차 반영 스크립트 · 기록 |

## 반영 방법 · 되돌리기

어드민 문항 수정 API `PUT /api/admin/questions/:collection/:id` 를 문항 편집 전용 키로 부른다
(헤더 `x-question-key`, API `f123236`). 키는 각자의 lighthouse-api `.env` 에서 읽고, 값은 어디에도 적지 않는다.

- 스크립트는 기본이 미리보기다. `--apply` 를 붙여야 고친다
- 현재 DB 문구가 백업(수정 전)과 같을 때만 고친다. 다르면 건너뛴다(덮어쓰기 방지)
- 되돌리려면 `changes.json` 의 before/after 를 바꾸거나, `t3-revised.json` 을 `t3-backup.json` 값으로 만들어 같은 스크립트를 돌린다
- DB 필드 대응: T1·T21 `question_text` / T22 `field_definition` / T23 `value_question` / T3 `part_name`·`part_question`·`levels`
