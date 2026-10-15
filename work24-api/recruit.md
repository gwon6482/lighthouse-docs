# 고용24 채용정보 API

> 인증키: `WORK24_KEY_RECRUIT` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16

**우리 서비스에서**: **진로백과 '채용' 탭 실데이터(로드맵 1번)** — 목록을 직종코드(`occupation`)로 검색, 상세로 공고 내용. 공고번호 `wantedAuthNo`.


## 채용정보

✅ 호출 확인

> 채용정보 API를 이용하여 다양한 카테고리의 구인정보를 구성할 수 있습니다.(예 : 여성,고령자채용정보 등)

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10

예제2) 다중검색(다중검색 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10&occupation=[직종코드1|직종코드2]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10`

> ⚠️ 우리 직업코드 → 채용 직종코드 연결이 필요하다(공통코드 `dtlGb=2`). 전체 공고 약 5.8만 건(2026-10-16).

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| region | String |  | (다중검색 가능)<br>근무지역코드를 입력합니다.<br>근무지역코드 보기 |
| occupation | String |  | (다중검색 가능)<br>직종코드를 입력합니다.<br>직종코드 보기<br>* 다수의 직종코드를 한번에 입력할 경우 API 이용에 제한이 있을 수 있습니다.(예: 100개 이상) |
| salTp | String |  | 임금형태<br>- D : 일급<br>- H : 시급<br>- M : 월급<br>- Y : 연봉<br>* 검색조건 미입력시 관계없음으로 조회됩니다. |
| minPay | Number | 임금형태 입력시 필수 입력 | 최소급여<br>- ~ 만원(원)이상 : 연봉,월급(일급,시급) 검색값 입력 시<br>- 천단위구분을 위한 콤마(,)는 입력하지 않습니다. |
| maxPay | Number | 임금형태 입력시 필수 입력 | 최대급여<br>- ~ 만원(원)이상 : 연봉,월급(일급,시급) 검색값 입력 시<br>- 천단위구분을 위한 콤마(,)는 입력하지 않습니다. |
| education | String |  | 학력 코드를 입력합니다.<br>- 00 : 학력무관<br>- 01 : 초졸이하<br>- 02 : 중졸<br>- 03 : 고졸<br>- 04 : 대졸(2~3년)<br>- 05 : 대졸(4년)<br>- 06 : 석사<br>- 07 : 박사<br>* 학력무관(00) 입력시 다수 항목 입력 불가. |
| career | String |  | 경력 코드를 입력합니다.<br>- N : 신입<br>- E : 경력<br>- Z : 관계없음<br>* 경력의 경우 반드시 경력최소개월,경력최대개월을 입력 |
| minCareerM | Number | 경력코드 입력시 필수입력 | 경력 최소개월 수 |
| maxCareerM | Number | 경력코드 입력시 필수입력 | 경력 최대개월 수 |
| pref | String |  | (다중검색 가능)<br>우대조건<br>- Y : 장애인 병행채용<br>- D : 장애인만 채용 |
| subway | String |  | (다중검색 가능)<br>역세권 코드를 입력합니다.<br>역세권코드 보기<br>* 지역-호선-역 코드 의 형식으로 입력하십시오. |
| empTp | String |  | (다중검색 가능)<br>고용형태<br>- 4 : 파견근로<br>- 10 : 기간의 정함이 없는 근로계약<br>- 11 : 기간의 정함이 없는 근로계약(시간(선택)제)<br>- 20 : 기간의 정함이 있는 근로계약<br>- 21 : 기간의 정함이 있는 근로계약(시간(선택)제)<br>- Y : 대체인력채용 |
| termContractMmcnt | String |  | (다중검색 가능)<br>근무기간<br>- 1 : 1~3개월<br>- 3 : 3~6개월<br>- 6 : 6~12개월<br>- 12 : 12개월 이상<br>* 고용형태가 시간선택제(11,21)인 경우에만 적용됨. |
| holidayTp | String |  | (다중검색 가능)<br>근무형태<br>- 1 : 주 5일 근무<br>- 2 : 주 6일 근무<br>- 3 : 토요 격주 휴무<br>- 9 : 기타 |
| coTp | String | 기업형태 택일 | (다중검색 가능)<br>기업형태<br>- 01 : 대기업<br>- 03 : 벤처기업<br>- 04 : 공공기관<br>- 05 : 외국계기업<br>- 09 : 청년친화강소기업 |
| busino | String |  | 사업자등록번호 |
| dtlSmlgntYn | String |  | 강소기업 여부 (Y) |
| workStudyJoinYn | String |  | 일학습병행기업 여부(Y) |
| smlgntCoClcd | String | 기업형태 택일 | 기업형태<br>강소기업 분류코드를 입력합니다.<br>강소기업분류코드 보기 |
| workerCnt | String |  | 사원수<br>- W5 : 5인 미만<br>- W9 : 5인 ~ 10인<br>- W10 : 10인 ~ 30인<br>- W30 : 30인 ~ 50인<br>- W50 : 50인 ~ 100인<br>- W100 : 100인 이상 |
| welfare | String |  | (다중검색 가능)<br>근무편의<br>- 01 : 기숙사<br>- 02 : 통근버스<br>- 04 : 중식제공(또는 중식비 지원)<br>- 11 : 차량유지비<br>- 12 : 교육비 지원<br>- 13 : 자녀학자금 지원<br>- 06 : 주택자금 지원<br>- 09 : 기타 |
| certLic | String |  |  |
| regDate | String |  | - D-0 : 오늘<br>- D-3 : 3일<br>- M-1 : 한달<br>- W-1 : 1주 이내<br>- W-2 : 2주 이내 |
| keyword | String |  | (다중검색 가능)<br>키워드검색 (예)전략영업, 개발자, ERP), UTF-8 인코딩입니다. |
| jobPlcyGb | String |  | --><br><!-- |
| untilEmpWantedYn | String |  | 채용시까지 구인여부 : Y/N |
| minWantedAuthDt | String |  | 최소 구인인증일자 |
| maxWantedAuthDt | String |  | 최대 구인인증일자 |
| scrapInfoYn | String |  | 스크랩구인정보 Y/N |
| empTpGb | String |  | 채용구분<br>- 1 : 상용직<br>- 2 : 일용직<br>* 해당 검색조건 미입력 시 자동으로 상용직 검색 |
| sortOrderBy | String |  | 등록일 기준 정렬방식<br>- DESC : 등록일 상향정렬(defalut)<br>- ASC : 등록일 하향정렬<br>* 해당 검색조건 미입력 시 자동으로 등록일 상향정렬 |
| major | String |  | (다중검색 가능)<br>전공코드를 입력합니다.<br>전공코드 보기<br>* 3차 계열만 입력하세요 |
| foreignLanguage | String |  | (다중검색 가능)<br>외국어코드를 입력합니다.<br>언어코드 보기 |
| comPreferential | String |  | (다중검색 가능)<br>기타 우대조건 (컴퓨터 활용)<br>- 1 : 문서작성<br>- 2 :스프레드시트<br>- 4 : 프리젠테이션<br>- 6 : 회계프로그램<br>- 9 : 기타 |
| pfPreferential | String |  | (다중검색 가능)<br>기타 우대조건 (일반)<br>- 05 : 차량소지자<br>- 07 : 고용촉진장려금대상자<br>- 08 : 보훈취업지원대상자<br>- 09 : 장기복무 제대군인<br>- 10 : 북한이탈주민<br>- 14 : 운전가능자<br>- S : 장애인<br>- B : (준)고령자(50세이상) |
| workHrCd | String |  | (다중검색 가능)<br>근무시간<br>- 1 : 오전(06:00~12:00)<br>- 2 : 오후(12:00~18:00)<br>- 3 : 저녁(18:00~24:00)<br>- 4 : 새벽(00:00~06:00)<br>- 5 : 오전~오후<br>- 6 : 오후~저녁<br>- 7 : 저녁~새벽<br>- 8 : 새벽~오전<br>- 9 : 종일 근무(09:00~18:00)<br>- 99 : 시간협의/무관 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <wantedRoot> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <wanted> |  |  |  |  |
|  |  | <wantedAuthNo> | String | 구인인증번호 | </wantedAuthNo> |
|  |  | <company> | String | 회사명 | </company> |
|  |  | <busino> | String | 사업자등록번호 | </busino> |
|  |  | <indTpNm> | String | 업종 | </indTpNm> |
|  |  | <title> | String | 채용제목 | </title> |
|  |  | <salTpNm> | String | 임금형태 | </salTpNm> |
|  |  | <sal> | String | 급여 | </sal> |
|  |  | <minSal> | String | 최소임금액 | </minSal> |
|  |  | <maxSal> | String | 최대임금액 | </maxSal> |
|  |  | <region> | String | 근무지역 | </region> |
|  |  | <holidayTpNm> | String | 근무형태 | </holidayTpNm> |
|  |  | <minEdubg> | String | 최소학력 | </minEdubg> |
|  |  | <maxEdubg> | String | 최대학력 | </maxEdubg> |
|  |  | <career> | String | 경력 | </career> |
|  |  | <regDt> | String | 등록일자 | </regDt> |
|  |  | <closeDt> | String | 마감일자 | </closeDt> |
|  |  | <infoSvc> | String | 정보제공처<br>- VALIDATION 워크넷 인증 | </infoSvc> |
|  |  | <wantedInfoUrl> | String | 워크넷 채용정보 URL | </wantedInfoUrl> |
|  |  | <wantedMobileInfoUrl> | String | 워크넷 모바일 채용정보 URL | </wantedMobileInfoUrl> |
|  |  | <zipCd> | String | 근무지 우편주소 | </zipCd> |
|  |  | <strtnmCd> | String | 근무지 도로명주소 | </strtnmCd> |
|  |  | <basicAddr> | String | 근무지 기본주소 | </basicAddr> |
|  |  | <detailAddr> | String | 근무지 상세주소 | </detailAddr> |
|  |  | <empTpCd> | Number | 고용형태코드<br>- 10 : 기간의 정함이 없는 근로계약<br>- 11 : 기간의 정함이 없는 근로계약<br>(시간(선택)제)<br>- 20 : 기간의 정함이 있는 근로계약<br>- 21 : 기간의 정함이 있는 근로계약<br>(시간(선택)제)) | </empTpCd> |
|  |  | <jobsCd> | Number | 직종코드 | </jobsCd> |
|  |  | <smodifyDtm> | Number | 최종수정일 | </smodifyDtm> |
|  | </wanted> |  |  |  |  |
| </wantedRoot> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<wantedRoot>
 <total>57887</total>
 <startPage>1</startPage>
 <display>10</display>
 <wanted>
  <wantedAuthNo>KJGF002610150009</wantedAuthNo>
  <company>효자실버요양원</company>
  <busino>7628001375</busino>
  <indTpNm>노인 요양 복지시설 운영업</indTpNm>
  <title>★(2026 중구일자리박람회 직접(현장)참여업체)...</title>
  <salTpNm>시급</salTpNm>
  <sal>10320원</sal>
  <minSal>10320</minSal>
  <maxSal>0</maxSal>
  <region>울산 중구</region>
  <holidayTpNm>주5일근무</holidayTpNm>
  <minEdubg>학력무관</minEdubg>
  <career>관계없음</career>
  <regDt>26-10-15</regDt>
  <closeDt>채용시까지  26-12-14</closeDt>
  <infoSvc>VALIDATION</infoSvc>
  <wantedInfoUrl>https://www.work24.go.kr/wk/a/b/1500/empDetailAuthView.do?wantedAuthNo=KJGF002610150009&amp;infoTypeCd=VALIDATION&amp;infoTypeGroup=tb_workinfoworknet</wantedInfoUrl>
  <wantedMobileInfoUrl>https://m.work24.go.kr/wk/a/b/1500/empDetailAuthView.do?wantedAuthNo=KJGF002610150009&amp;infoTypeCd=VALIDATION&amp;infoTypeGroup=tb_workinfoworknet</wantedMobileInfoUrl>
  <smodifyDtm>202610152107</smodifyDtm>
  <zipCd>44418</zipCd>
  <strtnmCd>311104307286</strtnmCd>
  <basicAddr>울산광역시 중구 성안1길 169</basicAddr>
  <detailAddr>.</detailAddr>
  <empTpCd>10</empTpCd>
  <jobsCd>550101</jobsCd>
 </wanted>
 <wanted>
  <wantedAuthNo>K180312610150049</wantedAuthNo>
  <company>현대케어재가센터</company>
  <busino>1788001639</busino>
  <indTpNm>방문 복지서비스 제공업</indTpNm>
  <title>경기 광주시 목현동 방문요양 요양보호사 구인</title>
  <salTpNm>시급</salTpNm>
  <sal>10320원 ~ 10320원</sal>
  <minSal>10320</minSal>
  <maxSal>10320</maxSal>
  <region>경기 광주시</region>
  <holidayTpNm>주5일근무</holidayTpNm>
  <minEdubg>학력무관</minEdubg>
… (생략)
```


## 채용정보상세

✅ 호출 확인

> 채용정보 API를 이용하여 다양한 카테고리의 구인정보를 구성할 수 있습니다.(예 : 여성,고령자채용정보 등)

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D01.do?authKey=[WORK24_KEY_RECRUIT]&callTp=D&returnType=XML&wantedAuthNo=[구인인증번호]&infoSvc=VALIDATION
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D01.do?authKey=[WORK24_KEY_RECRUIT]&callTp=D&returnType=XML&wantedAuthNo=KJGF002610150009&infoSvc=VALIDATION`

> ⚠️ 우리 직업코드 → 채용 직종코드 연결이 필요하다(공통코드 `dtlGb=2`). 전체 공고 약 5.8만 건(2026-10-16).

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| wantedAuthNo | String | Y | 구인인증번호 |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| infoSvc | String | Y | 정보제공처를 지정합니다.<br>- VALIDATION 워크넷 인증 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <wantedDtl> |  |  |  |  |  |  |
|  | <wantedAuthNo> | String | 구인인증번호 | </wantedAuthNo> |  |  |
|  | <corpInfo> |  |  |  |  |  |
|  |  | <corpNm> | String | 회사명 | </corpNm> |  |
|  |  | <reperNm> | String | 대표자명 | </reperNm> |  |
|  |  | <totPsncnt> | Number | 근로자수 | </totPsncnt> |  |
|  |  | <capitalAmt> | Number | 자본금 | </capitalAmt> |  |
|  |  | <yrSalesAmt> | Number | 연매출액 | </yrSalesAmt> |  |
|  |  | <indTpCdNm> | String | 업종 | </indTpCdNm> |  |
|  |  | <busiCont> | String | 주요사업내용 | </busiCont> |  |
|  |  | <corpAddr> | String | 회사주소 | </corpAddr> |  |
|  |  | <homePg> | String | 회사홈페이지 | </homePg> |  |
|  |  | <busiSize> | String | 회사규모 | </busiSize> |  |
|  | </corpInfo> |  |  |  |  |  |
|  | <wantedInfo> |  |  |  |  |  |
|  |  | <jobsNm> | String | 모집집종 | </jobsNm> |  |
|  |  | <wantedTitle> | String | 구인제목 | </wantedTitle> |  |
|  |  | <relJobsNm> | String | 관련직종 | </relJobsNm> |  |
|  |  | <jobCont> | String | 직무내용 | </jobCont> |  |
|  |  | <receiptCloseDt> | String | 접수마감일 | </receiptCloseDt> |  |
|  |  | <empTpNm> | String | 고용형태 | </empTpNm> |  |
|  |  | <collectPsncnt> | String | 모집인원 | </collectPsncnt> |  |
|  |  | <salTpNm> | String | 임금조건 | </salTpNm> |  |
|  |  | <enterTpNm> | String | 경력조건 | </enterTpNm> |  |
|  |  | <eduNm> | String | 학력 | </eduNm> |  |
|  |  | <forLang> | String | 외국어 | </forLang> |  |
|  |  | <major> | String | 전공 | </major> |  |
|  |  | <certificate> | String | 자격면허 | </certificate> |  |
|  |  | <mltsvcExcHope> | String | 병역특례채용희망 | </mltsvcExcHope> |  |
|  |  | <compAbl> | String | 컴퓨터활용능력 | </compAbl> |  |
|  |  | <pfCond> | String | 우대조건 | </pfCond> |  |
|  |  | <etcPfCond> | String | 기타우대조건 | </etcPfCond> |  |
|  |  | <selMthd> | String | 전형방법 | </selMthd> |  |
|  |  | <rcptMthd> | String | 접수방법 | </rcptMthd> |  |
|  |  | <submitDoc> | String | 제출서류준비물 | </submitDoc> |  |
|  |  | <etcHopeCont> | String | 기타안내 | </etcHopeCont> |  |
|  |  | <workRegion> | String | 근무예정지 | </workRegion> |  |
|  |  | <indArea> | String | 소속산업단지 | </indArea> |  |
|  |  | <nearLine> | String | 인근전철역 | </nearLine> |  |
|  |  | <workdayWorkhrCont> | String | 근무시간/형태 | </workdayWorkhrCont> |  |
|  |  | <fourIns> | String | 연금4대 보험 | </fourIns> |  |
|  |  | <retirepay> | String | 퇴직금 | </retirepay> |  |
|  |  | <etcWelfare> | String | 기타복리후생 | </etcWelfare> |  |
|  |  | <disableCvntl> | String | 장애인편의시설 | </disableCvntl> |  |
|  |  | <attachFileInfo> |  |  |  |  |
|  |  |  | <attachFileUrl> | String | 회사소개 첨부파일 | </attachFileUrl> |
|  |  | </attachFileInfo> |  |  |  |  |
|  |  | <corpAttachList> |  |  |  |  |
|  |  |  | <attachFileUrl> | String | 제출서류 양식첨부 | </attachFileUrl> |
|  |  | </corpAttachList> |  |  |  |  |
|  |  | <keywordList> |  |  |  |  |
|  |  |  | <srchKeywordNm> | String | 키워드 | </srchKeywordNm> |
|  |  | </keywordList> |  |  |  |  |
|  |  | <dtlRecrContUrl> | String | 상세모집내용 URL | </dtlRecrContUrl> |  |
|  |  | <jobsCd> | String | 직종코드 | </jobsCd> |  |
|  |  | <minEdubgIcd> | String | 최소학력코드<br>00 학력코드<br>01 초졸이하<br>02 중졸<br>03 고졸<br>04 대졸(2~3년)<br>05 대졸(4년)<br>06 석사<br>07 박사 | </minEdubgIcd> |  |
|  |  | <maxEdubgIcd> | String | 최대학력코드<br>00 학력무관<br>01 초졸이하<br>02 중졸<br>03 고졸<br>04 대졸(2~3년)<br>05 대졸(4년)<br>06 석사<br>07 박사 | </maxEdubgIcd> |  |
|  |  | <regionCd> | String | 근무지역코드 | </regionCd> |  |
|  |  | <empTpCd> | String | 고용형태코드<br>10 기간의 정함이 없는 근로계약<br>11 기간의 정함이 없는 근로계약<br>(시간(선택)제)<br>20 기간의 정함이 있는 근로계약<br>21 기간의 정함이 있는 근로계약<br>(시간(선택)제)) | </empTpCd> |  |
|  |  | <enterTpCd> | String | 근무형태코드<br>N 신입<br>E 경력<br>Z 관계없음 | </enterTpCd> |  |
|  |  | <salTpCd> | String | 임금형태코드<br>D 일급<br>H 시급<br>M 월급<br>Y 연봉 | </salTpCd> |  |
|  |  | <staAreaRegionCd> | String | 근무지지하철지역코드 | </staAreaRegionCd> |  |
|  |  | <lineCd> | String | 근무지지하철호선코드 | </lineCd> |  |
|  |  | <staNmCd> | String | 근무지지하철역코드 | </staNmCd> |  |
|  |  | <exitNoCd> | String | 근무지지하철역출구번호 | </exitNoCd> |  |
|  |  | <walkDistCd> | String | 근무지지하철출구거리<br>1 10M<br>2 50M<br>3 100M<br>4 150M<br>5 200M<br>6 300M<br>7 500M<br>8 800M<br>9 1KM<br>10 2KM<br>11 3KM | </walkDistCd> |  |
|  | </wantedInfo> |  |  |  |  |  |
|  | <empchargeInfo> |  |  |  |  |  |
|  |  | <empChargerDpt> | String | 채용부서 | </empChargerDpt> |  |
|  |  | <contactTelno> | String | 전화번호 | </contactTelno> |  |
|  |  | <empChargerHp> | String | 채용담당자 휴대전화 | </empChargerHp> |  |
|  |  | <chargerFaxNo> | String | 팩스번호 | </chargerFaxNo> |  |
|  |  | <chargerEmail> | String | 채용담당자 E-Mail | </chargerEmail> |  |
|  | </empchargeInfo> |  |  |  |  |  |
| </wantedDtl> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<wantedDtl>
 <wantedAuthNo>KJGF002610150009</wantedAuthNo>
 <corpInfo>
  <corpNm>효자실버요양원</corpNm>
  <reperNm>***</reperNm>
  <totPsncnt>43 명</totPsncnt>
  <capitalAmt>500000 백만원</capitalAmt>
  <yrSalesAmt>210000 백만원</yrSalesAmt>
  <indTpCdNm>노인 요양 복지시설 운영업</indTpCdNm>
  <busiCont>노인요양원</busiCont>
  <corpAddr>44418 울산광역시 중구 성안1길 169 (성안동)</corpAddr>
  <homePg>uhj.kr</homePg>
  <busiSize/>
 </corpInfo>
 <wantedInfo>
  <jobsNm>요양보호사(노인요양사)(550101)</jobsNm>
  <wantedTitle>★(2026 중구일자리박람회 직접(현장)참여업체)요양원 요양보호사 구인 [중구일자리지원센터]★</wantedTitle>
  <relJobsNm/>
  <jobCont>★(2026 중구일자리박람회 직접(현장)참여업체)요양원 요양보호사 구인 [중구일자리지원센터]★
업체명: 효자실버요양원
▶직종: 요양보호사
▶근무내용: 요양원 요양보호사 업무 (어르신케어)
▶ 근무지 :  중구 성안1길 169
▶ 근무요일 및 시간 :  4조 3교대 /  09:00 ~ 18:00, D: 07:00~16:00, 
                                              E: 13:00 ~ 22:00, N: 22:00 ~ 08:00  
                            근무표에 따라 근무하므로, 주말에 근무 있을 수 있으며, 평균적으로 월 7~ 9회 정도 휴무 있음
▶ 급여 :  시급 10,320원
▶입사지원시 필요사항: 요양보호사 자격증(필수)
▶문의: 중구일자리지원센터☎***-****-****
==================================================
★[2026 중구일자리박람회 직접(현장)참여업체]★
▶ 일시 : 2026.10.21 14:00~16:00
▶ 장소 : 울산 중구청 2층 대회의실(중구 단장골길 1)
▶ 면접 : 당일 현장 면접
▶ 서류 : 이력서 지참(현장에서 작성도 가능)
▶ 문의 : 중구청 일자리지원센터(☎ ***-****-****)</jobCont>
  <receiptCloseDt>채용시까지</receiptCloseDt>
  <empTpNm>기간의 정함이 없는 근로계약/ 파견근로 비희망/ 대체인력채용 비희망</empTpNm>
  <collectPsncnt>3</collectPsncnt>
  <salTpNm>시급10,320원 이상,</salTpNm>
  <enterTpNm>관계없음</enterTpNm>
  <eduNm>학력무관</eduNm>
  <forLang/>
  <major/>
… (생략)
```


## 채용행사

✅ 호출 확인

> 채용행사 API를 활용해서 고용노동부/고용센터의 다양한 채용행사를 구성할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L11.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L11.do?authKey=[WORK24_KEY_RECRUIT]&returnType=XML&callTp=L&startPage=1&display=1
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L11.do?authKey=[WORK24_KEY_RECRUIT]&returnType=XML&callTp=L&startPage=1&display=1`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| srchBgnDt | String | 조회종료일자 입력값이 있을 때 필수입력 | 조회시작일자 기간검색을 합니다.<br>- 조회시작일자 이후에 포함되는 모집공고 등록일을<br>기준으로 기간검색을 합니다. |
| srchEndDt | String | 조회시작일자 입력값이 있을 때 필수입력 | 조회종료일자 기간검색을 합니다.<br>- 조회시작일자 이전에 포함되는 모집공고 등록일을<br>기준으로 기간검색을 합니다. |
| keyword | String |  | 직업명 키워드 검색시 입력합니다.(예: 컨설턴트 , 환경)<br>UTF-8 인코딩입니다. |
| areaCd | String |  | 지역을 선택합니다.<br>- 51 : 서울, 강원<br>- 52 : 부산, 경남<br>- 53 : 대구, 경북<br>- 54 : 경기, 인천<br>- 55 : 광주, 전라, 제주<br>- 56 : 대전, 충청 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <empEventList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <empEvent> |  |  |  |  |
|  |  | <areaCd> | String | 지역코드 | </areaCd> |
|  |  | <area> | String | 지역 | </area> |
|  |  | <eventNo> | String | 채용행사번호 | </eventNo> |
|  |  | <eventNm> | String | 행사명 | </eventNm> |
|  |  | <eventTerm> | String | 행사기간 | </eventTerm> |
|  |  | <startDt> | String | 시작일 | </startDt> |
|  | </empEvent> |  |  |  |  |
| </empEventList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<empEvList>
 <total>1862</total>
 <startPage>1</startPage>
 <display>1</display>
 <empEvent>
  <areaCd>51</areaCd>
  <area>서울/강원 지역</area>
  <eventNo>49351</eventNo>
  <eventNm>[평창군청과 함께하는 일자리 수요데이 IN 영평정] 구인구직 만남의 날 주식회사 태영이엠씨 </eventNm>
  <eventTerm>2026-11-11 ~ 2026-11-11</eventTerm>
  <startDt>2026-11-11</startDt>
 </empEvent>
</empEvList>
```


## 채용행사상세

✅ 호출 확인

> 채용행사 API를 활용해서 고용노동부/고용센터의 다양한 채용행사를 구성할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D11.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D11.do?authKey=[WORK24_KEY_RECRUIT]&returnType=XML&callTp=D&areaCd=[지역코드]&eventNo=[채용행사번호]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D11.do?authKey=[WORK24_KEY_RECRUIT]&returnType=XML&callTp=D&areaCd=51&eventNo=49351`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| areaCd | String | Y | 지역을 선택합니다.<br>- 51 : 서울, 강원<br>- 52 : 부산, 경남<br>- 53 : 대구, 경북<br>- 54 : 경기, 인천<br>- 55 : 광주, 전라, 제주<br>- 56 : 대전, 충청 |
| eventNo | String | Y | 채용행사번호를 입력합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |
|---|---|---|---|---|
| <empEventDtl> |  |  |  |  |
|  | <eventNm> | String | 행사명 | </eventNm> |
|  | <eventTerm> | String | 행사기간 | </eventTerm> |
|  | <eventPlc> | String | 행사장소 | </eventPlc> |
|  | <joinCoWantedInfo> | String | 참여기업구인정보 | </joinCoWantedInfo> |
|  | <subMatter> | String | 부대사항 | </subMatter> |
|  | <inqTelNo> | String | 문의전화 | </inqTelNo> |
|  | <fax> | String | 팩스 | </fax> |
|  | <charger> | String | 담당자 | </charger> |
|  | <email> | String | 이메일 | </email> |
|  | <visitPath> | String | 오시는길 | </visitPath> |
| </empEventDtl> |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<empEventDtl>
 <eventNm>[평창군청과 함께하는 일자리 수요데이 IN 영평정] 구인구직 만남의 날 주식회사 태영이엠씨</eventNm>
 <eventTerm>2026-11-11 ~ 2026-11-11 (14:00 ~ 18:00)</eventTerm>
 <eventPlc>평창군 사회복지센터 2층 미팅룸</eventPlc>
 <joinCoWantedInfo>[평창군청과 함께하는 일자리 수요데이 IN 영평정] 구인구직 만남의 날 주식회사 태영이엠씨 직원 모집 안내
고용노동부 영월고용센터와 평창군청 경제과(평창일자리센터) 함께하는 주식회사  태영이엠씨 채용행사를 개최합니다.
주식회사 태영이엠씨는 탄탄한 기술력과 축적된 노하우를 바탕으로 지역 산업을 선도해 온 우수 기업입니다. 신뢰할 수 있는 안정적인 운영 기반과 직원들의 삶의 질을 높이는 쾌적하고 체계적인 근무환경을 갖추고 있으며, 지속적인 자기계발과 성장의 기회를 제공합니다. 당사와 함께 비전을 공유하고 미래를 이끌어갈 열정적인 인재를 모집하오니 많은 관심과 지원 바랍니다.
주관: 고용노동부 영월고용센터, 평창군청 경제과
협업기관: 평창군 평창일자리센터 
모집직종: 석회석 생산업체 보건관리자1명, 생산</joinCoWantedInfo>
 <subMatter/>
 <inqTelNo>***</inqTelNo>
 <fax>***</fax>
 <charger>유주열</charger>
 <email>***</email>
 <visitPath/>
</empEventDtl>
```


## 공채속보

✅ 호출 확인

> 공채속보 API를 이용하여 빠르게 공채속보를 확인 할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L21.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L21.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10

예제2) 다중검색(다중검색 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L21.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10&empWantedEduCd=[학력코드1|학력코드2]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L21.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| empCoNo | String |  | 채용기업번호 |
| coClcd | String |  | (다중검색 가능)<br>기업 구분코드를 입력합니다.<br>- 10 : 대기업<br>- 20 : 공기업<br>- 30 : 공공기관<br>- 40 : 중견기업<br>- 50 : 외국계기업 |
| empWantedTypeCd | String |  | (다중검색 가능)<br>고용형태를 입력합니다.<br>- 10 : 정규직<br>- 20 : 정규직전환<br>- 30 : 비정규직<br>- 40 : 기간제<br>- 50 : 시간선택제<br>- 60 기타 |
| empWantedCareerCd | String |  | (다중검색 가능)<br>경력구분을 입력합니다.<br>- 10 : 경력무관<br>- 20 : 경력<br>- 30 : 신입<br>- 40 : 인턴 |
| jobsCd | String |  | 직종코드 |
| empWantedTitle | String |  | 채용제목 |
| empWantedEduCd | String |  | (다중검색 가능)<br>학력을 입력합니다.<br>- 10 : 고졸<br>- 20 : 대졸(2~3)<br>- 30 : 대졸<br>- 40 : 석사<br>- 50 : 박사<br>- 99 : 학력무관 |
| sortField | String |  | 등록일 기준 정렬필드<br>- regDt : 등록일<br>- coNm : 회사명<br>* 해당 검색조건 미입력 시 자동으로 등록일 상향정렬 |
| sortOrderBy | String |  | 등록일 기준 정렬방식<br>- desc : 상향정렬(defalut)<br>- asc : 하향정렬<br>* 해당 검색조건 미입력 시 자동으로 등록일 상향정렬 |
| busino | String |  | 사업자번호 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <dhsOpenEmpInfoList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <dhsOpenEmpInfo> |  |  |  |  |
|  |  | <empSeqno> | String | 공개채용공고순번 | </empSeqno> |
|  |  | <empWantedTitle> | String | 채용제목 | </empWantedTitle> |
|  |  | <empBusiNm> | String | 채용업체명 | </empBusiNm> |
|  |  | <coClcdNm> | String | 기업구분명 | </coClcdNm> |
|  |  | <empWantedStdt> | String | 채용시작일자 | </empWantedStdt> |
|  |  | <empWantedEndt> | String | 채용종료일자 | </empWantedEndt> |
|  |  | <empWantedTypeNm> | String | 고용형태 | </empWantedTypeNm> |
|  |  | <regLogImgNm> | String | 채용기업로고 | </regLogImgNm> |
|  |  | <empWantedHomepgDetail> | String | 채용사이트URL | </empWantedHomepgDetail> |
|  |  | <empWantedMobileUrl> | String | 모바일채용사이트URL | </empWantedMobileUrl> |
|  | </dhsOpenEmpInfo> |  |  |  |  |
| </dhsOpenEmpInfoList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<dhsOpenEmpInfoList>
 <total>271</total>
 <startPage>1</startPage>
 <display>10</display>
 <dhsOpenEmpInfo>
  <empSeqno>181397</empSeqno>
  <empWantedTitle>2026년도 [하반기] 신입·경력사원 모집</empWantedTitle>
  <empBusiNm>명인제약</empBusiNm>
  <coClcdNm>중견기업</coClcdNm>
  <empWantedStdt>20261006</empWantedStdt>
  <empWantedEndt>20261029</empWantedEndt>
  <empWantedTypeNm>정규직|정규직전환형|기간제|기타</empWantedTypeNm>
  <regLogImgNm>http://www.work.go.kr/framework/filedownload/getImage.do?filePathName=tqyczLUvysXSEcOVhPgDCq%2FdtJyOJjOH4uhVnoTr9SN9GPI%2BcduCe1xh0G9DHnUFkI1n%2FFIoRFhHLbGOzi%2BY5LVyhW5L8c9dlLOzL%2Frtfn8%3D</regLogImgNm>
  <empWantedHomepgDetail>https://myunginph.co.kr/modules/bbs/bbsView.php?id=27&amp;bbs_id=1&amp;bbs_id2=&amp;page=1&amp;&amp;code=bbs_hirenotice&amp;view_type=&amp;keyword=&amp;field=&amp;xid=</empWantedHomepgDetail>
  <empWantedMobileUrl/>
 </dhsOpenEmpInfo>
 <dhsOpenEmpInfo>
  <empSeqno>181368</empSeqno>
  <empWantedTitle>26년 10월 신입(업무지원직) 직원 채용 공고</empWantedTitle>
  <empBusiNm>분당서울대학교병원</empBusiNm>
  <coClcdNm>공공기관</coClcdNm>
  <empWantedStdt>20261013</empWantedStdt>
  <empWantedEndt>20261022</empWantedEndt>
  <empWantedTypeNm>정규직|정규직전환형|기간제|기타</empWantedTypeNm>
  <regLogImgNm>http://www.work.go.kr/framework/filedownload/getImage.do?filePathName=tqyczLUvysXSEcOVhPgDCpCMguNT7wOfJym9rGlKmmTeRpAlTRqfcDCrvgHMUwGWNLTstUjkuDk5IrERw9XDZjnExaN5wCDIjhtf3gXgZ6s%3D</regLogImgNm>
  <empWantedHomepgDetail>https://snubh.recruiter.co.kr/app/jobnotice/view?systemKindCode=MRS2&amp;jobnoticeSn=268923</empWantedHomepgDetail>
  <empWantedMobileUrl/>
 </dhsOpenEmpInfo>
 <dhsOpenEmpInfo>
  <empSeqno>181367</empSeqno>
  <empWantedTitle>26년 10월 신입(업무지원직_미화) 직원 채용 공고</empWantedTitle>
  <empBusiNm>분당서울대학교병원</empBusiNm>
  <coClcdNm>공공기관</coClcdNm>
  <empWantedStdt>20261013</empWantedStdt>
  <empWantedEndt>20261022</empWantedEndt>
  <empWantedTypeNm>정규직|정규직전환형|기간제|기타</empWantedTypeNm>
  <regLogImgNm>http://www.work.go.kr/framework/filedownload/getImage.do?filePathName=tqyczLUvysXSEcOVhPgDCpCMguNT7wOfJym9rGlKmmTeRpAlTRqfcDCrvgHMUwGWNLTstUjkuDk5IrERw9XDZjnExaN5wCDIjhtf3gXgZ6s%3D</regLogImgNm>
  <empWantedHomepgDetail>https://snubh.recruiter.co.kr/app/jobnotice/view?systemKindCode=MRS2&amp;jobnoticeSn=268922</empWantedHomepgDetail>
  <empWantedMobileUrl/>
 </dhsOpenEmpInfo>
 <dhsOpenEmpInfo>
  <empSeqno>181366</empSeqno>
  <empWantedTitle>26년 10월 신입(업무지원직 장애인) 직원 채용 공고</empWantedTitle>
  <empBusiNm>분당서울대학교병원</empBusiNm>
… (생략)
```


## 공채기업정보

✅ 호출 확인

> 공채기업정보 API를 이용하여 보다 정확한 공채기업정보를 확인 할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L31.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L31.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10

예제2) 다중검색(다중검색 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L31.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10&coClcd=[기업구분코드1|기업구분코드2]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L31.do?authKey=[WORK24_KEY_RECRUIT]&callTp=L&returnType=XML&startPage=1&display=10`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| callTp | String | Y | 호출할 페이지 타입을 반드시 설정합니다.(L: 목록, D:상세) |
| returnType | String | Y | xml 를 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| coClcd | String |  | (다중검색 가능)<br>기업 구분코드를 입력합니다.<br>- 10 : 대기업<br>- 20 : 공기업<br>- 30 : 공공기관<br>- 40 : 중견기업<br>- 50 : 외국계기업 |
| sortField | String |  | 등록일 기준 정렬필드<br>- regDt : 등록일<br>- coNm : 회사명<br>* 해당 검색조건 미입력 시 자동으로 등록일 상향정렬 |
| sortOrderBy | String |  | 등록일 기준 정렬방식<br>- desc : 상향정렬(defalut)<br>- asc : 하향정렬<br>* 해당 검색조건 미입력 시 자동으로 등록일 상향정렬 |
| coNm | String |  | 회사명을 검색합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <dhsOpenEmpHireInfoList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <dhsOpenEmpHireInfo> |  |  |  |  |
|  |  | <empCoNo> | String | 채용기업번호 | </empCoNo> |
|  |  | <coClcdNm> | String | 회사명 | </coClcdNm> |
|  |  | <coClcdNm> | String | 기업구분명 | </coClcdNm> |
|  |  | <busino> | String | 사업자등록번호 | </busino> |
|  |  | <mapCoorY> | String | 좌표:위도 | </mapCoorY> |
|  |  | <mapCoorX> | String | 좌표:경도 | </mapCoorX> |
|  |  | <regLogImgNm> | String | 채용기업로고 | </regLogImgNm> |
|  |  | <coIntroSummaryCont> | String | 기업소개요약 | </coIntroSummaryCont> |
|  |  | <coIntroCont> | String | 기업소개상세 | </coIntroCont> |
|  |  | <homepg> | String | 홈페이지 | </homepg> |
|  |  | <mainBusiCont> | String | 주요사업 | </mainBusiCont> |
|  | </dhsOpenEmpHireInfo> |  |  |  |  |
| </dhsOpenEmpHireInfoList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<dhsOpenEmpHireInfoList>
 <total>6239</total>
 <startPage>1</startPage>
 <display>10</display>
 <dhsOpenEmpHireInfo>
  <coClcdNm>중견기업</coClcdNm>
  <regLogImgNm>http://www.work.go.kr/framework/filedownload/getImage.do?filePathName=tqyczLUvysXSEcOVhPgDCgapojT%2Bl8%2F2b9Vt1oFRucAouzToV5nDPQaCSGsLdebzQ2tI%2FSZsCZ3VTROpxab7IDSDsKy%2BS2HCIaq9ro01tNE%3D</regLogImgNm>
  <empCoNo>E000026603</empCoNo>
  <coNm>테크로스</coNm>
  <busino>3478102279</busino>
  <mapCoorY>37.5092142224363</mapCoorY>
  <mapCoorX>127.055870422541</mapCoorX>
  <coIntroSummaryCont>글로벌 1위 선박평형수 처리장치 제조업체</coIntroSummaryCont>
  <coIntroCont>글로벌 1위 선박평형수 처리장치 제조업체 테크로스는, 2006년 세계 최초로 전기분해 수처리에 대한 원천 기술을 바탕으로 선박평형수 처리장치 개발에 성공한 이후, 글로벌 1위에 걸맞는 제품력은 물론, 제품 효율성의 극대화를 통한 비용 절감까지 실현한 뛰어난 제품을 선보입니다.
급변하는 환경산업에서 고객의 니즈를 포착하여 사업의 기회로 만드는 선구자 정신, 한 발 앞서 시장과 환경에 적합한 솔루션을 도출하며, 신속한 서비스 네트워크로 보여주는 민첩함, 업계 최다로 축적된 다양한 경험들이 증명하는 제품과 서비스에 대한 믿음까지. 테크로스는 최상의 기술과 솔루션을 통해 인류와 환경에 기여해 나가고자 합니다.</coIntroCont>
  <homepg>https://techcross.com/techcross/index.php</homepg>
  <mainBusiCont/>
 </dhsOpenEmpHireInfo>
 <dhsOpenEmpHireInfo>
  <coClcdNm>공공기관</coClcdNm>
  <regLogImgNm>http://www.work.go.kr/framework/filedownload/getImage.do?filePathName=tqyczLUvysXSEcOVhPgDCjVy41cCSUXACV8%2FdF4rZgdDhjV16J6%2BhjBH9Zjkvd4uBfsafjYZYhZsnNF91qhFqYt46D5a8SU5fK3k8NUlZgA%3D</regLogImgNm>
  <empCoNo>E000026585</empCoNo>
  <coNm>해양수산부</coNm>
  <busino>3078304929</busino>
  <mapCoorY>36.5046142125476</mapCoorY>
  <mapCoorX>127.265021678919</mapCoorX>
  <coIntroSummaryCont>해양수산에 관한 사무를 관장하는 중앙행정기관</coIntroSummaryCont>
  <coIntroCont>우리의 바다는 무한한 가능성을 품은 생명의 보고이자, 국가 경제의 역동성을 이끄는 핵심 무대입니다.
우리의 바다에서 대한민국의 새로운 도약을 이끌어내고 국민의 삶을 든든하게 뒷받침하기 위해, 해양수산부는 다섯 가지 정책을 힘차게 추진하겠습니다.
첫째, 수산업과 어촌의 경쟁력을 높이겠습니다.
둘째, 해운항만산업의 AI 도입과 탈탄소화를 선도하겠습니다.
셋째, 건강하고 생명감 넘치는 바다환경을 조성하겠습니다.
넷째, 어디에서든 모두가 안전한 바다를 만들겠습니다.
다섯째, 해양수도권 육성으로 균형발전의 성공모델을 만들겠습니다.
바다가 있어서 행복하고 풍요로운 나라, 해양강국, 해양부국 대한민국을 향해 힘차게 나아가겠습니다.</coIntroCont>
  <homepg>https://www.mof.go.kr/</homepg>
  <mainBusiCont/>
 </dhsOpenEmpHireInfo>
 <dhsOpenEmpHireInfo>
  <coClcdNm/>
  <regLogImgNm>http://www.work.go.kr/framework/filedownload/getImage.do?filePathName=tqyczLUvysXSEcOVhPgDCnq2b5HwyVNMBPQPQfncmuCHKjRTtvrZw3EJi6ZRJ0%2F9JQzg0ZsHOxkUE4vxYjxvreSGu2VtGwpsN2jkeMi70Wc%3D</regLogImgNm>
  <empCoNo>E000026583</empCoNo>
  <coNm>한전씨에스씨</coNm>
  <busino>6608101547</busino>
… (생략)
```


## 임금체불 명단공개 사업주 여부

✅ 호출 확인

> 유·무료직업소개사업자와 직업정보제공사업자가 「직업안정법」 제25조에 따라 구인기업의 체불사업주 여부를 구직자가 알 수 있도록 게재하기 위해 API를 제공합니다.
> 체불사업주의 명단에 대한 문의는 고용노동부 근로감독기획과에 문의하여 주시기 바랍니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L41.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L41.do?authKey=[WORK24_KEY_RECRUIT]&returnType=XML&brno=[사업자등록번호]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L41.do?authKey=[WORK24_KEY_RECRUIT]&returnType=XML&brno=7628001375`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| brno | String | Y | 사업자등록번호 |
| bzmn | String | N | 사업장관리번호 |
| aplDe | String | N | 성립일자 |
| rpstPnm | String | N | 대표자명 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |
|---|---|---|---|---|
| <jdgnList> |  |  |  |  |
|  | <lnkReqNo> | Number | 연계요청번호 | </lnkReqNo> |
|  | <lnkSucsYn> | String | 연계성공여부(성공시 : Y, 실패시 : N) | </lnkSucsYn> |
|  | <brno> | String | 사업자등록번호 | </brno> |
|  | <bzmn> | String | 사업장관리번호 | </bzmn> |
|  | <judgReltYn> | String | 임금체불 명단공개 사업주 여부 (Y : 대상, N : 미대상) | </judgReltYn> |
|  | <errMsgCd> | String | 오류코드<br>ERR0001 : API KEY 오류<br>ERR0010 : 신고서 연계오류 - 필수값 누락 [항목명]<br>ERR0011 : 심사결과에 대한 오류 메시지<br>예) 시스템 장애 - 사업장 정보 없음<br></errMsgCd> |  |
|  | <errMsg> | String | 오류내용 | </errMsg> |
| </jdgnList> |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<jdgnList>
 <lnkReqNo>1994504975</lnkReqNo>
 <errMsgCd/>
 <judgReltYn>N</judgReltYn>
 <errMsg/>
 <lnkSucsYn>Y</lnkSucsYn>
 <brno>7628001375</brno>
 <bzmnNo/>
</jdgnList>
```
