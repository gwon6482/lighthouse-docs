// 설문 문구 수정 — 어드민 API(PUT /api/admin/questions/:collection/:id)로 바꾼 문항만 고친다.
// 기본은 미리보기(아무것도 안 바꿈). 키는 명령줄에 쓰지 말고 .env 에서 읽는다:
//   node --env-file=../lighthouse-api/.env apply-question-text.mjs [--apply]
// 키 = QUESTION_EDITOR_KEY → 헤더 x-question-key (서버는 이 키로 PUT /api/admin/questions/... 만 허용)
// 반영 전에 현재 DB 문구가 '수정 전' 과 같은지 확인하고, 다르면(누가 먼저 고쳤으면) 건너뛴다.
import fs from 'node:fs'
const API = 'https://api.lighthouse.career'
const apply = process.argv.includes('--apply')
const key = process.env.QUESTION_EDITOR_KEY
if (apply && !key) { console.log('QUESTION_EDITOR_KEY 가 없습니다 — 반영하지 않음'); process.exit(1) }
const changes = JSON.parse(fs.readFileSync(new URL('./changes.json', import.meta.url)))

// 설문지 응답의 필드 → DB 컬렉션·필드 (surveyController.getSurveyForm 의 매핑을 거꾸로)
const target = (c) => {
  const p = c.id.split('_')[0]
  if (p === 'T1') return ['T1_personality', 'question_text']
  if (p === 'T21') return ['T2_1_talent', 'question_text']
  if (p === 'T22') return ['T2_2_interest', 'field_definition']
  if (p === 'T23') return ['T2_3_values', 'value_question']
  if (p === 'T3') return ['T3_environmental', 'part_question']
  throw new Error(c.id)
}

// 현재 문구 확인 — 공개 설문지 API
const form = await (await fetch(`${API}/api/survey/form`)).json()
const now = {}
for (const part of form.survey) {
  for (const [k, v] of Object.entries(part)) if (k.startsWith('page_')) for (const q of v) now[q.question_id] = q.question_text
  for (const it of part.items ?? []) now[it.item_id] = it.item_question || it.item_text
}

let ok = 0, same = 0, conflict = 0, fail = 0
for (const c of changes) {
  const [col, field] = target(c)
  if (now[c.id] === c.after) { console.log(`= ${c.id} 이미 반영됨`); same++; continue }
  if (now[c.id] !== c.before) { console.log(`! ${c.id} 현재 문구가 예상과 다름 — 건너뜀\n  현재: ${now[c.id]}`); conflict++; continue }
  if (!apply) { console.log(`~ ${col}/${c.id}.${field}\n  - ${c.before}\n  + ${c.after}`); ok++; continue }
  const res = await fetch(`${API}/api/admin/questions/${col}/${c.id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-question-key': key }, body: JSON.stringify({ [field]: c.after }),
  })
  const body = await res.json().catch(() => ({}))
  if (res.ok && body.success && body.data?.[field] === c.after) { console.log(`✔ ${c.id}`); ok++ }
  else {
    console.log(`✘ ${c.id} ${res.status} ${body.error ?? ''}`); fail++
    // 인증 실패는 나머지도 똑같이 실패한다 — 더 보내지 않고 멈춘다
    if (res.status === 401 || res.status === 403) { console.log('인증 실패 — 중단'); break }
  }
}
console.log(`\n${apply ? '반영' : '바뀔 문항'}: ${ok} / 이미 같음: ${same} / 다르게 고쳐져 있음: ${conflict} / 실패: ${fail}`)
