# 고용24 직업정보 API

> 인증키: `WORK24_KEY_JOB_INFO` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16

**우리 서비스에서**: **이미 쓰는 중** — 진로백과 직업 데이터(월 1회 덤프, `services/work24/client.js`). 키는 기존 `Work24_KEY` 와 같다.


## 직업정보

✅ 호출 확인

> 직업정보 키워드 검색, 조건별 검색, 분류별 카테고리 정보로 직업명을 검색할 수 있고, 직업상세에 대한 정보를 직업정보 API를 통해 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L01.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=JOBCD
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L01.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=JOBCD`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| target | String | Y | 구분자 : JOBCD 를 반드시 지정합니다. |
| srchType | String | N | 검색타입을 입력합니다.(미입력시 K: 키워드 검색으로 검색됩니다.)<br>- 단일 검색만 가능<br>K: 키워드 검색<br>C: 조건별 검색(연봉/전망) |
| srchType | String | Y | 검색타입을 반드시 지정합니다.<br>K : 키워드검색(keyword)<br>C : 조건별검색(condition)<br>KN : 지식별검색(knowledge)<br>B : 업무수행능력별검색(business ability)<br>T : 통합별검색(total)<br>*통합검색 선택시 사용자에게 knowledge, business_ability, interest, environment 항목을 제시하고<br>최소 10개 이상의 항목을 선택하게 하여야 합니다.<br>*검색타입이 KN, B, T인경우 일반식업만 검색가능합니다. |
| keyword | String | N | 검색타입이 K일 경우에만 사용합니다.<br>직업명 키워드 검색시 입력합니다.(예: 컨설턴트 , 환경)<br>UTF-8 인코딩입니다. |
| avgSal | String | 검색타입 C일때 평균연봉 또는 직업전망 필수입력 | 평균연봉을 선택합니다.<br>1 : 3,000만원 미만<br>2 : 3,000~4,000만원 미만<br>3 : 4,000~5,000만원 미만<br>4 : 5,000만원 이상 |
| prospect | String | 검색타입 C일때 평균연봉 또는 직업전망 필수입력 | 직업전망을 선택합니다.<br>74.2 : 매우밝음(상위10%이상)<br>63.3 : 밝음(상위20%이상)<br>40.0 : 보통(중간이상)<br>60.0 : 전망안좋음(감소예상직업) |
| knowledge | String | 검색타입 KN일때 필수입력 | 업무와 관련된 지식을 선택합니다.(최소5개 이상 선택) |
| business_ability | String | 검색타입 B일때 필수입력 | 업무와 관련된 수행능력을 선택합니다.(최소7개 이상 선택) |
| interest | String | 검색타입 T일때만 선택입력 | 자신의 흥미유형을 선택합니다. |
| environment | String | 검색타입 T일때만 선택입력 | 선호하는 업무환경을 선택합니다. |
| avgSal | String | N | 검색타입이 C일 경우에만 사용합니다.<br>평균연봉을 입력합니다.(평균연봉을 미입력시 전체로 검색됩니다.)<br>- 10: 3천만원 미만<br>- 20: 3~4천만원 미만<br>- 30: 4~5천만원 미만<br>- 40: 5천만원 이상 |
| prospect | String | N | 검색타입이 C일 경우에만 사용합니다.<br>직업전망을 입력합니다.(직업전망을 미입력시 전체로 검색됩니다.)<br>- 1: 증가<br>- 2: 다소 증가<br>- 3: 유지<br>- 4: 다소 감소<br>- 5: 감소 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <jobsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <jobList> |  |  |  |  |
|  |  | <jobGb> | String | 직업구분코드<br>3 : 이색직업별<br>4 : 테마별<br>6 : 신직업·창직 | </jobGb> |
|  |  | <jobClcd> | String | 직업분류코드 | </jobClcd> |
|  |  | <jobClcdNM> | String | 직업분류명 | </jobClcdNM> |
|  |  | <jobCd> | String | 직업코드 | </jobCd> |
|  |  | <jobNm> | String | 직업명 | </jobNm> |
|  | </jobList> |  |  |  |  |
| </jobsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<jobsList>
 <total>492</total>
 <jobList>
  <jobClcd>011</jobClcd>
  <jobClcdNM>의회의원·고위공무원 및 기업 고위임원</jobClcdNM>
  <jobCd>K000000847</jobCd>
  <jobNm>기업 대표 및 기업 고위 임원</jobNm>
 </jobList>
 <jobList>
  <jobClcd>011</jobClcd>
  <jobClcdNM>의회의원·고위공무원 및 기업 고위임원</jobClcdNM>
  <jobCd>K000000933</jobCd>
  <jobNm>행정부고위공무원</jobNm>
 </jobList>
 <jobList>
  <jobClcd>012</jobClcd>
  <jobClcdNM>행정·경영·금융·보험 관리자</jobClcdNM>
  <jobCd>K000000919</jobCd>
  <jobNm>마케팅 및 광고·홍보 관리자</jobNm>
 </jobList>
 <jobList>
  <jobClcd>012</jobClcd>
  <jobClcdNM>행정·경영·금융·보험 관리자</jobClcdNM>
  <jobCd>K000001059</jobCd>
  <jobNm>경영 지원 관리자</jobNm>
 </jobList>
 <jobList>
  <jobClcd>012</jobClcd>
  <jobClcdNM>행정·경영·금융·보험 관리자</jobClcdNM>
  <jobCd>K000001081</jobCd>
  <jobNm>정부 행정 관리자</jobNm>
 </jobList>
 <jobList>
  <jobClcd>012</jobClcd>
  <jobClcdNM>행정·경영·금융·보험 관리자</jobClcdNM>
  <jobCd>K000001210</jobCd>
  <jobNm>금융관리자</jobNm>
 </jobList>
 <jobList>
  <jobClcd>012</jobClcd>
  <jobClcdNM>행정·경영·금융·보험 관리자</jobClcdNM>
  <jobCd>K000007471</jobCd>
  <jobNm>보험관리자</jobNm>
 </jobList>
… (생략)
```


