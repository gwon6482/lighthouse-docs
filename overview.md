# Lighthouse 프로젝트 개요

> 이 문서는 3개의 서브 프로젝트가 공유하는 진행상황 및 설계 문서입니다.
> 각 Claude는 작업 시작 시 이 문서를 참조하고, 작업 완료 시 업데이트합니다.

## 프로젝트 구조

| 프로젝트 | 레포 | 역할 | 상태 |
|---------|------|------|------|
| **DB API** | lighthouse_DB_API | 백엔드 REST API (Express + MongoDB) | 🟡 개발 중 |
| **Frontend** | lighthouse_FE | 사용자 설문 및 결과 페이지 | 🟡 개발 중 |
| **Admin** | lighthouse_admin | 어드민 대시보드 | 🟡 개발 중 |

## 서비스 목적

진로 적성검사 다차원 설문조사 서비스
- 사용자: 설문 참여 → 결과 보고서 확인
- 관리자: 질문 관리, 통계 조회

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Frontend | Vue 3 + TypeScript + Vite (Capacitor 하이브리드) |
| Admin | (미정, Next.js 권장) |
| 배포 | Vercel (DB API, Frontend) |

## DB 구성 (MongoDB Atlas)

| DB명 | 용도 |
|------|------|
| `survey_questions` | 설문 질문 데이터 (T1~T3) |
| `survey_data` | 응답 결과 및 통계 |
| `job_data` | 직업 정보 538건 |
| `reference_data` | 공통 참조 코드 (요소 정의, 진로백과 속성) |

## 공통 규칙

- API 기본 URL: `https://lighthouse-db.vercel.app` (또는 배포 URL)
- 응답 형식: `{ success: true/false, data: ..., error: ... }`
- 설문 영역 코드: `T1` 성격 / `T21` 재능 / `T22` 흥미 / `T23` 가치관 / `T3` 업무환경