# 고용24 학과정보 API

> 인증키: `WORK24_KEY_MAJOR` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16

**우리 서비스에서**: 진로백과 관련 학과·준비과정 보강 후보.


## 학과정보 목록

✅ 호출 확인

> 학과정보 키워드 검색, 조건별 검색으로 학과목록 정보를 검색할 수 있고, 학과요약보기에 대한 정보를 학과정보 API를 통해 이용할 수 있습니다.
> 검색조건에 해당하는 학과목록을 제공합니다.
> 학과구분에 따라 일반학과, 이색학과의 상세 정보를 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213L01.do?authKey=[WORK24_KEY_MAJOR]&returnType=XML&target=MAJORCD&srchType=K&keyword=[키워드]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213L01.do?authKey=[WORK24_KEY_MAJOR]&returnType=XML&target=MAJORCD&srchType=K&keyword=간호`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| target | String | Y | 구분자 : MAJORCD 를 반드시 지정합니다. |
| srchType | String | Y | 검색타입을 반드시 지정합니다.<br>- A : 전체검색(All)<br>- K : 키워드검색(keyword) |
| keyword | String | Y | 학과명 키워드 검색시 입력합니다.(예: 금융 , 디자인)<br>UTF-8 인코딩입니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <majorsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <majorList> |  |  |  |  |
|  |  | <majorGb> | String | 학과구분코드<br>- 1 : 일반학과<br>- 2 : 이색학과 | </majorGb> |
|  |  | <knowDtlSchDptNm> | String | 세부학과명 | </knowDtlSchDptNm> |
|  |  | <knowSchDptNm> | String | 학과명 | </knowSchDptNm> |
|  |  | <empCurtState1Id> | String | 계열(학과분류)ID<br>* 공통코드API의 학과계열코드 참고 | </empCurtState1Id> |
|  |  | <empCurtState2Id> | String | 학과ID<br>* 공통코드API의 학과계열코드 참고 | </empCurtState2Id> |
|  | </majorList> |  |  |  |  |
| </majorsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<majorsList>
 <total>3</total>
 <majorList>
  <majorGb>1</majorGb>
  <knowDtlSchDptNm>간호학과</knowDtlSchDptNm>
  <knowSchDptNm>간호학과</knowSchDptNm>
  <empCurtState1Id>6</empCurtState1Id>
  <empCurtState2Id>4</empCurtState2Id>
 </majorList>
 <majorList>
  <majorGb>1</majorGb>
  <knowDtlSchDptNm>간호과</knowDtlSchDptNm>
  <knowSchDptNm>간호학과</knowSchDptNm>
  <empCurtState1Id>6</empCurtState1Id>
  <empCurtState2Id>4</empCurtState2Id>
 </majorList>
 <majorList>
  <majorGb>1</majorGb>
  <knowDtlSchDptNm>임상간호학과</knowDtlSchDptNm>
  <knowSchDptNm>간호학과</knowSchDptNm>
  <empCurtState1Id>6</empCurtState1Id>
  <empCurtState2Id>4</empCurtState2Id>
 </majorList>
</majorsList>
```


## 일반학과 상세

✅ 호출 확인

