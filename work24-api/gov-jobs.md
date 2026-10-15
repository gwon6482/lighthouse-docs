# 고용24 정부지원일자리정보 API

> 인증키: `WORK24_KEY_GOV_JOBS` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16


## 참여자모집정보

✅ 호출 확인

> 정부지원일자리정보 API를 이용하여 정부지원일자리 사업정보, 모집정보, 참여자정보, 기관기본정보 등을 구성 할 수 있습니다.
> 검색조건에 해당하는 참여자모집정보 목록을 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L01.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&srchBgnDt=[조회시작일]&srchEndDt=[조회종료일]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L01.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&srchBgnDt=20260901&srchEndDt=20261016`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | string | 필수 | 인증키(ex : authKey=[인증키] |
| returnType | string | 필수 | 리턴타입:XML, JSON 중 하나로 지정합니다.(ex : returnType=XML) |
| bsnsId | string | 선택 | 사업ID를 입력합니다.<br>사업ID 보기<br>- 해당 사업ID를 통하여 사업명과 그에 해당하는 참여자모집정보를 조회합니다. |
| insttTyCode | string | 선택 | 기관유형코드를 입력합니다.<br>기관유형코드 보기<br>- 해당 기관유형코드를 포함하는 기관유형 조건을 통해 참여자모집정보를 조회합니다. |
| manageInsttId | string | 선택 | 주관기관ID를 입력합니다.<br>주관기관ID 보기<br>- 조회하고자 하는 해당사업의 주관기관ID를 조건으로 포함하여 조회합니다. |
| region | string | 선택 | 기관소재지코드를 입력합니다.<br>기관소재지코드 보기<br>- 조회하고자 하는 해당사업의 기관소재지코드를 지역조건으로 포함하여 조회합니다. |
| jssfcCode | string | 선택 | 직종코드를 입력합니다.<br>직종코드 보기<br>- 조회하고자 하는 해당사업의 직종코드를 희망직종조건으로 포함하여 조회합니다. |
| hnAttrbSeCode | string | 선택 | 취업취약계층코드를 입력합니다.<br>취업취약계층코드 보기<br>- 조회하고자 하는 해당사업의 취업취약계층코드를 우대조건으로 포함하여 조회합니다. |
| ageSeCode | string | 선택 | 연령유형코드를 입력합니다.<br>연령유형코드 보기<br>- 조회하고자 하는 해당사업의 연령유형코드를 참여유형조건으로 포함하여 조회합니다. |
| wageSeCode | string | 선택 | 임금구분코드를 입력합니다.<br>임금구분코드 보기<br>- 조회하고자 하는 해당사업의 임금구분코드를 희망임금조건으로 포함하여 조회합니다. |
| srchBgnDt | string | 필수 | 조회시작일자 기간검색을 합니다.<br>- 조회시작일자 이후에 포함되는 모집공고 등록일을 기준으로 기간검색을 합니다. |
| srchEndDt | string | 필수 | 조회종료일자 기간검색을 합니다.<br>- 조회시작일자 이전에 포함되는 모집공고 등록일을 기준으로 기간검색을 합니다. |

### 출력 항목

| 출력항목 | 타입 | 설명 | 비고 |  |  |
|---|---|---|---|---|---|
| <ilmoaJobsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 현재페이지번호 | </startPage> |  |
|  | <display> | Number | 화면표시건수 | </display> |  |
|  | <ilmoaJob> |  |  |  |  |
|  |  | <rn> | String | 순번 | </rn> |
|  |  | <rcritPblancId> | String | 모집공고 | </rcritPblancId> |
|  |  | <bsnsNm> | String | 사업명 | </bsnsNm> |
|  |  | <instTyCodeNm> | String | 기관유형 | </instTyCodeNm> |
|  |  | <manageInsttNm> | String | 주관기관명 | </manageInsttNm> |
|  |  | <executeInsttNm> | String | 기관명 | </executeInsttNm> |
|  |  | <rcritPblancNm> | String | 모집공고(일자리)명 | </rcritPblancNm> |
|  |  | <wageSeCodeNm> | String | 임금구분 | </wageSeCodeNm> |
|  |  | <wageAmount> | String | 임금(금액) | </wageAmount> |
|  |  | <workAreaCodeNm> | String | 근무지역명 | </workAreaCodeNm> |
|  |  | <registDt> | String | 등록일 | </registDt> |
|  |  | <rcritBeginDe> | String | 모집공고시작일 | </rcritBeginDe> |
|  |  | <rcritEndDe> | String | 모집공고마감일 | </rcritEndDe> |
|  | </ilmoaJob> |  |  |  |  |
| </ilmoaJobsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<ilmoaJobsList>
 <startPage>1</startPage>
 <total>3</total>
 <display>10</display>
 <ilmoaJob>
  <rn>1</rn>
  <rcritPblancId>2109783</rcritPblancId>
  <workAreaCodeNm> 강원특별자치도 평창군</workAreaCodeNm>
  <executeInsttNm>오대산국립공원사무소</executeInsttNm>
  <bsnsNm>국립공원지킴이(녹색순찰대)</bsnsNm>
  <rcritPblancNm>제2026-30호 2026년 오대산사무소 기간제(한시인력)[국립공원지킴이(녹색순찰대)] 직원 채용(6차) 공고</rcritPblancNm>
  <wageSeCodeNm>월급</wageSeCodeNm>
  <wageAmount>2,280,000</wageAmount>
  <registDt>2026-10-14</registDt>
  <rcritBeginDe>2026-10-14</rcritBeginDe>
  <rcritEndDe>2026-10-27</rcritEndDe>
  <workAreaCode>51760</workAreaCode>
  <insttId>1010514166</insttId>
  <bsnsId>1040002</bsnsId>
  <wageSeCode>Z0904</wageSeCode>
  <insttTyCodeNm>중앙부처</insttTyCodeNm>
  <manageInsttNm>기후에너지환경부</manageInsttNm>
 </ilmoaJob>
 <ilmoaJob>
  <rn>2</rn>
  <rcritPblancId>2109579</rcritPblancId>
  <workAreaCodeNm> 전남광주통합특별시 화순군</workAreaCodeNm>
  <executeInsttNm>전남광주통합특별시 화순군청</executeInsttNm>
  <bsnsNm>(전남광주통합특별시 화순군청)공공산림관리단</bsnsNm>
  <rcritPblancNm>2026년 공공산림관리단 참여자 추가모집 공고</rcritPblancNm>
  <wageSeCodeNm>일급</wageSeCodeNm>
  <wageAmount>90,560</wageAmount>
  <registDt>2026-10-08</registDt>
  <rcritBeginDe>2026-10-08</rcritBeginDe>
  <rcritEndDe>2026-10-15</rcritEndDe>
  <workAreaCode>12760</workAreaCode>
  <insttId>10927</insttId>
  <bsnsId>9084300</bsnsId>
  <wageSeCode>Z0902</wageSeCode>
  <insttTyCodeNm>자치단체</insttTyCodeNm>
  <manageInsttNm>전남광주통합특별시 화순군청</manageInsttNm>
 </ilmoaJob>
 <ilmoaJob>
  <rn>3</rn>
… (생략)
```


