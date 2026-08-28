# Lighthouse 프로젝트 개요

> 서브 프로젝트가 공유하는 진행상황 및 설계 문서.
> 각 Claude는 작업 시작 시 이 문서를 참조하고, 작업 완료 시 업데이트합니다.
> 최종 갱신: **2026-08-28**

## 프로젝트 구조

네이밍은 `lighthouse-<역할>` **kebab-case**로 통일(2026-06-15). 정본 매핑은 프로젝트 루트 `NAMING.md`.

| 역할 | 레포 / 로컬 dir | 내용 | 상태 |
|---|---|---|---|
| **API** | `lighthouse-api` | 백엔드 REST API (Express + MongoDB Atlas) | ✅ 운영 중 |
| **FE 모노레포** | `lighthouse-test` | pnpm workspaces. 사용자 앱 코드 일원화 | 🟡 개발 중 |
| **Admin** | `lighthouse-admin` | 어드민 대시보드 (Next.js) | ✅ 운영 중 |
| **랜딩** | `lighthouse-landing` | 랜딩페이지 (Nuxt SSG) | ✅ 운영 중 |

> ⚠️ 구 이름 `lighthouse_DB_API` / `LightHouse_app` / `lightHouse_admin`은 **폐기**. 구 `lighthouse-app` 레포도 코드 일원화로 사용하지 않음.

### FE 모노레포 구조 (2026-06-24 전환)

한 코드베이스(`packages/core` = 기능모듈 + shared)에 **두 개의 셸**:

| 셸 | 용도 | 도메인 | 배포 트리거 |
|---|---|---|---|
| `apps/test` | 워크벤치(전체 기능) — 스테이징 | test.lighthouse.career | `main` push |
| `apps/app` | 프로덕션 본서비스(완성 기능만) | app.lighthouse.career | `v*` 태그 push |

- `@` alias = `packages/core/src`
- **승격** = `apps/app` 라우터(`shared/router/app.ts`)에 모듈 import 추가 (현 정책: v1은 전체 모듈 노출)
- app 진입가드: 토큰 無 → `/onboarding` / plan 無 → `/main/before` / plan 有 → `/career-achievement`

## 서비스 목적

진로 적성검사 + 진로 탐색 + 진로 계획 + 실행 종합 플랫폼

- **자기이해 검사**: T1(성격) + T21(재능) + T22(흥미) + T23(가치관) + T3(업무환경)
- **진로백과**: 537개 직업 탐색, 매칭 점수, 후기
- **진로설계**: 목표 진로 설정 → 프로젝트 구성 → 타임라인 → 루틴
- **진로달성**: 데일리 실행·인증사진·주간 리뷰·주간 일정 (**설계 후 메인이 곧 이 화면**)

## 기술 스택

| 레이어 | 기술 |
|---|---|
| Backend | Node.js 20 + Express + Mongoose (MongoDB Atlas) |
| Frontend | Vue 3.5 + TypeScript 5.9 + Vite 7.3 + Pinia + Capacitor 8 |
| Admin | Next.js + NextAuth v5 |
| 랜딩 | Nuxt (SSG, `npm run generate`) |
| 인증 | JWT Bearer Token (7일) |

## 배포 인프라 (2026-06-25 클라우드 이전 완료)

| 대상 | 방식 |
|---|---|
| **API** | `main` push → GitHub Actions → Docker → `ghcr.io/gwon6482/lighthouse-api` → **AWS Lightsail 컨테이너**(ap-northeast-2, nano, port 8080) |
| **Admin** | `main` push → **Vercel** Git 연동 자동 빌드/배포 |
| **FE test** | `main` push → S3 `lighthouse-career-fe` → CF `EYU43VZ4GPE7Q` |
| **FE app** | `v*` 태그 → S3 `lighthouse-career-app` → CF `E3LGZIV007TKVC` |
| **랜딩** | `main` push → generate → S3 `lighthouse-www-landing` → CF 무효화 |

> ⚠️ **홈서버 PM2 방식은 전부 폐기됨**(구 port 3000/3010). API=Lightsail, Admin=Vercel로 서로 다른 플랫폼.
> env: API는 GitHub Secrets(레포 시크릿), Admin은 Vercel 프로젝트 env.

## 도메인 구성

| 도메인 | 용도 | 상태 |
|---|---|---|
| `www.lighthouse.career` | 랜딩페이지 | ✅ 운영 중 |
| `app.lighthouse.career` | 본서비스(프로덕션) | ✅ 운영 중 |
| `test.lighthouse.career` | 스테이징 워크벤치 | ✅ 운영 중 |
| `api.lighthouse.career` | API | ✅ 운영 중 |
| `admin.lighthouse.career` | Admin 패널 | ✅ 운영 중 |
| `lighthouse.career` (루트) | → www 301 리다이렉트 | ✅ |

## DB 구성 (MongoDB Atlas)

| DB명 | 용도 |
|---|---|
| `user_data` | 유저 계정(인증·북마크·목표진로·추천직업), 진로계획, 진로달성 기록 |
| `survey_questions` | 설문 질문 데이터 (T1~T3) — **문항 텍스트는 코드가 아닌 여기에만 존재** |
| `survey_data` | 응답 결과 및 통계 |
| `job_data` | 직업 정보 537건 + 후기 |
| `reference_data` | 공통 참조 코드 (설문 요소, 진로백과 속성, T1 유형) |

## 공통 규칙

- API 기본 URL: `https://api.lighthouse.career`
- 응답 형식: `{ success: true/false, data: ..., error: ... }`
- 설문 영역 코드: `T1` 성격 / `T21` 재능 / `T22` 흥미 / `T23` 가치관 / `T3` 업무환경
- 관리자 API(`/api/admin` 등)는 `x-admin-key` 필요 — Admin 앱의 서버 프록시가 주입(2026-07-31~)

## 로드맵

| 순서 | 항목 | 설명 |
|---|---|---|
| 1 | 워크넷 API 채용정보 | 직업 상세 채용 탭 실데이터 연동 |
| 2 | 직업 준비정보 API | `GET .../preparation` 백엔드 신규. **현재 준비과정·채용 탭은 API가 아니라 FE 하드코딩 맵(013601·024101 2건뿐)** — frontend/progress.md 주의문 참조 |
| 3 | 회원가입 진로답변 서버 저장 | 현재 localStorage 임시 → 유실 |
| 4 | 진로달성 피드 | 사용자 인증 기록 모아보기 |
| 5 | SNS 로그인 | 카카오/Apple/Google OAuth |

> 구 로드맵의 "진로달성 생성"·"메인페이지 종합"·"랜딩+도메인 정리"는 완료되어 제외.

## 📌 문서 신뢰도 주의

각 progress.md의 "미완성" 목록은 실제 코드보다 뒤처지는 일이 잦다.
착수 전 **코드/프로덕션 실측으로 확인**할 것. (2026-08-07에 3건이 이미 완료된 상태로 잘못 남아있는 것을 발견해 정정함.
2026-08-17에는 "백엔드 미구현"으로 적힌 preparation/recruitment가 실제로는 **FE가 호출조차 하지 않는 경로**임을 확인해 정정함)
