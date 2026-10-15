# 고용24 강소기업 API

> 인증키: `WORK24_KEY_SMALL_GIANT` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16


## 강소기업

✅ 호출 확인

> 강소기업 API를 이용하여 '규모는 작지만 강한 경쟁력을 가진 우수기업'목록을 활용 하실 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L01.do?authKey=[WORK24_KEY_SMALL_GIANT]&returnType=XML&startPage=1&display=10
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L01.do?authKey=[WORK24_KEY_SMALL_GIANT]&returnType=XML&startPage=1&display=10`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| region | String | N | 기업소재지역을 입력합니다.<br>기관소재지코드 보기 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <smallGiantsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <smallGiant> |  |  |  |  |
|  |  | <selYear> | String | 선정연도(등록연도) | </selYear> |
|  |  | <sgBrandNm> | String | 강소기업브랜드명<br>*공통코드API의 강소기업코드 참고 | </sgBrandNm> |
|  |  | <coNm> | String | 기업명 | </coNm> |
|  |  | <busiNo> | String | 사업자등록번호 | </busiNo> |
|  |  | <reperNm> | String | 대표자 | </reperNm> |
|  |  | <superIndTpCd> | String | 업종코드(상) | </superIndTpCd> |
|  |  | <superIndTpNm> | String | 업종명(상) | </superIndTpNm> |
|  |  | <indTpCd> | String | 업종코드(중) | </indTpCd> |
|  |  | <indTpNm> | String | 업종명(중) | </indTpNm> |
|  |  | <coTelNo> | String | 사업장연락처 | </coTelNo> |
|  |  | <regionCd> | String | 지역코드 | </regionCd> |
|  |  | <regionNm> | String | 지역명 | </regionNm> |
|  |  | <coAddr> | String | 주소 | </coAddr> |
|  |  | <coContent> | String | 사업내용 | </coContent> |
|  |  | <coMainProd> | String | 주요생산품목 | </coMainProd> |
|  |  | <coGdpnt> | String | 기업장점내용 | </coGdpnt> |
|  |  | <coHomePage> | String | 회사홈페이지 | </coHomePage> |
|  |  | <alwaysWorkerCnt> | String | 상시근로자 수 | </alwaysWorkerCnt> |
|  |  | <smlgntCoClcd> | String | 강소기업 브랜드명 코드 | </smlgntCoClcd> |
|  | </smallGiant> |  |  |  |  |
| </smallGiantsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<smallGiantsList>
 <total>15291</total>
 <startPage>1</startPage>
 <display>10</display>
 <smallGiant>
  <selYear>2024</selYear>
  <sgBrandNm>노사문화우수기업</sgBrandNm>
  <coNm>주식회사 케이피에프 충주공장</coNm>
  <busiNo>3038515748</busiNo>
  <reperNm>***</reperNm>
  <superIndTpCd>C</superIndTpCd>
  <superIndTpNm>제조업</superIndTpNm>
  <indTpCd>25</indTpCd>
  <indTpNm>금속가공제품 제조업; 기계 및 가구 제외</indTpNm>
  <regionCd>43130</regionCd>
  <regionNm>충북 충주시</regionNm>
  <coAddr>충북 충주시 충주산단5로 50</coAddr>
  <coMainProd>볼트,너트,차량용단조품 제조,판매</coMainProd>
  <alwaysWorkerCnt>467</alwaysWorkerCnt>
  <smlgntCoClcd>102</smlgntCoClcd>
 </smallGiant>
 <smallGiant>
  <selYear>2024</selYear>
  <sgBrandNm>노사문화우수기업</sgBrandNm>
  <coNm>(주)삼우에프앤지</coNm>
  <busiNo>1248131846</busiNo>
  <reperNm>***</reperNm>
  <superIndTpCd>H</superIndTpCd>
  <superIndTpNm>운수 및 창고업</superIndTpNm>
  <indTpCd>49</indTpCd>
  <indTpNm>육상운송 및 파이프라인 운송업</indTpNm>
  <regionCd>41465</regionCd>
  <regionNm>경기 용인시 수지구</regionNm>
  <coAddr>경기 용인시 수지구 손곡로 29</coAddr>
  <coMainProd>일반노선화물,정기노선화물차 운송/하역,보관/창고 임대</coMainProd>
  <alwaysWorkerCnt>318</alwaysWorkerCnt>
  <smlgntCoClcd>102</smlgntCoClcd>
 </smallGiant>
 <smallGiant>
  <selYear>2024</selYear>
  <sgBrandNm>노사문화우수기업</sgBrandNm>
  <coNm>(주)포웰</coNm>
  <busiNo>5068156603</busiNo>
  <reperNm>***</reperNm>
… (생략)
```