## 참여자모집상세정보

✅ 호출 확인

> 정부지원일자리정보 API를 이용하여 정부지원일자리 사업정보, 모집정보, 참여자정보, 기관기본정보 등을 구성 할 수 있습니다.
> 검색조건에 해당하는 참여자모집상세정보 목록을 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211D01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211D01.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&rcritPblancId=[모집공고ID]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211D01.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&rcritPblancId=2109783`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 (XML)을 반드시 지정합니다. |
| rcritPblancId | String | Y | 모집공고(일자리)ID를 입력합니다.<br>- 해당 모집공고(일자리ID)의 모집공고명과 그에 해당하는 참여자모집상세정보를 조회합니다. |

### 출력 항목

| >항목 | 타입 | >설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <ilmoaPartcptnRcritDtl> |  |  |  |  |  |  |
|  | <rcritPblancId> | String | 모집공고ID | </rcritPblancId> |  |  |
|  | <partcptnRcritInfo> |  |  |  |  |  |
|  |  | <rcritPblancNm> | String | 모집공고(일자리)명 | </rcritPblancNm> |  |
|  |  | <insttNm> | String | 기관명 | </insttNm> |  |
|  |  | <insttAdres> | String | 기관주소명 | </insttAdres> |  |
|  |  | <hmpgAdres> | String | 기관홈페이지 | </hmpgAdres> |  |
|  |  | <chargerNm> | String | 담당자명 | </chargerNm> |  |
|  |  | <chargerTlphonNo> | String | 담당자연락처 | </chargerTlphonNo> |  |
|  |  | <chargerEmailAdres> | String | 담당자이메일 | </chargerEmailAdres> |  |
|  |  | <dtyCn> | String | 직무내용 | </dtyCn> |  |
|  |  | <rcritNmpr> | String | 모집인원 | </rcritNmpr> |  |
|  |  | <bsnsPartcptnBeginDe> | String | 참여시작일 | </bsnsPartcptnBeginDe> |  |
|  |  | <bsnsPartcptnEndDe> | String | 참여종료일 | </bsnsPartcptnEndDe> |  |
|  |  | <workAreaCodeNm> | String | 근무지역 | </workAreaCodeNm> |  |
|  |  | <partcptnTimeSeCodeNm> | String | 근무시간구분코드명 | </partcptnTimeSeCodeNm> |  |
|  |  | <workBeginTime> | String | 근무시작시간 | </workBeginTime> |  |
|  |  | <workEndTime> | String | 근무종료시간 | </workEndTime> |  |
|  |  | <wageSeCodeNm> | String | 임금구분코드명 | </wageSeCodeNm> |  |
|  |  | <wageAmount> | String | 임금(금액) | </wageAmount> |  |
|  |  | <rcritEndDe> | String | 접수마감일 | </rcritEndDe> |  |
|  |  | <etcMatter> | String | 기타사항 | </etcMatter> |  |
|  |  | <jobRcritJssfc> |  |  |  |  |
|  |  |  | <jssfcCodeNm> | String | 직종 | </jssfcCodeNm> |
|  |  | </postRceptAt> |  |  |  |  |
|  |  | <jobRcritMajor> |  |  |  |  |
|  |  |  | <majorCodeNm> | String | 전공 | </majorCodeNm> |
|  |  | </jobRcritMajor> |  |  |  |  |
|  |  | <jobRcritQualfLcns> |  |  |  |  |
|  |  |  | <qualfLcnsCodeNm> | String | 자격면허 | </qualfLcnsCodeNm> |
|  |  | </jobRcritQualfLcns> |  |  |  |  |
|  |  | <jobRcritReqstPapers> |  |  |  |  |
|  |  |  | <reqstPapersCodeNm> | String | 신청서류 | </reqstPapersCodeNm> |
|  |  | </jobRcritReqstPapers> |  |  |  |  |
|  |  | <jobRcritMethod> |  |  |  |  |
|  |  |  | <rcritMethodNm> | String | 접수방법 | </rcritMethodNm> |
|  |  | </jobRcritMethod> |  |  |  |  |
|  | </partcptnRcritInfo> |  |  |  |  |  |
| </ilmoaPartcptnRcritDtl> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<ilmoaPartcptnRcritDtl>
 <startPage>1</startPage>
 <total>31</total>
 <partcptnRcritInfo>
  <rcritPblancId>2109783</rcritPblancId>
  <rcritPblancNm>제2026-30호 2026년 오대산사무소 기간제(한시인력)[국립공원지킴이(녹색순찰대)] 직원 채용(6차) 공고</rcritPblancNm>
  <bsnsId>1040002</bsnsId>
  <dtyCn>ㅇ 국립공원 청소(탐방로, 화장실, 야영장 등)에 관한 업무
ㅇ 불법 무질서행위(취사, 흡연 등) 예방 및 단속 지원에 관한 업무
ㅇ 시설물(안내표지판, 난간, 화장실 등) 유지, 보수에 관한 업무
ㅇ 재난 및 안전관리(위험지역 순찰, 통제, 산불예방 등)에 관한 업무
ㅇ 기타 국립공원 보전 보호 활동 및 청사관리 등에 관한 업무
ㅇ 탐방안내 및 탐방프로그램 지원 등 탐방서비스 제공에 관한 업무
ㅇ 사무소장이 필요하다고 인정하는 업무 등</dtyCn>
  <rcritNmpr>2</rcritNmpr>
  <bsnsPartcptnBeginDe>2026-11-12</bsnsPartcptnBeginDe>
  <bsnsPartcptnEndDe>2026-12-31</bsnsPartcptnEndDe>
  <workAreaCodeNm> 강원특별자치도 평창군</workAreaCodeNm>
  <partcptnTimeSeCodeNm/>
  <workBeginTime>09:00</workBeginTime>
  <workEndTime>18:00</workEndTime>
  <wageSeCodeNm>월급</wageSeCodeNm>
  <wageAmount>2,280,000</wageAmount>
  <rcritEndDe>2026-10-27</rcritEndDe>
  <visitRceptAt/>
  <postRceptAt/>
  <onlineRceptAt/>
  <faxRceptAt/>
  <etcRceptAt/>
  <etcMatter>-</etcMatter>
  <insttNm>오대산국립공원사무소</insttNm>
  <insttAdres>(25318) 강원특별자치도 평창군 진부면 오대산로 2 오대산국립공원사무소</insttAdres>
  <hmpgAdres/>
  <chargerDeptNm>자원보전과</chargerDeptNm>
  <chargerRspofcNm/>
  <rcritPblancItnadr/>
  <jobRcritJssfc>
   <jssfcCodeNm>주차 단속원 및 안전 순찰원</jssfcCodeNm>
  </jobRcritJssfc>
  <jobRcritJssfc>
   <jssfcCodeNm>기타 청소 관련 종사원(놀이공원 등)</jssfcCodeNm>
  </jobRcritJssfc>
  <jobRcritReqstPapers>
   <reqstPapersCodeNm>사업신청서(홈페이지 게시 및 비치)</reqstPapersCodeNm>
… (생략)
```


