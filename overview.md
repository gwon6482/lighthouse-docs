# Lighthouse 프로젝트 개요

> 이 문서는 3개의 서브 프로젝트가 공유하는 진행상황 및 설계 문서입니다.
> 각 Claude는 작업 시작 시 이 문서를 참조하고, 작업 완료 시 업데이트합니다.

## 프로젝트 구조

| 프로젝트 | 경로 | 역할 | 상태 |
|---------|------|------|------|
| **DB API** | `lighthouse_DB_API` | 백엔드 REST API (Express + MongoDB) | 🟡 개발 중 |
| **Frontend** | `LightHouse_app` | 사용자 앱 (설문·진로백과·진로계획) | 🟡 개발 중 |
| **Admin** | `lightHouse_admin` | 어드민 대시보드 (Next.js) | 🟡 개발 중 |

## 서비스 목적

진로 적성검사 + 진로 탐색 + 진로 계획 종합 플랫폼
- **자기이해 검사**: T1(성격) + T21(재능) + T22(흥미) + T23(가치관) + T3(업무환경)
- **진로백과**: 537개 직업 탐색, 매칭 점수, 후기
- **진로계획**: 목표 진로 설정 → 프로젝트 구성 → 타임라인
- **진로달성**: (개발 예정)

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| Backend | Node.js 20 + Express + Mongoose (MongoDB Atlas) |
| Frontend | Vue 3 + TypeScript + Vite + Capacitor (iOS/Android) |
| Admin | Next.js (홈서버 PM2 port 3010) |
| 인증 | JWT Bearer Token (7일) |
| 배포 | S3+CloudFront (FE), 홈서버 PM2 (API·Admin) |

## 도메인 구성 (2026-05-21 기준)

| 도메인 | 용도 | 상태 |
|--------|------|------|
| `test.lighthouse.career` | 구 테스트 페이지 | 🔴 정리 예정 |
| `www.lighthouse.career` | 랜딩페이지 | 🟡 연결 예정 |
| `app.lighthouse.career` | 서비스 앱 | 🟡 이전 예정 (현재 lighthouse.career) |
| `api.lighthouse.career` | DB API | ✅ 운영 중 |
| `admin.lighthouse.career` | Admin 패널 | ✅ 운영 중 |

## DB 구성 (MongoDB Atlas)

| DB명 | 용도 |
|------|------|
| `user_data` | 유저 계정 (인증, 북마크, 목표진로, 추천직업 등) |
| `survey_questions` | 설문 질문 데이터 (T1~T3) |
| `survey_data` | 응답 결과 및 통계 |
| `job_data` | 직업 정보 537건 + 후기 |
| `reference_data` | 공통 참조 코드 (설문 요소, 진로백과 속성, T1 유형) |

## 서브 프로젝트 경로 (로컬)

| 프로젝트 | 경로 |
|---------|------|
| DB API | `/Users/seojiwon/dev/LighthouseProject/lighthouse_DB_API` |
| Frontend | `/Users/seojiwon/dev/LighthouseProject/LightHouse_app` |
| Admin | `/Users/seojiwon/dev/LighthouseProject/lightHouse_admin` |

## 공통 규칙

- API 기본 URL: `https://api.lighthouse.career`
- 응답 형식: `{ success: true/false, data: ..., error: ... }`
- 설문 영역 코드: `T1` 성격 / `T21` 재능 / `T22` 흥미 / `T23` 가치관 / `T3` 업무환경
- DB API 배포: `main` 브랜치 push → GitHub Actions 자동 배포
- FE 배포: S3 + CloudFront

## 로드맵 (2026-05-21 기준)

| 순서 | 항목 | 설명 |
|------|------|------|
| 1 | 워크넷 API 채용정보 | 직업 상세 채용 탭 실데이터 연동 |
| 2 | 진로계획 기능 개선 | 플랜 CRUD, 타임라인, 진행률 |
| 3 | 진로달성 생성 | 새 모듈 설계 및 구현 |
| 4 | 메인페이지 종합 | 홈 화면에 전체 기능 요약 연결 |
| 5 | 랜딩페이지 + 도메인 정리 | www/app 도메인 분리 |
