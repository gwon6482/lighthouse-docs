# 🧭 Lighthouse 랜딩(+연구 설문) FE 시작 프롬프트

> 대상: `lighthouse-landing`에 새로 합류한 FE 개발자. 첫 작업 범위는 **연구 설문(`/survey`)과 설문 결과지**다.
> 사용법: `lighthouse-landing` 폴더에서 Claude Code를 열고, 아래 코드 블록 안의 내용을 **첫 메시지로** 붙여넣는다.
> 작성 2026-10-16.
> **2026-10-19 추가:** 레포에 팀 공용 설정(`CLAUDE.md`, 세션 시작 훅, `/작업준비`, Playwright `.mcp.json`)이 들어갔다(dev `bfa7a36`).
> 이제 규칙은 CLAUDE.md가 매 세션 자동으로 싣는다. 이 프롬프트는 **처음 한 번** 전체를 이해시키는 용도로만 쓴다. 사실(파일·수치)은 바뀔 수 있으니, 프롬프트는 Claude에게 **직접 읽고 확인하라**고 시킨다.

---

```
안녕. 나는 Lighthouse 프로젝트에 새로 합류한 FE 개발자고, 이 레포(lighthouse-landing)를 맡게 됐어.
첫 작업 범위는 연구 설문 페이지(/survey)와 설문 결과지(화면·이미지·PDF)야.
코드를 고치기 전에 아래 "1. 먼저 읽을 것"을 실제로 다 읽고, 마지막에 "5. 읽고 나서 보고할 것"을 나에게 보고해 줘.
읽기 전에는 파일을 수정하지 마.

## 0. 프로젝트 한 줄
Lighthouse = 진로 적성검사(성격·재능·흥미·가치관·업무환경 5영역) → 직업 추천 → 진로계획 서비스.
레포는 역할별로 나뉘어 있고 서로 독립이야(모노레포 아님):
- lighthouse-api   : Express + MongoDB Atlas. https://api.lighthouse.career (AWS Lightsail 컨테이너)
- lighthouse-test  : 본 서비스 앱(Vue, pnpm 모노레포). test.lighthouse.career(스테이징) / app.lighthouse.career(프로덕션)
- lighthouse-admin : 어드민(Next.js, Vercel). admin.lighthouse.career
- lighthouse-landing ← 여기. Nuxt 3 정적 사이트(SSG). www.lighthouse.career

## 1. 먼저 읽을 것 (순서대로)
공유 문서(공개 raw URL, WebFetch로 읽기):
1) https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/overview.md            — 전체 구조
2) https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/research/survey-collection-design.md — 연구 설문을 왜·어떻게 만드는지(설계 정본)
3) 최근 개발일지 2개 — 파일명이 YYYY-MM-DD.md라 이름순이 곧 날짜순이야. 목록을 받아 마지막 2개를 읽어:
   curl -sS "https://api.github.com/repos/gwon6482/lighthouse-docs/contents/devlog" | grep -o '"name": "[0-9-]*\.md"' | sort | tail -2
   → https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/devlog/<파일명>
   (날짜를 하드코딩하지 말 것. 문서가 늘어도 최신을 놓치지 않게)
4) 필요할 때: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/db-api/progress.md — API 쪽 현황

레포 안:
5) STYLE-GUIDE.md, BACKLOG.md (루트) — 실제 코드에서 뽑은 스타일 규칙 / 미뤄둔 과제
6) nuxt.config.ts — SCSS 변수·믹스인이 모든 파일에 자동 주입되는 방식, 폰트, runtimeConfig
7) 설문 코드 전체(약 3,800줄). 아래 순서로 읽으면 흐름이 잡혀:
   - composables/useResearchSurvey.ts — 단계(intro → meta → survey → review → done), 진행 저장(localStorage), 제출
   - pages/survey.vue                 — 화면 셸. ?c=<캠페인>, ?r=<respondent_id>(결과 다시 보기)
   - components/survey/ScaleQuestion·InterestSelect·ValuePriority·EnvironmentSelect·JobPicker.vue — 문항 유형별 입력
   - components/survey/ReviewForm.vue — 실무자 전용 직업 후기(제출 뒤, 결과 앞, 선택)
   - composables/useResearchResult.ts, components/survey/ResearchResult.vue — 화면 결과지
   - composables/currentJobMatch.ts, components/survey/MatchRing.vue — 실무자의 "현재 직업과의 매칭도"
   - composables/useResultExport.ts, components/survey/ExportSheet.vue — 결과 내보내기(이미지 여러 장/긴 한 장, PDF)
   - components/survey/report/ — PDF 전용 A4 양식 (ResultReport.vue의 PAGES = 쪽 구성, sections/Sec*.vue = 구역,
     reportText.ts = 문구, report.scss = 색·글씨 토큰)
   - pages/survey-report.vue — 서버 PDF 렌더용 페이지(아래 4번 참고)
8) git log --oneline -30 (dev 브랜치) — 최근에 왜 무엇을 바꿨는지

## 2. 설문이 쓰는 API (모두 프로덕션 api.lighthouse.career)
- GET  /api/survey/form                          문항(하드코딩 금지. 정본은 DB)
- GET  /api/job/search?name=                     직업 검색(JobPicker)
- POST /api/survey/research/response             진행 저장·최종 제출(같은 respondent_id로 이어 쓰기)
- GET  /api/survey/research/result/:respondent_id 결과
- POST /api/survey/research/review               실무자 직업 후기 → 어드민 승인 후 앱 진로백과에 노출
서버 문서: https://api.lighthouse.career/api-docs (Swagger)

## 3. 꼭 지킬 것 — 코드만 봐서는 알 수 없는 결정들
[브랜치·배포]
- 작업은 dev 브랜치에서 해. main에 push하면 GitHub Actions가 곧바로 www.lighthouse.career(프로덕션)에 배포해.
- /survey는 아직 dev에만 있어. 개인정보처리방침 개정 시행일(2026-10-22) 전에는 main에 올리면 안 되고,
  그 뒤에도 main 머지는 프로젝트 오너가 결정해. main push·머지는 절대 임의로 하지 마.
[데이터 — 로컬에서도 프로덕션 DB를 쓴다]
- 스테이징 API가 없어. 로컬에서 설문을 진행해도 응답이 프로덕션 DB에 저장돼.
  테스트할 때는 반드시 /survey?c=__local_test__ 로 들어가서 테스트 표식을 달아(나중에 이 표식으로 한꺼번에 지운다).
  표식 없이 끝까지 제출하지 마.
- 제출은 /api/survey/research/response만 써. 앱용 /api/survey/response로 보내면 서비스 통계가 오염돼.
- 연구 API에는 IP당 요청 제한이 있어. 테스트를 연달아 돌리다 429가 나면 버그가 아니라 제한이야(잠깐 기다릴 것).
[결과 내보내기 약속 — "결과지 컴포넌트를 고쳐도 내보내기가 깨지지 않아야 한다"는 오너 요구]
- useResultExport는 결과지 내부 구조를 몰라야 해. 결과지가 지킬 약속은 세 가지뿐:
  ① ready 이벤트 ② 그림은 같은 도메인에서(다른 도메인 그림은 캡처에서 빈칸이 됨. 그래서 public/survey/t1에 복사해 둠)
  ③ 캡처에서 뺄 요소는 data-export-skip
- 이미지 "여러 장"은 결과지 루트 [data-export-chunks]의 직계 구역 단위로 나눠. 구역을 추가할 때 이 구조를 지켜.
- PDF는 화면을 잘라 붙이지 않아(폐기한 방식). report/ 전용 A4 양식이 API 데이터를 직접 그려.
  쪽 높이가 고정이라 내용이 넘치면 잘려. PDF를 만들 때 콘솔 경고(findPageOverflow)를 확인해.
- PDF 디자인 결정(오너 확정): 본문 굵기 최대 600, 프로파일 상위 3개만 700 / 막대 두께 2.2mm, 평균선은 회색 1px /
  영역별 일치도는 화면과 같은 색, 상자·라벨 배경 없음 / 목차 넣지 않음. 편집 가능성이 있으니 문구·색·쪽 구성은 위 파일에 모아 둬.
[스타일]
- 랜딩에는 두 세대 스타일이 섞여 있어: 랜딩 섹션 = snake_case + 전역(scoped 아님), 공통·설문 컴포넌트 = BEM + scoped. 섞지 마.
- 설문 화면 색은 랜딩 색(노랑 브랜드)이 아니라 앱(서비스)의 토큰을 따라(오너 결정).
- SCSS 파일에 @use를 쓰면 빌드가 깨져(nuxt.config의 additionalData가 @import 머리말을 붙이기 때문).
  별도 scss를 불러올 땐 <style src="..."> 방식으로.
- 짧은 칩 글자가 세로로 꺾이면 전역 스타일 탓이야 → white-space: nowrap.
- 폰트는 자체 호스팅(public/fonts)이야. CDN으로 되돌리지 마(CDN이 멈춰 내보내기가 같이 멈춘 적 있음).
[모바일]
- iOS Safari는 클릭 뒤 몇 초 지나면 navigator.share를 거부해. 그래서 "만들기"와 "저장/공유"를 두 번의 클릭으로 나눠 둠.
- iOS 캔버스 최대 면적(약 16.7M px)을 넘으면 빈 이미지가 나와. useResultExport가 배율을 낮춰 맞추니 그 로직을 지우지 마.
- iPhone Safari·카카오톡 인앱 브라우저 실기기 확인은 아직 아무도 못 했어. 사람이 직접 확인해야 하는 항목이야.
[데이터 해석]
- 결과지의 "상위 N%" / 평균선은 아직 더미 통계 기준이야(실사용자 표본 수집이 이 설문의 목적). 화면에 그대로 두되 수치를 근거로 쓰지 마.
- 검사일은 completed_at이야. submitted_at은 첫 중간 저장 시각이라 검사일이 아니야.

## 4. 로컬 실행
- npm install → npm run dev (http://localhost:3000). 정적 빌드 확인은 npm run generate 후 .output/public을 정적 서버로 띄워.
- generate 뒤에 dev가 "#internal/nuxt/paths" 에러로 안 뜨면 .nuxt / .output을 지우고 다시 실행.
- 텍스트 PDF(서버 렌더)는 아직 배포 전이야. NUXT_PUBLIC_PDF_SERVICE가 비어 있으면 이미지 PDF로 동작하는 게 정상이야.
- 확인 경로: /survey?c=__local_test__ (새로 시작) / /survey?r=<respondent_id> (결과 다시 보기).
  진행 상태는 localStorage에 남으니 처음부터 하려면 지우고 시작해.

## 5. 읽고 나서 보고할 것
1) 설문 단계 흐름과, 각 단계에서 어떤 API를 언제 부르는지 (그림처럼 간단히)
2) 결과 화면 / 이미지 내보내기 / PDF가 각각 무엇을 그리는지와, 셋 사이의 약속
3) 위 3번 규칙 중 지금 코드에서 실제로 확인한 것과 확인 못 한 것
4) 최근 개발일지·BACKLOG에서 내 작업 범위(설문·결과지)에 걸린 남은 일
5) 이해가 안 되거나 문서와 코드가 다른 곳 — 문서가 낡았을 수 있어. 다르면 코드를 기준으로 보고하고 차이를 알려 줘.

## 6. 작업 방식
- 화면을 바꾸면 브라우저로 직접 띄워서 확인하고 확인한 것만 "확인했다"고 말해(빌드 성공 ≠ 화면 정상).
- 문항 문구는 코드가 아니라 DB에 있어. 문구 수정 요청은 FE에서 하드코딩하지 말고 알려 줘.
- 작업이 끝나면 무엇을 왜 바꿨는지 짧게 정리해 줘. 공유 문서(lighthouse-docs devlog·frontend/progress.md) 갱신은
  내가 그 레포 권한이 있는지 먼저 물어봐.
```