## 일자리사업정보

✅ 호출 확인

> 정부지원일자리정보 API를 이용하여 정부지원일자리 사업정보, 모집정보, 참여자정보, 기관기본정보 등을 구성 할 수 있습니다.
> 검색조건에 해당하는 일자리사업정보 목록을 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L02.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L02.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L02.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 (XML)을 반드시 지정합니다. |
| insttTyCode | String |  | 기관유형코드를 입력합니다.<br>기관유형코드 보기<br>- 해당 기관유형코드를 입력하여 사업의 기관유형을 조건으로 조회합니다. |
| insttId | String |  | 주관기관ID를 입력합니다.<br>주관기관ID 보기<br>- 기관ID를 입력하여 해당하는 사업기본 관리기관ID 조건으로 조회합니다. |
| bsnsTyCode | String |  | 사업유형코드를 입력합니다.<br>사업유형코드 보기<br>- 사업유형코드를 조건으로 입력하여 그에 해당하는 일자리사업정보를 조회합니다. |
| bsnsId | String |  | 사업ID를 입력합니다.<br>사업ID 보기<br>- 해당 사업ID를 통하여 사업명과 그에 해당하는 일자리사업정보를 조회합니다. |
| areaCode | String |  | 기관소재지코드를 입력합니다.<br>기관소재지코드 보기<br>- 조회하고자 하는 해당사업의 기관소재지코드를 지역조건으로 포함하여 조회합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <ilmoaJobsList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 현재페이지번호 | </startPage> |  |
|  | <display> | Number | 화면표시건수 | </display> |  |
|  | <ilmoaJob> |  |  |  |  |
|  |  | <rn> | String | 순번 | </rn> |
|  |  | <bsnsId> | String | 사업ID | </bsnsId> |
|  |  | <bsnsNm> | String | 사업명 | </bsnsNm> |
|  |  | <InstTyCodeNm> | String | 기관유형 | </InstTyCodeNm> |
|  |  | <manageInsttNm> | String | 주관기관명 | </manageInsttNm> |
|  |  | <bsnsTyCodeNm> | String | 사업유형 | </bsnsTyCodeNm> |
|  | </ilmoaJob> |  |  |  |  |
| </ilmoaJobsList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<ilmoaJobsList>
 <startPage>1</startPage>
 <total>10</total>
 <display>10</display>
 <ilmoaJob>
  <rn>1</rn>
  <bsnsId>9084895</bsnsId>
  <bsnsNm>(강원특별자치도 화천군청)화천형 일자리 안심공제</bsnsNm>
  <manageInsttNm>강원특별자치도 화천군청</manageInsttNm>
  <bsnsTyCodeNm>기타</bsnsTyCodeNm>
  <manageChargerDeptNm/>
  <insttTyCodeNm>자치단체</insttTyCodeNm>
 </ilmoaJob>
 <ilmoaJob>
  <rn>2</rn>
  <bsnsId>9084894</bsnsId>
  <bsnsNm>(전북특별자치도 완주군청)2026년 가을철 산림재난대응단(산불전문예방진화대)</bsnsNm>
  <manageInsttNm>전북특별자치도 완주군청</manageInsttNm>
  <bsnsTyCodeNm>직접일자리</bsnsTyCodeNm>
  <manageChargerDeptNm>자치행정과</manageChargerDeptNm>
  <insttTyCodeNm>자치단체</insttTyCodeNm>
 </ilmoaJob>
 <ilmoaJob>
  <rn>3</rn>
  <bsnsId>9084893</bsnsId>
  <bsnsNm>2026(충청북도 보은군청)노인맞춤돌봄서비스</bsnsNm>
  <manageInsttNm>충청북도 보은군청</manageInsttNm>
  <bsnsTyCodeNm>직접일자리</bsnsTyCodeNm>
  <manageChargerDeptNm/>
  <insttTyCodeNm>자치단체</insttTyCodeNm>
 </ilmoaJob>
 <ilmoaJob>
  <rn>4</rn>
  <bsnsId>9084892</bsnsId>
  <bsnsNm>(전남광주통합특별시 순천시청)2026년 산림재난대응단(산불분야)</bsnsNm>
  <manageInsttNm>전남광주통합특별시 순천시청</manageInsttNm>
  <bsnsTyCodeNm>직접일자리</bsnsTyCodeNm>
  <manageChargerDeptNm/>
  <insttTyCodeNm>자치단체</insttTyCodeNm>
 </ilmoaJob>
 <ilmoaJob>
  <rn>5</rn>
  <bsnsId>9084891</bsnsId>
  <bsnsNm>(전남광주통합특별시 순천시청)2026년 읍면동 산림재난대응단(산불분야)</bsnsNm>
