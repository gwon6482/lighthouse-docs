// T3 업무 환경 — 항목 이름(part_name)·질문(part_question)·답변(levels)을 t3-revised.json 대로 고친다.
// 사용: node --env-file=../lighthouse-api/.env apply-t3.mjs [--apply]
// 첫 미리보기 때 현재 값을 t3-backup.json 에 저장한다(되돌리기용). 반영 때는 현재 값이 그 백업과 같을 때만 고친다.
import fs from 'node:fs'
const API = 'https://api.lighthouse.career'
const apply = process.argv.includes('--apply')
const key = process.env.QUESTION_EDITOR_KEY
if (apply && !key) { console.log('QUESTION_EDITOR_KEY 가 없습니다 — 반영하지 않음'); process.exit(1) }
const here = (f) => new URL(`./${f}`, import.meta.url)
const revised = JSON.parse(fs.readFileSync(here('t3-revised.json')))

const form = await (await fetch(`${API}/api/survey/form`)).json()
const items = form.survey.find((p) => p.survey_part === 'T3').items
const cur = Object.fromEntries(items.map((it) => [it.item_id, {
  part_name: it.item_name, part_question: it.item_question,
  levels: it.levels.map((l) => ({ level: l.level, description: l.description })),
}]))

const missing = revised.filter((r) => !cur[r.id]).map((r) => r.id)
if (missing.length) { console.log('DB에 없는 항목:', missing.join(', ')); process.exit(1) }

const backupFile = here('t3-backup.json')
if (!fs.existsSync(backupFile)) fs.writeFileSync(backupFile, JSON.stringify(cur, null, 1))
const backup = JSON.parse(fs.readFileSync(backupFile))
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

let ok = 0, already = 0, conflict = 0, fail = 0
for (const r of revised) {
  const want = { part_name: r.part_name, part_question: r.part_question, levels: r.levels.map((d, i) => ({ level: i + 1, description: d })) }
  const now = cur[r.id]
  const diff = Object.keys(want).filter((k) => !same(now[k], want[k]))
  if (!diff.length) { console.log(`= ${r.id} 이미 같음`); already++; continue }
  if (!same(now, backup[r.id])) { console.log(`! ${r.id} 백업 뒤에 누가 다르게 고침 — 건너뜀`); conflict++; continue }
  const body = Object.fromEntries(diff.map((k) => [k, want[k]]))
  if (!apply) {
    console.log(`~ ${r.id} (${diff.join(', ')})`)
    if (body.part_name) console.log(`  이름  - ${now.part_name}\n        + ${want.part_name}`)
    if (body.part_question) console.log(`  질문  - ${now.part_question}\n        + ${want.part_question}`)
    if (body.levels) want.levels.forEach((l, i) => { if (now.levels[i]?.description !== l.description) console.log(`  ${l.level}.   - ${now.levels[i]?.description}\n        + ${l.description}`) })
    ok++; continue
  }
  const res = await fetch(`${API}/api/admin/questions/T3_environmental/${r.id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-question-key': key }, body: JSON.stringify(body),
  })
  const out = await res.json().catch(() => ({}))
  const saved = out.data && Object.keys(body).every((k) => k === 'levels'
    ? same(out.data.levels?.map((l) => ({ level: l.level, description: l.description })), body.levels)
    : out.data[k] === body[k])
  if (res.ok && out.success && saved) { console.log(`✔ ${r.id}`); ok++ }
  else {
    console.log(`✘ ${r.id} ${res.status} ${out.error ?? ''}`); fail++
    if (res.status === 401 || res.status === 403) { console.log('인증 실패 — 중단'); break }
  }
}
console.log(`\n${apply ? '반영' : '바뀔 항목'}: ${ok} / 이미 같음: ${already} / 다르게 고쳐져 있음: ${conflict} / 실패: ${fail}`)
