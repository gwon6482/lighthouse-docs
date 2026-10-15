# 고용24 직무정보 API

> 인증키: `WORK24_KEY_DUTY` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16

**우리 서비스에서**: NCS 직무 능력 정의 — 준비과정(필요 역량) 보강 후보.


## 표준직무기술서

✅ 호출 확인

> 표준직무기술서 API를 이용하여 AI가 추천해준 직무정보로 직무기술서를 작성할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo215L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo215L01.do?authKey=[WORK24_KEY_DUTY]&jobCont=[수행직무내용]&limit=[출력건수]&returnType=JSON
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo215L01.do?authKey=[WORK24_KEY_DUTY]&jobCont=간호&limit=5&returnType=JSON`

> ⚠️ ⚠️ **40·41 이 완전히 같은 응답**을 준다(주소가 다른데도). 검색어(간호)와 무관한 결과(축산 '처방 처치')가 나와 **검색어가 반영되지 않는 것으로 보인다**. 응답은 JSON.

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| jobCont | String | Y | 수행직무내용 |
| limit | int | N | NCS 능력단위 출력건수<br>(default 5 건) |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |
|---|---|---|---|---|
| result | Object | 결과 Data |  |  |
|  | NCS 능력단위명 | Object | NCS 능력단위명이 한글로 표시됩니다 |  |
|  |  | job_sdvn | String | NCS 능력단위명 |
|  |  | ablt_def | String | NCS 능력단위 정의 |
|  |  | job_scfn | String | NCS 소분류명 |
|  |  | job_scla_cd | String | NCS 소분류코드 |
|  |  | job_lrcl_cd | String | NCS 대분류코드 |
|  |  | job_mcn | String | NCS 중분류명 |
|  |  | job_lcfn | String | NCS 대분류명 |
|  |  | job_sdvn_cd | String | NCS 세분류코드 |
|  |  | job_mlsf_cd | String | NCS 중분류코드 |
|  |  | ablt_unit | String | NCS 능력단위 코드 |
|  |  | knwg_tchn_attd | String | 지식기술태도 |
|  |  | ablt_def | String | NCS 능력단위 정의 |
|  |  | abltLabel | String | NCS 능력단위명 |
|  |  | ablt | String | NCS 능력단위 URI |
|  |  | ablt_unit | String | NCS 능력단위코드 |
|  |  | job_lrcl_cd | String | NCS 대분류코드 |
|  |  | job_lcfn | String | NCS 대분류명 |
|  |  | job_mlsf_cd | String | NCS 중분류코드 |
|  |  | job_mcn | String | NCS 중분류명 |
|  |  | job_scla_cd | String | NCS 소분류코드 |
|  |  | job_scfn | String | NCS 소분류명 |
|  |  | job_sdvn_cd | String | NCS 세분류코드 |
|  |  | job_sdvn | String | NCS 세분류명 |
|  |  | fctr | Array | NCS 능력단위요소 |
|  | ablt_fctr_label | String | NCS 능력단위요소명 |  |
|  | ablt_fctr | String | NCS 능력단위요소 URI |  |
|  |  | attds | Array | 지식기술태도 |
|  | attd_label | String | 지식기술태도명 |  |
|  | attd | String | 지식기술태도 URI |  |
|  |  | req | Array | 관련자격증 |
|  | req_label | String | 관련자격증명 |  |
|  | req | String | 관련자격증 URI |  |
|  |  | hrd | Array | 관련직업훈련 |
|  | hrd_label | String | 관련직업훈련 |  |
|  | hrd | String | 관련직업훈련 URI |  |
|  |  | occp | Array | 관련직업 |
|  | occp_label | String | 관련직업명 |  |
|  | occp | String | 관련직업 URI |  |
|  |  | sbjt | Array | 관련학과 |
|  | sbjt_label | String | 관련학과명 |  |
|  | sbjt | String | 관련학과 URI |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
{
 "result": {
  "처방 처치": {
   "ablt_def": "처방 처치란 동물의 질병진단 결과를 바탕으로 회복에 필요한 처방을 내리고, 필요한 약품을 투약하며, 사후관리를 실시하는 능력이다.",
   "job_scfn": "축산자원개발",
   "job_mcn": "축산",
   "centerLabel": "처방 처치",
   "centerURL": "http://lod.work.go.kr/task/업무/_2402010402",
   "job_mlsf_cd": "http://lod.work.go.kr/task/중분류/_2402",
   "job_sdvn": "수의서비스",
   "job_scla_cd": "http://lod.work.go.kr/task/소분류/_240201",
   "occp": [
    {
     "job_occp_label": "처방 처치",
     "job_occp": "http://lod.work.go.kr/task/업무/_2402010402"
    }
   ],
   "job_lrcl_cd": "http://lod.work.go.kr/task/대분류/_24",
   "knwg_tchn_attd": [
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/지식/동물보정학",
     "knwg_tchn_attd_label": "동물보정학"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/지식/동물피부학",
     "knwg_tchn_attd_label": "동물피부학"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/지식/사양관리_관련_지식",
     "knwg_tchn_attd_label": "사양관리 관련 지식"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/기술/각종_계획_수립_능력",
     "knwg_tchn_attd_label": "각종 계획 수립 능력"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/기술/동물보정_능력",
     "knwg_tchn_attd_label": "동물보정 능력"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/기술/부작용_발생시_응급처치_능력",
     "knwg_tchn_attd_label": "부작용 발생시 응급처치 능력"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/태도/동물을_편안하게_다룰_수_있는_태도",
… (생략)
```