… (생략)
```


## 일자리사업상세정보

✅ 호출 확인

> 정부지원일자리정보 API를 이용하여 정부지원일자리 사업정보, 모집정보, 참여자정보, 기관기본정보 등을 구성 할 수 있습니다.
> 검색조건에 해당하는 일자리사업상세정보 목록을 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211D02.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211D02.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&bsnsId=[사업ID]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211D02.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&bsnsId=1040002`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 (XML)을 반드시 지정합니다. |
| bsnsId | String | Y | 사업ID를 입력합니다.<br>사업ID 보기<br>- 해당 사업ID를 통하여 사업명과 그에 해당하는 일자리사업상세정보를 조회합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <bsnsDetailInfoBsnsDtl> |  |  |  |  |  |  |
|  | <bansId> | String | 사업ID | </bansId> |  |  |
|  | <bsnsDetailInfo> |  |  |  |  |  |
|  |  | <bsnsNm> | String | 사업명 | </bsnsNm> |  |
|  |  | <insttNm> | String | 기관명 | </insttNm> |  |
|  |  | <chargerDeptNm> | String | 부서명 | </chargerDeptNm> |  |
|  |  | <chargerNm> | String | 담당자명 | </chargerNm> |  |
|  |  | <chargerRspofcNm> | String | 담당자직책 | </chargerRspofcNm> |  |
|  |  | <chargerTlphonNo> | String | 담당자연락처 | </chargerTlphonNo> |  |
|  |  | <hmpgAdres> | String | 홈페이지 | </hmpgAdres> |  |
|  |  | <adres> | String | 주소 | </adres> |  |
|  |  | <lglBasis> | String | 법적근거 | </lglBasis> |  |
|  |  | <relateManual> | String | 관련지침 | </relateManual> |  |
|  |  | <bsnsBeginYear> | String | 시작년도 | </bsnsBeginYear> |  |
|  |  | <bsnsPurps> | String | 사업목적 및 내용 | </bsnsPurps> |  |
|  |  | <bsnsPrtnPdSeCodeNm> | String | 수행 형태구분 | </bsnsPrtnPdSeCodeNm> |  |
|  |  | <bsnsPrtnBeginDe> | String | 수행 시작일자 | </bsnsPrtnBeginDe> |  |
|  |  | <bsnsPrtnPd> | String | 수행기간 | </bsnsPrtnPd> |  |
|  |  | <rcritBeginDe> | String | 모집 시작일자 | </rcritBeginDe> |  |
|  |  | <rcritEra> | String | 모집시기 | </rcritEra> |  |
|  |  | <mdLaborTime> | String | 월근로시간 | </mdLaborTime> |  |
|  |  | <weekUnitLaborDaycnt> | String | 일근로시간 | </weekUnitLaborDaycnt> |  |
|  |  | <wageCndCodeNm> | String | 급여구분 | </wageCndCodeNm> |  |
|  |  | <wagePymntAmount> | String | 급여 | </wagePymntAmount> |  |
|  |  | <etcAllwnc> | String | 기타수당 | </etcAllwnc> |  |
|  |  | <partclrMatter> | String | 특이사항 | </partclrMatter> |  |
|  |  | <partcptnRqisit> | String | 우대 및 제한요건 | </partcptnRqisit> |  |
|  |  | <mainPrtcpntTy> |  |  |  |  |
|  |  |  | <prtcpntTyCodeNm> | String | 참여자유형 | </prtcpntTyCodeNm> |
|  |  | </mainPrtcpntTy> |  |  |  |  |
|  | </bsnsDetailInfo> |  |  |  |  |  |
| </bsnsDetailInfoBsnsDtl> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<bsnsDetailInfoBsnsDtl>
 <startPage>1</startPage>
 <total>24</total>
 <display>10</display>
 <bsnsDetailInfo>
  <bsnsNm>국립공원지킴이(녹색순찰대)</bsnsNm>
  <insttNm>기후에너지환경부</insttNm>
  <chargerDeptNm/>
  <faxNo/>
  <chargerEmailAdres/>
  <hmpgAdres>http://www.me.go.kr</hmpgAdres>
  <adres>(30108) 세종특별자치시 도움6로 11 </adres>
  <lglBasis/>
  <relateManual/>
  <bsnsBeginYear/>
  <bsnsPurps/>
  <bsnsPrtnPd/>
  <rcritEra/>
  <mdLaborTime/>
  <weekUnitLaborDaycnt/>
  <wageCndCodeNm/>
  <wagePymntAmount/>
  <etcAllwnc/>
  <partclrMatter/>
  <partcptnRqisit/>
  <bsnsPrtnPdSeCodeNm/>
  <bsnsPrtnBeginDe/>
  <rcritBeginDe/>
 </bsnsDetailInfo>
 <bansId/>
