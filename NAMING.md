# Lighthouse 네이밍 표준 (단일 진실원천)

> 모든 프로젝트 이름은 `lighthouse-<역할>` **kebab-case**로 통일한다.
> S3 버킷명은 변경 불가라 **레거시 이름 유지** — 아래 매핑으로 역할↔버킷을 추적한다(의도된 레거시).
> 최종 갱신: 2026-06-15

## 역할 ↔ 표면 매핑

| 역할 | 표준명 | 로컬 dir | GitHub 레포 | S3 버킷(레거시 유지) | 서버(pm2 / 경로) | 도메인 |
|---|---|---|---|---|---|---|
| 본서비스(예정) | lighthouse-app | (추후) | `lighthouse-app` | lighthouse-career-app | — | app.lighthouse.career |
| 테스트(현 앱) | lighthouse-test | `lighthouse-test` | `lighthouse-test` | lighthouse-career-fe | — | lighthouse.career |
| 관리자 | lighthouse-admin | `lighthouse-admin` | `lighthouse-admin` | — | pm2 `lighthouse-admin` / `/home/dev/lighthouse-admin` | admin.lighthouse.career |
| API | lighthouse-api | `lighthouse-api` | `lighthouse-api` | — | pm2 `lighthouse-api` / `/root/lighthouse_project/lighthouse-api` | api.lighthouse.career |
| 랜딩 | lighthouse-landing | `lighthouse-landing` | `lighthouse-landing` | lighthouse-www-landing | — | www.lighthouse.career |
| 문서 | lighthouse-docs | — | `lighthouse-docs` | — | — | — |

## 아카이브된 레거시 레포 (복구 가능, 사용 금지)
- `lighthousedbapi` (구 API 초기버전)
- `lighthouse_service` (구 본서비스, 2025)

## ⚠️ 버킷명-역할 불일치 (의도된 레거시)
S3 버킷은 생성 후 이름변경 불가. 아래는 **의도된 불일치**이며 사고 방지를 위해 명시:
- `lighthouse-career-fe`  = **lighthouse-test** 역할 (현 앱)
- `lighthouse-career-app` = **lighthouse-app** 역할 (본서비스, 예정)
- `lighthouse-www-landing` = **lighthouse-landing** 역할

## 이력
- 2026-06-15: 4가지 컨벤션 혼재(camelCase/snake/kebab/붙임) → `lighthouse-<역할>` kebab 통일.
  레포 rename: lighthouse_vue→lighthouse-test, lightHouse_admin→lighthouse-admin,
  lighthouse_DB_API→lighthouse-api, lighthouse-service→lighthouse-app.
  GitHub 구 URL 자동 리다이렉트로 무중단. 잔여 레포 2개 archive.