## 직무데이터사전

✅ 호출 확인

> 데이터사전 API를 이용하여 다양한 직무에 대한 정보를 구성할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo215L11.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo215L11.do?authKey=[WORK24_KEY_DUTY]&word=[키워드]&limit=[출력건수]&returnType=JSON
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo215L11.do?authKey=[WORK24_KEY_DUTY]&word=간호&limit=5&returnType=JSON`

> ⚠️ 40 과 같은 응답 — 40 의 주의 참조.

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| word | String | Y | 키워드 |
| limit | int | N | NCS 능력단위 출력건수<br>(default 5 건) |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |
|---|---|---|---|---|
| result | Object | 결과 Data |  |  |
|  | NCS 능력단위명 | Object | NCS 능력단위명이 한글로 표시됩니다 |  |
|  |  | job_sdvn | String | NCS 능력단위명 |
|  |  | ablt_def | String | NCS 능력단위 정의 |
|  |  | job_scfn | String | NCS 소분류명 |
|  |  | job_scla_cd | String | NCS 소분류코드 |
|  |  | job_lrcl_cd | String | NCS 대분류코드 |
|  |  | job_mcn | String | NCS 중분류명 |
|  |  | job_lcfn | String | NCS 대분류명 |
|  |  | job_lcfn | String | NCS 대분류명 |
|  |  | job_sdvn_cd | String | NCS 세분류코드 |
|  |  | job_mlsf_cd | String | NCS 중분류코드 |
|  |  | ablt_unit | String | NCS 능력단위 코드 |
|  |  | ablt_def | String | NCS 능력단위 정의 |
|  |  | abltLabel | String | NCS 능력단위명 |
|  |  | ablt | String | NCS 능력단위 URI |
|  |  | ablt_unit | String | NCS 능력단위코드 |
|  |  | job_lrcl_cd | String | NCS 대분류코드 |
|  |  | job_lcfn | String | NCS 대분류명 |
|  |  | job_mlsf_cd | String | NCS 중분류코드 |
|  |  | job_mcn | String | NCS 중분류명 |
|  |  | job_scla_cd | String | NCS 소분류코드 |
|  |  | job_scfn | String | NCS 소분류명 |
|  |  | job_sdvn_cd | String | NCS 세분류코드 |
|  |  | job_sdvn | String | NCS 세분류명 |
|  | fctr | Array | NCS 능력단위요소 |  |
|  | ablt_fctr_label | String | NCS 능력단위요소명 |  |
|  | ablt_fctr | String | NCS 능력단위요소 URI |  |
|  |  | req | Array | 관련자격증 |
|  | req_label | String | 관련자격증명 |  |
|  | req | String | 관련자격증 URI |  |
|  |  | hrd | Array | 관련직업훈련 |
|  | hrd_label | String | 관련직업훈련 |  |
|  | hrd | String | 관련직업훈련 URI |  |
|  |  | occp | Array | 관련직업 |
|  | occp_label | String | 관련직업명 |  |
|  | occp | String | 관련직업 URI |  |
|  |  | sbjt | Array | 관련학과 |
|  | sbjt_label | String | 관련학과명 |  |
|  | sbjt | String | 관련학과 URI |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
{
 "result": {
  "처방 처치": {
   "ablt_def": "처방 처치란 동물의 질병진단 결과를 바탕으로 회복에 필요한 처방을 내리고, 필요한 약품을 투약하며, 사후관리를 실시하는 능력이다.",
   "job_scfn": "축산자원개발",
   "job_mcn": "축산",
   "centerLabel": "처방 처치",
   "centerURL": "http://lod.work.go.kr/task/업무/_2402010402",
   "job_mlsf_cd": "http://lod.work.go.kr/task/중분류/_2402",
   "job_sdvn": "수의서비스",
   "job_scla_cd": "http://lod.work.go.kr/task/소분류/_240201",
   "occp": [
    {
     "job_occp_label": "처방 처치",
     "job_occp": "http://lod.work.go.kr/task/업무/_2402010402"
    }
   ],
   "job_lrcl_cd": "http://lod.work.go.kr/task/대분류/_24",
   "knwg_tchn_attd": [
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/지식/동물보정학",
     "knwg_tchn_attd_label": "동물보정학"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/지식/동물피부학",
     "knwg_tchn_attd_label": "동물피부학"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/지식/사양관리_관련_지식",
     "knwg_tchn_attd_label": "사양관리 관련 지식"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/기술/각종_계획_수립_능력",
     "knwg_tchn_attd_label": "각종 계획 수립 능력"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/기술/동물보정_능력",
     "knwg_tchn_attd_label": "동물보정 능력"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/기술/부작용_발생시_응급처치_능력",
     "knwg_tchn_attd_label": "부작용 발생시 응급처치 능력"
    },
    {
     "knwg_tchn_attd": "http://lod.work.go.kr/task/태도/동물을_편안하게_다룰_수_있는_태도",
… (생략)
```