</bsnsDetailInfoBsnsDtl>
```


## 기관기본정보

❌ 호출 실패 — 정보가 존재하지 않습니다.

> 정부지원일자리정보 API를 이용하여 정부지원일자리 사업정보, 모집정보, 참여자정보, 기관기본정보 등을 구성 할 수 있습니다.
> 검색조건에 해당하는 기관기본정보 목록을 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L05.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L05.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&bsnsId=[사업ID]&region=[지역코드]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L05.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&bsnsId=1040002&region=52`

> ⚠️ 사업ID(bsnsId)와 기관소재지코드(region)의 **조합이 맞아야** 한다. 목록에서 받은 사업ID 하나로 지역 19개를 돌려도 "정보가 존재하지 않습니다".

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 (XML)을 반드시 지정합니다. |
| bsnsId | String | Y | 사업ID를 입력합니다.<br>사업ID 보기<br>- 해당 사업ID를 통하여 사업명과 그에 해당하는 기관기본정보를 조회합니다. |
| region | String | Y | 기관소재지코드를 입력합니다.<br>기관소재지코드 보기<br>- 해당 기관소재지코드를 포함한 기관기본정보를 조회합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <ilmoaJobsList> |  |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |  |
|  | <startPage> | Number | 현재페이지번호 | </startPage> |  |  |
|  | <display> | Number | 화면표시건수 | </display> |  |  |
|  | <ilmoaJob> |  |  |  |  |  |
|  |  | <rn> | String | 순번 | </rn> |  |
|  |  | <bsnsNm> | String | 사업명 | </bsnsNm> |  |
|  |  | <manageInsttNm> | String | 부처명 | 주관기관명 | </manageInsttNm> |
|  |  | <executeInsttNm> | String | 기관명 | </executeInsttNm> |  |
|  |  | <insttClCodeNm> | String | 기관유형 | </insttClCodeNm> |  |
|  |  | <insttAreaCodeNm> | String | 기관간편주소 | </insttAreaCodeNm> |  |
|  |  | <upperInsttNm> | String | 상위기관명 | </upperInsttNm> |  |
|  | </ilmoaJob> |  |  |  |  |  |
| </ilmoaJobsList> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<ilmoaJobsList>
 <messageCd>006</messageCd>
 <message>정보가 존재하지 않습니다.</message>