> 학과정보 키워드 검색, 조건별 검색으로 학과목록 정보를 검색할 수 있고, 학과요약보기에 대한 정보를 학과정보 API를 통해 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213D01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213D01.do?authKey=[WORK24_KEY_MAJOR]&returnType=XML&target=MAJORDTL&majorGb=1&empCurtState1Id=[계열ID]&empCurtState2Id=[학과ID]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213D01.do?authKey=[WORK24_KEY_MAJOR]&returnType=XML&target=MAJORDTL&majorGb=1&empCurtState1Id=6&empCurtState2Id=4`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| target | String | Y | 구분자 : MAJORDTL 를 반드시 지정합니다. |
| majorGb | String | Y | 학과구분코드 : 1 을 반드시 지정합니다. |
| empCurtState1Id | String | Y | 계열ID 입력 |
| empCurtState2Id | String | Y | 학과ID 입력 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <majorSum> |  |  |  |  |  |
|  | <knowDptNm> | String | 계열명 | </knowDptNm> |  |
|  | <knowSchDptNm> | String | 학과명 | </knowSchDptNm> |  |
|  | <knowDptId> | String | 계열ID<br>* 공통코드API의 학과계열코드 참고 | </knowDptId> |  |
|  | <knowSchDptId> | String | 학과ID<br>* 공통코드API의 학과계열코드 참고 | </knowSchDptId> |  |
|  | <schDptIntroSum> | String | 학과소개 개요 | </schDptIntroSum> |  |
|  | <aptdIntrstCont> | String | 적성/흥미 내용 | </aptdIntrstCont> |  |
|  | <relSchDptList> |  |  |  |  |
|  |  | <knowDtlSchDptNm> | String | 관련학과 | </knowDtlSchDptNm> |
|  | </relSchDptList> |  |  |  |  |
|  | <mainSubjectList> |  |  |  |  |
|  |  | <mainEdusbjCont> | String | 주요 교과목 | </mainEdusbjCont> |
|  | </mainSubjectList> |  |  |  |  |
|  | <licList> |  |  |  |  |
|  |  | <adoptCertCont> | String | 취득 자격 | </adoptCertCont> |
|  | </licList> |  |  |  |  |
|  | <schDptList> |  |  |  |  |
|  |  | <schDptNm> | String | 개설 대학 전공 | </schDptNm> |
|  |  | <univGbnNm> | String | 개설 대학교 구분 | </univGbnNm> |
|  |  | <univNm> | String | 개설 대학교 | </univNm> |
|  |  | <univUrl> | String | 개설 대학교 URL | </univUrl> |
|  | </schDptList> |  |  |  |  |
|  | <relAdvanJobsList> |  |  |  |  |
|  |  | <knowJobNm> | String | 관련직업명 | </knowJobNm> |
|  | </relAdvanJobsList> |  |  |  |  |
|  | <recrStateList> |  | 모집현황 |  |  |
|  |  | <enscMxnp> | Number | 입학정원인원수 | </enscMxnp> |
|  |  | <enscSpnb> | Number | 입학지원자인원수 | </enscSpnb> |
|  |  | <grdnNmpr> | Number | 졸업인원수 | </grdnNmpr> |
|  |  | <univGbnNm> | String | 대학교구분 | </univGbnNm> |
|  |  | <year> | String | 연도 | </year> |
|  | </recrStateList> |  |  |  |  |
| </majorSum> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<majorSum>
 <knowDptNm>의약계열</knowDptNm>
 <knowSchDptNm>간호학과</knowSchDptNm>
 <knowDptId>6</knowDptId>
 <knowSchDptId>4</knowSchDptId>
 <schDptIntroSum>간호학 분야는 인간, 환경, 건강, 간호의 이론적 개념에 기초하여 인간의 건강증진과 안녕을 목적으로 하는 실용적 학문입니다.
간호학과는 간호대학 또는 의과대학에 개설되어 있으며, 4년제 대학교 및 3년제 전문대학에 개설되어 있습니다. 저학년 때는 인간의 기본 소양을 함양하기 위한 교양과목 뿐 아니라 해부학, 생리학, 간호학개론 등의 기초과목을 학습합니다. 그 후 아동·성인·노인 등의 대상에 따른 간호학이나 정신간호학, 임상약리학, 사회간호학 등 졸업 후에 사회에서 간호업무를 수행할 수 있도록 이론과 실습을 학습합니다. 근래에는 전문대학의 간호과도 4년제 인가를 받고 운영되는 경우도 많고, 전공심화 등 다양한 방법으로 4년제 학사학위를 취득할 수 있습니다.</schDptIntroSum>
 <aptdIntrstCont>인체나 질병, 생명 등에 대한 관심이 있고, 기초의학 분야를 공부하기 때문에 생물이나 화학 등의 교과목에 흥미와 소질이 있다면 간호학에 대한 흥미를 가질 수 있습니다. 그러나 공부해야 할 분량은 방대하다는 점을 미리 인지하고 끈기 있게 공부할 수 있어야 합니다. 졸업 후 병원에서 다양한 사람과 아픈 환자들을 만나고 함께 생활해야 하기 때문에 대인관계가 원만하고, 이해심이 많은 사람에게 적합합니다. 남을 도와주는 것을 좋아하고 책임감과 성실함이 필요합니다.</aptdIntrstCont>
 <relSchDptList>
  <knowDtlSchDptNm>간호학과</knowDtlSchDptNm>
 </relSchDptList>
 <relSchDptList>
  <knowDtlSchDptNm>간호과</knowDtlSchDptNm>
 </relSchDptList>
 <relSchDptList>
  <knowDtlSchDptNm>임상간호학과</knowDtlSchDptNm>
 </relSchDptList>
 <mainSubjectList>
  <mainEdusbjCont>‡ 기초과목 : 심리학, 해부학, 생리학, 사회복지학개론, 인간성장발달과 건강, 간호정보학, 간호학개론, 병태생리학과 간호, 약리학과 간호, 간호윤리, 간호정보학 등
‡ 심화과목 : 임상미생물학, 병리학, 영양학 및 식이요법, 임상약리학, 상담학개론, 응급간호, 성인간호학, 아동간호학, 여성건강간호학각론, 정신간호학각론, 간호학실습, 사회간호학, 보건의료관계법규, 학교보건, 간호관리학, 지역사회간호학, 간호관련법, 호스피스간호 등</mainEdusbjCont>
 </mainSubjectList>
 <licList>
  <adoptCertCont>국가자격 : 간호사 면허, 전문간호사(가정전문간호사, 감염관리전문간호사, 노인전문간호사, 마취전문간호사, 보건전문간호사, 산업전문간호사, 응급전문간호사, 정신전문간호사, 종양전문간호사, 중환자전문간호사, 호스피스전문간호사, 아동전문간호사 임상전문간호사), 보건교사, 보건교육사</adoptCertCont>
 </licList>
 <schDptList>
  <schDptNm>간호학과</schDptNm>
  <univGbnNm>대학교</univGbnNm>
  <univNm>가톨릭관동대학교</univNm>
  <univUrl>www.cku.ac.kr</univUrl>
 </schDptList>
 <schDptList>
  <schDptNm>간호학과</schDptNm>
  <univGbnNm>대학교</univGbnNm>
  <univNm>강릉원주대학교</univNm>
  <univUrl>www.gwnu.ac.kr</univUrl>
 </schDptList>
 <schDptList>
  <schDptNm>간호학과</schDptNm>
  <univGbnNm>대학교</univGbnNm>
  <univNm>강원대학교</univNm>
  <univUrl>www.kangwon.ac.kr/</univUrl>
 </schDptList>
 <schDptList>
  <schDptNm>간호학과</schDptNm>
… (생략)
```


