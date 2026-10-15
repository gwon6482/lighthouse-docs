# 고용24 공통코드 API

> 인증키: `WORK24_KEY_COMMON_CODE` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16

**우리 서비스에서**: 직종·지역 코드표 — 채용정보 검색의 `occupation`·`region` 값 출처.


## 채용(지역,직종,종류 등)

✅ 호출 확인

> 오픈API에서 제공하는 공통코드 정보를 검색 할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo21L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo21L01.do?returnType=XML&target=CMCD&authKey=[WORK24_KEY_COMMON_CODE]&dtlGb=1
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo21L01.do?returnType=XML&target=CMCD&authKey=[WORK24_KEY_COMMON_CODE]&dtlGb=1`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| target | String | Y | 구분자 : CMCD 입력 |
| dtlGb | String | Y | 공통코드정보 상세구분을 지정합니다.<br>- 1 : 지역코드<br>- 2 : 직종코드<br>- 3 : 자격면허코드<br>- 4 : 산업단지<br>- 5 : 지하철코드<br>- 6 : 전공코드<br>- 7 : 언어코드<br>- 8 : 학과계열코드<br>- 9 : 강소기업분류코드 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <cmcdRegion> |  |  |  |  |  |  |
|  | <total> | Number | 총 건수 | </total> |  |  |
|  | <codeName> | String | 공통코드 분류명 | </codeName> |  |  |
|  | <oneDepth> |  |  |  |  |  |
|  |  | <regionCd> | String | 지역코드 | </regionCd> |  |
|  |  | <regionNm> | String | 지역명 | </regionNm> |  |
|  |  | <twoDepth> |  |  |  |  |
|  |  |  | <regionCd> | String | 지역코드 | </regionCd> |
|  |  |  | <regionNm> | String | 지역명 | </regionNm> |
|  |  |  | <superCd> | String | 상위단계 지역코드 | </superCd> |
|  |  | </twoDepth> |  |  |  |  |
|  | </oneDepth> |  |  |  |  |  |
| </cmcdRegion> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<cmcdRegion>
 <total>285</total>
 <codeName>지역코드</codeName>
 <oneDepth>
  <regionCd>00000</regionCd>
  <regionNm>지역무관</regionNm>
 </oneDepth>
 <oneDepth>
  <regionCd>11000</regionCd>
  <regionNm>서울</regionNm>
  <twoDepth>
   <regionCd>11110</regionCd>
   <regionNm>서울 종로구</regionNm>
   <superCd>11000</superCd>
  </twoDepth>
  <twoDepth>
   <regionCd>11140</regionCd>
   <regionNm>서울 중구</regionNm>
   <superCd>11000</superCd>
  </twoDepth>
  <twoDepth>
   <regionCd>11170</regionCd>
   <regionNm>서울 용산구</regionNm>
   <superCd>11000</superCd>
  </twoDepth>
  <twoDepth>
   <regionCd>11200</regionCd>
   <regionNm>서울 성동구</regionNm>
   <superCd>11000</superCd>
  </twoDepth>
  <twoDepth>
   <regionCd>11215</regionCd>
   <regionNm>서울 광진구</regionNm>
   <superCd>11000</superCd>
  </twoDepth>
  <twoDepth>
   <regionCd>11230</regionCd>
   <regionNm>서울 동대문구</regionNm>
   <superCd>11000</superCd>
  </twoDepth>
  <twoDepth>
   <regionCd>11260</regionCd>
   <regionNm>서울 중랑구</regionNm>
   <superCd>11000</superCd>
… (생략)
```


## 훈련(KECO,NCS,훈련종류 등)

✅ 호출 확인