</ilmoaJobsList>
```


## 참여자통계

✅ 호출 확인

> 정부지원일자리정보 API를 이용하여 정부지원일자리 사업정보, 모집정보, 참여자정보, 기관기본정보 등을 구성 할 수 있습니다.
> 검색조건에 해당하는 참여자통계(성별, 연령별, 지역별) 목록을 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L08.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L08.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&bsnsId=[사업ID]&srchYear=[조회년도]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo211L08.do?authKey=[WORK24_KEY_GOV_JOBS]&returnType=XML&bsnsId=1040002&srchYear=2025`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 (XML)을 반드시 지정합니다. |
| bsnsId | String | Y | 사업ID를 입력합니다.<br>사업ID 보기<br>- 해당 사업ID를 통하여 사업명과 그에 해당하는 참여자통계(성별, 연령별, 지역별)정보를 조회합니다. |
| srchYear | String | Y | 조회년도를 입력합니다.<br>- 조회년도에 해당하는참여자통계(성별, 연령별, 지역별) 정보를 조회합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <ilmoaStatesList> |  |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |  |
|  | <startPage> | Number | 현재페이지번호 | </startPage> |  |  |
|  | <display> | Number | 화면표시건수 | </display> |  |  |
|  | <ilmoaState> |  |  |  |  |  |
|  |  | <rn> | String | 순번 | </rn> |  |
|  |  | <bsnsNm> | String | 사업명 | </bsnsNm> |  |
|  |  | <sexdstn> | String | 성별 | </sexdstn> |  |
|  |  |  | <sexdstnCodeNm> | String | 성별코드명 | </sexdstnCodeNm> |
|  |  |  | <partcptnCnt> | String | 참여인원수 | </partcptnCnt> |
|  |  | <age> | String | 연령별 | </age> |  |
|  |  |  | <ageGroupNm> | String | 연령코드명 | </ageGroupNm> |
|  |  |  | <partcptnCnt> | String | 참여인원수 | </partcptnCnt> |
|  |  | <area> | String | 지역별 | </area> |  |
|  |  |  | <areaCodeNm> | String | 지역코드명 | </areaCodeNm> |
|  |  |  | <partcptnCnt> | String | 참여인원수 | </partcptnCnt> |
|  | </ilmoaState> |  |  |  |  |  |
| </ilmoaStatesList> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<ilmoaStatesList>
 <startPage>1</startPage>
 <total>1</total>
 <display>10</display>
 <ilmoaState>
  <rn>1</rn>
  <bsnsId>1040002</bsnsId>
  <manageYear>2025</manageYear>
  <bsnsNm>국립공원지킴이(녹색순찰대)</bsnsNm>
  <sexdstn>
   <bsnsId/>
   <manageYear/>
   <sexdstnCodeNm>남성</sexdstnCodeNm>
   <partcptnCnt>321</partcptnCnt>
  </sexdstn>
  <sexdstn>
   <bsnsId/>
   <manageYear/>
   <sexdstnCodeNm>여성</sexdstnCodeNm>
   <partcptnCnt>128</partcptnCnt>
  </sexdstn>
  <age>
   <bsnsId/>
   <manageYear/>
   <ageGroupNm>중년</ageGroupNm>
   <partcptnCnt>183</partcptnCnt>
  </age>
  <age>
   <bsnsId/>
   <manageYear/>
   <ageGroupNm>청년</ageGroupNm>
   <partcptnCnt>14</partcptnCnt>
  </age>
  <age>
   <bsnsId/>
   <manageYear/>
   <ageGroupNm>노인</ageGroupNm>
   <partcptnCnt>231</partcptnCnt>
  </age>
  <age>
   <bsnsId/>
   <manageYear/>
   <ageGroupNm>장년</ageGroupNm>
   <partcptnCnt>21</partcptnCnt>
… (생략)
```