## 이색학과 상세

❌ 호출 실패 — 정보가 존재하지 않습니다.

> 학과정보 키워드 검색, 조건별 검색으로 학과목록 정보를 검색할 수 있고, 학과요약보기에 대한 정보를 학과정보 API를 통해 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213D02.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213D02.do?authKey=[WORK24_KEY_MAJOR]&returnType=XML&target=MAJORDTL&majorGb=2&empCurtState1Id=[계열ID]&empCurtState2Id=[학과ID]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo213D02.do?authKey=[WORK24_KEY_MAJOR]&returnType=XML&target=MAJORDTL&majorGb=2&empCurtState1Id=6&empCurtState2Id=4`

> ⚠️ 이색학과의 계열ID·학과ID 가 필요하다. 일반학과(간호학과) ID 로는 "정보가 존재하지 않습니다".

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| target | String | Y | 구분자 : MAJORDTL 입력 |
| majorGb | String | Y | 학과구분코드 : 2 를 반드시 지정합니다. |
| empCurtState1Id | String | Y | 계열ID 입력 |
| empCurtState2Id | String | Y | 학과ID 입력 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |
|---|---|---|---|---|
| <specMajor> |  |  |  |  |
|  | <knowDptNm> | String | 계열명 | </knowDptNm> |
|  | <knowSchDptNm> | String | 학과명 | </knowSchDptNm> |
|  | <knowDptId> | String | 계열ID<br>* 공통코드API의 학과계열코드 참고 | </knowDptId> |
|  | <knowSchDptId> | String | 학과ID<br>* 공통코드API의 학과계열코드 참고 | </knowSchDptId> |
|  | <schDptIntroSum> | String | 학과소개 개요 | </schDptIntroSum> |
|  | <whatStudy> | String | 하는 공부 | </whatStudy> |
|  | <howPrepare> | String | 준비방법 | </howPrepare> |
|  | <jobPropect> | String | 직업 전망 | </jobPropect> |
| </specMajor> |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<specMajor>
 <message>정보가 존재하지 않습니다.</message>
 <messageCd>006</messageCd>
</specMajor>
```