> 훈련지역이나 훈련 분야와 같은 코드성 정보에 대한 정보를 제공하며, 각 화면단에서 코드값을 제공한 경우에는 이 API에서는 제외됩니다.
> 검색조건 및 검색 결과에 필요한 각종 코드에 대한 정보를 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo319L01.do`

**예제**

```
예제1) 기본 조건만을 이용하여 검색하는 경우
http://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo319L01.do?authKey=[WORK24_KEY_COMMON_CODE]&returnType=XML&outType=1&srchType=00
```

**실제로 호출한 주소**: `http://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo319L01.do?authKey=[WORK24_KEY_COMMON_CODE]&returnType=XML&outType=1&srchType=00`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |  |
|---|---|---|---|---|
| authKey | string | 필수 | 인증키(ex : authKey=[인증키] |  |
| returnType | string | 필수 | 리턴타입:반드시 XML 로 지정합니다.(ex : returnType=XML) |  |
| outType | string | 필수 | 구분자 : 출력형태('1':리스트 '2':상세) | '1' |
| srchType | string | 필수 | 공통코드 구분 | 공통코드정보 상세구분을 지정합니다.<br>- 00 : 훈련지역 대분류 코드<br>- 01 : 훈련지역 중분류 코드<br>- 02 : KECO 대분류 코드<br>- 03 : KECO 중분류 코드<br>- 04 : KECO 소분류 코드<br>- 05 : NCS 대분류 코드<br>- 06 : NCS 중분류 코드<br>- 07 : NCS 소분류 코드<br>- 08 : NCS 세분류 코드<br>- 09 : 훈련종류 코드<br>- 10 : 훈련방법 코드<br>- 11 : 훈련기관 구분코드 |
| srchOption1 | string | 선택 | 공통코드 구분에 따른 검색값1 | 지원하는 공통코드 구분<br>- 01 : 훈련지역 중분류 코드<br>- 03 : KECO 중분류 코드<br>- 04 : KECO 소분류 코드<br>- 06 : NCS 중분류 코드<br>- 07 : NCS 소분류 코드<br>- 08 : NCS 세분류 코드<br>※사용예시)공통코드구분을 01(훈련지역 중분류)로 지정하고, 검색값에 11(서울) 입력시 서울의 훈련지역 중분류 코드들을 출력합니다. |
| srchOption2 | string | 선택 | 공통코드 구분에 따른 검색값2 | 지원하는 공통코드 구분<br>- 04 : KECO 소분류 코드 [ 1자리 ex)1 ]<br>- 07 : NCS 소분류 코드 [ 2자리 ex)01 ]<br>- 08 : NCS 세분류 코드 [ 2,4자리 ex)01, 0101 ]<br>※검색값1이 있어야 사용 가능합니다. |

### 출력 항목

| 출력항목 | 타입 | 설명 | 비고 |  |  |  |
|---|---|---|---|---|---|---|
| <HRDNet> |  | XML문서의 최상위 노드입니다. |  |  |  |  |
|  | <scn_cnt> | string | 검색된 총 건수 | </scn_cnt> |  |  |
|  | <codeName> | string | 공통코드명칭 | </codeName> |  |  |
|  | <srchList> | string |  |  |  |  |
|  |  | <scn_list> |  |  |  |  |
|  |  |  | RSLT_CODE | string | 코드값 | <rsltCode></rsltCode> |
|  |  |  | RSLT_NAME | string | 코드명 | <rsltName></rsltName> |
|  |  |  | USE_YN | string | 사용여부 | <useYn></useYn> |
|  |  | </scn_list> |  |  |  |  |
|  | </srchList> |  |  |  |  |  |
| </HRDNet> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<HRDNet>
 <codeName>훈련지역 대분류 코드</codeName>
 <scn_cnt>21</scn_cnt>
 <srchList>
  <scn_list>
   <rsltCode>11</rsltCode>
   <rsltName>서울</rsltName>
   <useYn>Y</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>12</rsltCode>
   <rsltName>전남광주</rsltName>
   <useYn>Y</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>26</rsltCode>
   <rsltName>부산</rsltName>
   <useYn>Y</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>27</rsltCode>
   <rsltName>대구</rsltName>
   <useYn>Y</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>28</rsltCode>
   <rsltName>인천</rsltName>
   <useYn>Y</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>29</rsltCode>
   <rsltName>광주</rsltName>
   <useYn>N</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>30</rsltCode>
   <rsltName>대전</rsltName>
   <useYn>Y</useYn>
  </scn_list>
  <scn_list>
   <rsltCode>31</rsltCode>
   <rsltName>울산</rsltName>
   <useYn>Y</useYn>
  </scn_list>
… (생략)
```
