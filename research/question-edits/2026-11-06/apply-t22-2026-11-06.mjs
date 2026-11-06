// T22 흥미 분야명·설명 수정 — 어드민 API(PUT /api/admin/questions/T2_2_interest/:id)로 바꾼 항목만 고친다.
// 기본은 미리보기(아무것도 안 바꿈). 키는 명령줄에 쓰지 말고 .env 에서 읽는다:
//   node --env-file=../lighthouse-api/.env apply-t22-2026-11-06.mjs [--apply]
// 키 = QUESTION_EDITOR_KEY → 헤더 x-question-key (서버는 이 키로 PUT /api/admin/questions/... 만 허용)
// 반영 전에 현재 DB 문구가 '수정 전' 과 같은지 확인하고, 다르면(누가 먼저 고쳤으면) 건너뛴다.
import fs from 'node:fs'
const API = 'https://api.lighthouse.career'
const COLLECTION = 'T2_2_interest'
const apply = process.argv.includes('--apply')
const key = process.env.QUESTION_EDITOR_KEY
if (apply && !key) { console.log('QUESTION_EDITOR_KEY 가 없습니다 — 반영하지 않음'); process.exit(1) }
const changes = JSON.parse(fs.readFileSync(new URL('./t22-changes-2026-11-06.json', import.meta.url)))

// 현재 문구 확인 — 공개 설문지 API (item_name = field_name, item_text = field_definition)
const form = await (await fetch(`${API}/api/survey/form`)).json()
const now = {}
for (const it of form.survey.find((p) => p.survey_part === 'T22').items) {
  now[it.item_id] = { field_name: it.item_name, field_definition: it.item_text }
}

let ok = 0, same = 0, conflict = 0, fail = 0
for (const c of changes) {
  const current = now[c.id]?.[c.field]
  if (current === c.after) { console.log(`= ${c.id}.${c.field} 이미 반영됨`); same++; continue }
  if (current !== c.before) { console.log(`! ${c.id}.${c.field} 현재 문구가 예상과 다름 — 건너뜀\n  현재: ${current}`); conflict++; continue }
  if (!apply) { console.log(`~ ${c.id}.${c.field}\n  - ${c.before}\n  + ${c.after}`); ok++; continue }
  const res = await fetch(`${API}/api/admin/questions/${COLLECTION}/${c.id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-question-key': key }, body: JSON.stringify({ [c.field]: c.after }),
  })
  const body = await res.json().catch(() => ({}))
  if (res.ok && body.success && body.data?.[c.field] === c.after) { console.log(`✔ ${c.id}.${c.field}`); ok++ }
  else {
    console.log(`✘ ${c.id}.${c.field} ${res.status} ${body.error ?? ''}`); fail++
    // 인증 실패는 나머지도 똑같이 실패한다 — 더 보내지 않고 멈춘다
    if (res.status === 401 || res.status === 403) { console.log('인증 실패 — 중단'); break }
  }
}
console.log(`\n${apply ? '반영' : '바뀔 항목'}: ${ok} / 이미 같음: ${same} / 다르게 고쳐져 있음: ${conflict} / 실패: ${fail}`)