## 강소기업현장탐방기

✅ 호출 확인

> 강소기업현장탐방기 API를 활용하여 작지만 강한 강소기업의 진솔하고 생생한 탐방기를 구성할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L11.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L11.do?authKey=[WORK24_KEY_SMALL_GIANT]&returnType=XML&callTp=L&startPage=1&display=10
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L11.do?authKey=[WORK24_KEY_SMALL_GIANT]&returnType=XML&callTp=L&startPage=1&display=10`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| regionCd | String |  |  |
| indTypeCd | String |  |  |
| compNm | String |  | 기업명 키워드 검색시 입력합니다.(예: 한국고용정보원, 고용노동부)<br>UTF-8 인코딩입니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <compSpotInqList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <company> |  |  |  |  |
|  |  | <busiNo> | String | 사업자등록번호 | </busiNo> |
|  |  | <compNm> | String | 기업명 | </compNm> |
|  |  | <regionNm> | String | 지역명 | </regionNm> |
|  |  | <indTypeNm> | String | 업종명 | </indTypeNm> |
|  |  | <workerCnt> | String | 근로자수 | </workerCnt> |
|  |  | <smlgntCoClcd> | String | 기업특징 | </smlgntCoClcd> |
|  |  | <collectDtm> | String | 취재일 | </collectDtm> |
|  | </company> |  |  |  |  |
| </compSpotInqList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<compSpotInqList>
 <total>535</total>
 <startPage>1</startPage>
 <display>10</display>
 <company>
  <busiNo>3058140342</busiNo>
  <compNm>(주)예람</compNm>
  <regionNm>대전 중구</regionNm>
  <indTypeNm>정보통신업</indTypeNm>
  <smlgntCoClcd>기술력 우수</smlgntCoClcd>
  <collectDtm>2018-07-24 00:00:00.0</collectDtm>
 </company>
 <company>
  <busiNo>5138144181</busiNo>
  <compNm>(주)티아이</compNm>
  <regionNm>경북 구미시</regionNm>
  <indTypeNm>제조업</indTypeNm>
  <smlgntCoClcd>기술력 우수</smlgntCoClcd>
  <collectDtm>2018-08-24 00:00:00.0</collectDtm>
 </company>
 <company>
  <busiNo>1138642090</busiNo>
  <compNm>(주)에스에스알</compNm>
  <regionNm>서울 구로구</regionNm>
  <indTypeNm>정보통신업</indTypeNm>
  <smlgntCoClcd>신청 강소기업</smlgntCoClcd>
  <collectDtm>2018-08-17 00:00:00.0</collectDtm>
 </company>
 <company>
  <busiNo>2218130323</busiNo>
  <compNm>(주)보템</compNm>
  <indTypeNm>제조업</indTypeNm>
  <collectDtm>2018-07-26 00:00:00.0</collectDtm>
 </company>
 <company>
  <busiNo>1058146727</busiNo>
  <compNm>(주)제이오텍</compNm>
  <regionNm>대전 유성구</regionNm>
  <indTypeNm>제조업</indTypeNm>
  <smlgntCoClcd>신청 강소기업</smlgntCoClcd>
  <collectDtm>2018-07-05 00:00:00.0</collectDtm>
 </company>
 <company>
  <busiNo>3018130366</busiNo>
… (생략)
```


## 청년강소기업체험

✅ 호출 확인

