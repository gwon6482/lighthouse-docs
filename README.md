# 🚀 Lighthouse 작업 시작 프롬프트

> 새 대화 시작 시 아래 내용을 복사하여 첫 메시지로 붙여넣으세요.

---

## 📋 공통 프롬프트 (모든 참여자)

```
안녕! 작업 시작 전에 Lighthouse 프로젝트 공유 문서를 읽어줘.

1. 전체 개요: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/overview.md
2. DB API 현황: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/db-api/progress.md
3. Frontend 현황: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/frontend/progress.md
4. Admin 현황: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/admin/progress.md
5. 최근 개발일지: https://raw.githubusercontent.com/gwon6482/lighthouse-docs/main/devlog/2026-04-01.md

문서를 읽고 나서:
- DB 구조를 메모리에 업데이트 해줘
- 전체 프로젝트의 흐름 및 관계를 숙지 해줘

작업이 끝나면 변경사항을 공유 문서에 반영해줄 것도 잊지 말아줘.
```

---

## 🗂️ 프로젝트별 추가 프롬프트

### DB API 담당
```
나는 lighthouse_DB_API (Node.js + Express + MongoDB) 담당이야.
오늘 작업:
```

### Frontend 담당
```
나는 lighthouse_FE (Frontend) 담당이야.
DB API 서버는 이미 구현되어 있으니 API 명세를 참고해서 작업해줘.
오늘 작업:
```

### Admin 담당
```
나는 lighthouse_admin (어드민 대시보드) 담당이야.
DB API 서버는 이미 구현되어 있으니 API 명세를 참고해서 작업해줘.
오늘 작업:
```

---

## 📝 작업 완료 후 문서 업데이트 규칙

작업 종료 시 Claude에게 아래 내용을 요청하세요:

```
오늘 작업한 내용을 lighthouse-docs에 반영해줘.
레포: https://github.com/gwon6482/lighthouse-docs

1. progress.md 업데이트: [db-api/progress.md | frontend/progress.md | admin/progress.md]
2. 개발일지 작성/추가: devlog/YYYY-MM-DD.md
```

---

## 📅 개발일지 안내

개발일지는 `devlog/` 폴더에 날짜별로 저장됩니다.

- 형식: `devlog/YYYY-MM-DD.md`
- 하루에 여러 파트(DB API, Frontend, Admin)가 작업한 경우 **같은 파일에 섹션을 추가**
- 목록: https://github.com/gwon6482/lighthouse-docs/tree/main/devlog