## 직업정보 상세

✅ 호출 확인

> 직업정보 키워드 검색, 조건별 검색, 분류별 카테고리 정보로 직업명을 검색할 수 있고, 직업상세에 대한 정보를 직업정보 API를 통해 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212D01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212D01.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=JOBDTL&jobGb=1&jobCd=[직업코드]&dtlGb=[상세구분]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212D01.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=JOBDTL&jobGb=1&jobCd=K000000847&dtlGb=1`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| target | String | Y | 구분자 : JOBDTL 을 반드시 지정합니다. |
| jobGb | String | Y | 직업구분코드 : 1 을 반드시 지정합니다. |
| jobCd | String | Y | 직업코드<br>* 직업목록 API 호출결과 참고 |
| dtlGb | String | Y | 직업정보 상세구분을 지정합니다.<br>- 1 : 요약<br>- 2 : 하는 일<br>- 3 : 교육/자격/훈련<br>- 4 : 임금/직업만족도/전망<br>- 5 : 능력/지식/환경<br>- 6 : 성격/흥미/가치관<br>- 7 : 업무활동 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <jobSum> |  |  |  |  |  |
|  | <jobCd> | String | 직업코드 | </jobCd> |  |
|  | <jobLrclNm> | String | 직업 대분류명 | </jobLrclNm> |  |
|  | <jobMdclNm> | String | 직업 중분류명 | </jobMdclNm> |  |
|  | <jobSmclNm> | String | 직업 소분류명 | </jobSmclNm> |  |
|  | <jobSum> | String | 하는일 | </jobSum> |  |
|  | <jobVideo> | String | 직업안내동영상 | </jobVideo> |  |
|  | <way> | String | 되는길 | </way> |  |
|  | <relMajorList> |  |  |  |  |
|  |  | <majorCd> | Number | 관련전공코드 | </majorCd> |
|  |  | <majorNm> | String | 관련전공명 | </majorNm> |
|  | </relMajorList> |  |  |  |  |
|  | <relCertList> |  |  |  |  |
|  |  | <certNm> | String | 관련자격증명 | </certNm> |
|  | </relCertList> |  |  |  |  |
|  | <sal> | String | 임금 | </sal> |  |
|  | <jobSatis> | String | 직업만족도(%) | </jobSatis> |  |
|  | <jobProspect> | String | 일자리전망 | </jobProspect> |  |
|  | <jobStatus> | String | 일자리현황 | </jobStatus> |  |
|  | <jobAbil> | String | 업무수행능력 | </jobAbil> |  |
|  | <knowldg> | String | 지식 | </knowldg> |  |
|  | <jobEnv> | String | 업무환경 | </jobEnv> |  |
|  | <jobChr> | String | 성격 | </jobChr> |  |
|  | <jobIntrst> | String | 흥미 | </jobIntrst> |  |
|  | <jobVals> | String | 직업가치관 | </jobVals> |  |
|  | <jobActvImprtncs> | String | 업무활동 중요도 | </jobActvImprtncs> |  |
|  | <jobActvLvls> | String | 업무활동 수준 | </jobActvLvls> |  |
|  | <relJobList> |  |  |  |  |
|  |  | <jobCd> | Number | 관련직업코드 | </jobCd> |
|  |  | <jobNm> | String | 관련직업명 | </jobNm> |
|  | </relJobList> |  |  |  |  |
| </jobSum> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<jobSum>
 <jobCd>K000000847</jobCd>
 <jobLrclNm>경영·사무·금융·보험직</jobLrclNm>
 <jobMdclNm>의회의원·고위공무원 및 기업 고위임원</jobMdclNm>
 <jobSmclNm>기업 대표 및 기업 고위 임원</jobSmclNm>
 <jobSum>기업의 기본적인 경영방침과 사업목표를 계획하고, 사업목표를 달성하기 위한 체계적인 전략과 정책을 수립하며 이를 지휘하고 조정한다.</jobSum>
 <way>기업고위임원에게 특별히 요구되는 학력, 자격은 없지만 일반적으로 대학 이상의 학력 소지자가 대부분이고 사업체의 성격에 따라 해당 분야의 석사 또는 박사학위, 기술사 또는 기타 전문자격증이나 면허가 요구되기도 한다. 기업고위임원은 기업의 소유자(대주주)이거나 기업의 사원으로 입사하여 진급할 수도 있고, 해당 분야의 전문가로 능력을 인정받아 기업에 스카우트될 수도 있다. 기업고위임원이 되기 위해서는 해당 분야에 대한 충분한 실무경험과 지식을 갖추어야 한다. 소속되어 있는 기업 관련 전문지식은 물론이고 비즈니스능력, 의사결정능력, 정보 수집능력, 리더십, 협상능력 등을 갖추고 있어야 한다. 또한, 외국 진출을 모색하는 기업이 증가함에 따라 외국어 능력도 갖춰야 한다. 관련 교육으로는 기업에서 자체 프로그램을 운영하여 최고경영층과 부서관리자의 교육 훈련을 수행하고 있으며, 대학교, 관련 협회 등과 같은 외부기관에서 ‘최고경영자과정(AMP：Advanced management Program)’과 같은 교육프로그램을 운영하고 있다.</way>
 <relCertList>
  <certNm>CIA(외국)</certNm>
 </relCertList>
 <relCertList>
  <certNm>경영지도사(국가전문)</certNm>
 </relCertList>
 <relCertList>
  <certNm>기술지도사(국가전문)</certNm>
 </relCertList>
 <sal>조사년도:2025년, 임금 하위(25%) 8000만원, 평균(50%) 10000만원, 상위(25%) 12000만원</sal>
 <jobSatis>68.9</jobSatis>
 <jobProspect>증가(19%) 현상유지(35%) 감소(46%)</jobProspect>
 <jobStatus>기업 대표 및 기업 고위 임원</jobStatus>
 <jobAbil>조직체계의 분석 및 평가(100)/재정 관리(100)/인적자원 관리(100)/물적자원 관리(99)/판단과 의사결정(99)</jobAbil>
 <knowldg>경제와 회계(94)/인사(93)/경영 및 행정(91)/영업과 마케팅(89)/컴퓨터와 전자공학(81)</knowldg>
 <jobEnv>의사결정 가능성(99)/의사결정 권한(98)/결과에 대한 책임(97)/재택근무(96)/건강 및 안전에 대한 책임(95)</jobEnv>
 <jobChr>리더십(81)/혁신(77)/자기통제(72)/적응성/융통성(72)/신뢰성(70)</jobChr>
 <jobIntrst>진취형(Enterprising)(92)/탐구형(Investigative)(73)</jobIntrst>
 <jobVals>성취(96)/자율성(83)/변화지향(82)/사회적 인정(77)/자기개발(73)</jobVals>
 <jobActvImprtncs>사람들의 업무와 활동을 조직, 편성(100)/협상, 갈등 해결(100)/상사, 동료, 부하직원과 소통(100)/업무 계획, 우선순위 결정(100)/목표, 전략 수립(100)</jobActvImprtncs>
 <jobActvLvls>사람들의 업무와 활동을 조직, 편성(100)/업무 계획, 우선순위 결정(100)/자원 관리(100)/인사 업무(100)/부하 직원들에게 업무 안내, 지시, 동기부여(100)</jobActvLvls>
 <relJobList>
  <jobCd>K000000933</jobCd>
  <jobNm>행정부고위공무원</jobNm>
 </relJobList>
</jobSum>
```