> 청년강소기업체험 API를 이용하여 다채로운 기관의 청년연수정보를 한눈에 확인할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L21.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L21.do?authKey=[WORK24_KEY_SMALL_GIANT]&callTp=L&returnType=XML&startPage=1&display=10&sregDtmValCd=6

예제2) 다중검색(다중검색 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L21.do?authKey=[WORK24_KEY_SMALL_GIANT]
&callTp=L&returnType=XML&startPage=1&display=10&sregDtmValCd=6&occupation=[직종코드1|직종코드2]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L21.do?authKey=[WORK24_KEY_SMALL_GIANT]&callTp=L&returnType=XML&startPage=1&display=10&sregDtmValCd=6`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| region | String |  | (다중검색 가능)<br>근무지역코드를 입력합니다.<br>근무지역코드 보기 |
| occupation | String |  | (다중검색 가능)<br>직종코드를 입력합니다.<br>직종코드 보기 |
| sregDtmValCd | Number | Y | 검색할 등록일자의 기간을 선택합니다.<br>- 1 : 오늘<br>- 2 : 3일<br>- 3: 1주이내<br>- 4 : 2주이내<br>- 5 : 한달<br>- 6 : 전체 |
| traSchStdt | String |  | 연수기간조회 시작일자 기간검색을 합니다.<br>- 조회일자 이후가 포함되는 연수기간을 기준으로 기간검색을 합니다. |
| traSchEndt | String |  | 연수기간조회 종료일자 기간검색을 합니다.<br>- 조회일자 이전이 포함되는 연수기간을 기준으로 기간검색을 합니다. |
| custNm | String |  | 사업장명을 입력합니다. |
| orgNm | String |  | 운영기관명을 입력합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <traOrgList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <traOrg> |  |  |  |  |
|  |  | <wantedAuthNo> | String | 구인인증번호 | </wantedAuthNo> |
|  |  | <traOrgNm> | String | 운영기관명 | </traOrgNm> |
|  |  | <dtlSmlgntYn> | String | 강소기업 여부(Y) | </dtlSmlgntYn> |
|  |  | <traCustNm> | String | 사업장명 | </traCustNm> |
|  |  | <collectJobsNm> | String | 모집직종 | </collectJobsNm> |
|  |  | <regionNm> | String | 연수지역 | </regionNm> |
|  |  | <selPsncnt> | String | 선발인원 | </selPsncnt> |
|  |  | <collectPsncnt> | String | 모집인원 | </collectPsncnt> |
|  |  | <traStdt> | String | 연수기간 시작일 | </traStdt> |
|  |  | <traEndt> | String | 연수기간 종료일 | </traEndt> |
|  |  | <regDt> | String | 등록일 | </regDt> |
|  | </traOrg> |  |  |  |  |
| </traOrgList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<traOrgList>
 <total>4460</total>
 <startPage>1</startPage>
 <display>10</display>
 <traOrg>
  <wantedAuthNo>YM30111901090006</wantedAuthNo>
  <traOrgNm>세종대학교</traOrgNm>
  <traCustNm>(주)에이시지알</traCustNm>
  <regionNm>서울 서초구</regionNm>
  <selPsncnt>0</selPsncnt>
  <collectPsncnt>2</collectPsncnt>
  <traStdt>20180102</traStdt>
  <traEndt>20180228</traEndt>
  <regDt>20190109</regDt>
 </traOrg>
 <traOrg>
  <wantedAuthNo>YM31131901020001</wantedAuthNo>
  <traOrgNm>순천향대학교</traOrgNm>
  <traCustNm>정진세림회계법인</traCustNm>
  <regionNm>서울 강남구</regionNm>
  <selPsncnt>0</selPsncnt>
  <collectPsncnt>2</collectPsncnt>
  <traStdt>20181201</traStdt>
  <traEndt>20190222</traEndt>
  <regDt>20190102</regDt>
 </traOrg>
 <traOrg>
  <wantedAuthNo>YM30241812240004</wantedAuthNo>
  <traOrgNm>인제대</traOrgNm>
  <traCustNm>주식회사 파고다에스씨에스 부산대지점</traCustNm>
  <regionNm>부산 금정구</regionNm>
  <selPsncnt>0</selPsncnt>
  <collectPsncnt>2</collectPsncnt>
  <traStdt>20181217</traStdt>
  <traEndt>20190118</traEndt>
  <regDt>20181224</regDt>
 </traOrg>
 <traOrg>
  <wantedAuthNo>YM30481812240006</wantedAuthNo>
  <traOrgNm>목포대</traOrgNm>
  <traCustNm>JS퀴진요리학원</traCustNm>
  <selPsncnt>1</selPsncnt>
  <collectPsncnt>2</collectPsncnt>
  <traStdt>20181220</traStdt>
… (생략)
```


## 청년친화강소기업

✅ 호출 확인

> 고용노동부에서 선정한 청년에게 추천하는 작지만 강한기업 '청년친화강소기업' 입니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L31.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L31.do?authKey=[WORK24_KEY_SMALL_GIANT]&returnType=XML&startPage=1&display=10
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo216L31.do?authKey=[WORK24_KEY_SMALL_GIANT]&returnType=XML&startPage=1&display=10`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <smallGiantsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <smallGiant> |  |  |  |  |
|  |  | <coNm> | String | 기업명 | </coNm> |
|  |  | <busiNo> | String | 사업자등록번호 | </busiNo> |
|  |  | <reperNm> | String | 대표자 | </reperNm> |
|  |  | <superIndTpCd> | String | 업종코드(상) | </superIndTpCd> |
|  |  | <superIndTpNm> | String | 업종명(상) | </superIndTpNm> |
|  |  | <indTpCd> | String | 업종코드(중) | </indTpCd> |
|  |  | <indTpNm> | String | 업종명(중) | </indTpNm> |
|  |  | <regionCd> | String | 지역코드 | </regionCd> |
|  |  | <regionNm> | String | 지역명 | </regionNm> |
|  |  | <alwaysWorkerCnt> | String | 상시근로자 수 | </alwaysWorkerCnt> |
|  | </smallGiant> |  |  |  |  |
| </smallGiantsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<smallGiantsList>
 <total>224</total>
 <startPage>1</startPage>
 <display>10</display>
 <smallGiant>
  <coNm>주식회사 에듀템</coNm>
  <busiNo>2958700424</busiNo>
  <reperNm>***</reperNm>
  <superIndTpCd>J</superIndTpCd>
  <superIndTpNm>정보통신업</superIndTpNm>
  <indTpCd>58</indTpCd>
  <indTpNm>출판업</indTpNm>
  <regionCd>11440</regionCd>
  <regionNm>서울 마포구</regionNm>
 </smallGiant>
 <smallGiant>
  <coNm>(주)경은기전</coNm>
  <busiNo>6108612063</busiNo>
  <reperNm>***</reperNm>
  <superIndTpCd>C</superIndTpCd>
  <superIndTpNm>제조업</superIndTpNm>
  <indTpCd>28</indTpCd>
  <indTpNm>전기장비 제조업</indTpNm>
  <regionCd>31140</regionCd>
  <regionNm>울산 남구</regionNm>
 </smallGiant>
 <smallGiant>
  <coNm>(주)현진스포텍</coNm>
  <busiNo>1098127611</busiNo>
  <reperNm>***</reperNm>
  <superIndTpCd>C</superIndTpCd>
  <superIndTpNm>제조업</superIndTpNm>
  <indTpCd>14</indTpCd>
  <indTpNm>의복, 의복 액세서리 및 모피제품 제조업</indTpNm>
  <regionCd>11560</regionCd>
  <regionNm>서울 영등포구</regionNm>
 </smallGiant>
 <smallGiant>
  <coNm>한국훅스윤활유(주)</coNm>
  <busiNo>1168130467</busiNo>
  <reperNm>***</reperNm>
  <superIndTpCd>G</superIndTpCd>
  <superIndTpNm>도매 및 소매업</superIndTpNm>
  <indTpCd>46</indTpCd>
… (생략)
```