## 직업사전

✅ 호출 확인

> 직업사전 API를 활용하여 한국고용정보원이 발간한 직업사전을 직접 구성할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L50.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L50.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=dJobCD&startPage=1&display=10&srchType=K&keyword=[키워드]

예제2) 다중검색(다중검색 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L50.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=dJobCD&startPage=1&display=10&srchType=EL|WS|SY&eduLevel=[교육수준]&workStrong=[직업강도]&skillYear=[숙련기간]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L50.do?authKey=[WORK24_KEY_JOB_INFO]&returnType=XML&target=dJobCD&startPage=1&display=10&srchType=K&keyword=간호`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| target | String | Y | 구분자 : dJobCD 를 반드시 지정합니다. |
| srchType | String | Y | 검색타입을 반드시 지정합니다.<br>- 단일 검색만 가능<br>K : 키워드검색(keyword)<br>E : 한국고용직업분류별검색(employment)<br>J : 한국표준직업분류별검색(job)<br>I : 한국표준산업분류별검색(industry)<br>- 다중검색 가능 (ex : EL\|WS\|SY )<br>EL : 교육수준별검색(eduLevel)<br>WS : 직업강도별검색(workStrong)<br>SY : 숙련기간별검색(skillYear)<br>WP : 작업장소별검색(workPlace)<br>F1 : 직무기능(자료)별검색(workFunc1)<br>F2 : 직무기능(사람)별검색(workFunc2)<br>F3 : 직무기능(사물)별검색(workFunc3) |
| keyword | String | 검색타입 K일때 필수입력 | 직업명 키워드 검색시 입력합니다.(예: 금융 , 디자인)<br>UTF-8 인코딩입니다.(유사,관련 직업 검색 가능) |
| empJobCl | String | 검색타입 E일때 필수입력 | 한국고용직업분류를 입력합니다.<br>한국고용직업분류 보기 |
| stdJobCl | String | 검색타입 J일때 필수입력 | 한국표준직업분류를 입력합니다.<br>한국표준직업분류 보기 |
| stdIndCl | String | 검색타입 I일때 필수입력 | 한국표준산업분류를 입력합니다.<br>한국표준산업분류 보기 |
| eduLevel | String | 검색타입 EL일때 필수입력 | 교육수준을 입력합니다.<br>- 1 : 6년 이하 (초졸 이하)<br>- 2 : 6년 초과 ~ 9년 이하 (중졸 정도)<br>- 3 : 9년 초과 ~ 12년 이하 (고졸 정도)<br>- 4 : 12년 초과 ~ 14년 이하 (전문대졸 정도)<br>- 5 : 14년 초과 ~ 16년 이하 (대졸 정도)<br>- 6 : 16년 초과 (대학원 이상) |
| workStrong | String | 검색타입 WS일때 필수입력 | 직업강도를 입력합니다.<br>- SW : 아주 가벼운 작업<br>- LW : 가벼운 작업<br>- MW : 보통 작업<br>- HW : 힘든 작업<br>- VH : 아주 힘든 작업 |
| skillYear | String | 검색타입 SY일때 필수입력 | 숙련기간을 입력합니다.<br>- 1 : 약간의 시범정도<br>- 2 : 시범후 30일 이하<br>- 3 : 1개월 초과 ~ 3개월 이하<br>- 4 : 3개월 초과 ~ 6개월 이하<br>- 5 : 6개월 초과 ~ 1년 이하<br>- 6 : 1년 초과 ~ 2년 이하<br>- 7 : 2년 초과 ~ 4년 이하<br>- 8 : 4년 초과 ~ 10년 이하<br>- 9 : 10년 초과 |
| workPlace | String | 검색타입 WP일때 필수입력 | 작업장소를 입력합니다.<br>- I : 실내<br>- O : 실외<br>- B : 실내·외 |
| workFunc1 | String | 검색타입 F1일때 필수입력 | 직무기능(자료)를 입력합니다.<br>- 0 : 종합<br>- 1 : 조정<br>- 2 : 분석<br>- 3 : 수집<br>- 4 : 계산<br>- 5 : 기록<br>- 6 : 비교 |
| workFunc2 | String | 검색타입 F2일때 필수입력 | 직무기능(사람)를 입력합니다.<br>- 0 : 자문<br>- 1 : 협의<br>- 2 : 교육<br>- 3 : 감독<br>- 4 : 오락제공<br>- 5 : 설득<br>- 6 : 말하기-신호<br>- 7 : 서비스 제공<br>- 8 : 관련없음 |
| workFunc3 | String | 검색타입 F3일때 필수입력 | 직무기능(사물)를 입력합니다.<br>- 0 : 설치<br>- 1 : 정밀작업<br>- 2 : 제어조작<br>- 3 : 조작운전<br>- 4 : 수동조작<br>- 5 : 유지<br>- 6 : 투입-인출<br>- 7 : 단순작업<br>- 8 : 관련없음 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <dJobsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <dJobList> |  |  |  |  |
|  |  | <dJobCd> | String | 직업사전 세세분류 코드 | </dJobCd> |
|  |  | <dJobCdSeq> | String | 직업사전 세세분류 순번 | </dJobCdSeq> |
|  |  | <dJobNm> | String | 세세분류 직업명 | </dJobNm> |
|  | </dJobList> |  |  |  |  |
| </dJobsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<dJobsList>
 <total>30</total>
 <startPage>1</startPage>
 <display>10</display>
 <dJobList>
  <dJobCd>K000001706</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>가정전문간호사</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000007395</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>간병인</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000002419</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>간호보조기술학원강사</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000004094</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>간호부장</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000007494</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>간호사</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000007576</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>간호조무사</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000003308</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>감염관리전문간호사</dJobNm>
 </dJobList>
 <dJobList>
  <dJobCd>K000002829</dJobCd>
  <dJobCdSeq>1</dJobCdSeq>
  <dJobNm>노인전문간호사</dJobNm>
 </dJobList>
… (생략)
```
