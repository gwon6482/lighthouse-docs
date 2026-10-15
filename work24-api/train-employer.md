# 고용24 사업주훈련 훈련과정 API

> 인증키: `WORK24_KEY_TRAIN_EMPLOYER` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16


## 목록

✅ 호출 확인

> 사업주훈련을 대상으로 실시하는 훈련과정 API를 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311L01.do`

**예제**

```
예제1) 기본 조건만을 이용하여 검색하는 경우
https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311L01.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=1&pageNum=1&pageSize=20&srchTraStDt=20141001&srchTraEndDt=20141231&sort=ASC&sortCol=2

예제2) 선택조건을 추가하는 경우
https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311L01.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=1&pageNum=1&pageSize=20&srchTraStDt=20141001&srchTraEndDt=20141231&srchTraArea1=[훈련지역 대분류]&sort=ASC&sortCol=2
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311L01.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=1&pageNum=1&pageSize=20&srchTraStDt=20261001&srchTraEndDt=20261231&sort=ASC&sortCol=2`

> ⚠️ 예제 조회기간이 2014년 — 01 과 같음.

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |  |  |
|---|---|---|---|---|---|
| authKey | string | 필수 | 인증키(ex : authKey=[인증키] |  |  |
| returnType | string | 필수 | 리턴타입:XML, JSON 중 하나로 지정합니다.(ex : returnType=XML) |  |  |
| outType | string | 필수 | 구분자 : 출력형태('1':리스트 '2':상세) |  |  |
| pageNum | string | 필수 | 시작페이지. 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다. 최대 1000 까지 가능. |  |  |
| pageSize | string | 필수 | 페이지당 출력건수, 기본값 10, 최대 100까지 가능. |  |  |
| srchTraArea1 | string | 선택 | 훈련지역 대분류 | '11' : 서울, '12' : 전남광주, '26' : 부산, '27' : 대구, '28' : 인천, '30' : 대전, '31' : 울산, '36' : 세종, '41' : 경기, '43' : 충북, '44' : 충남, '45' : 전북, '47' : 경북, '48' : 경남, '50' : 제주, '51' : 강원<br>* 전체일 경우에는 옵션 파라미터의 미등록처리 |  |
| srchTraArea2 | string | 선택 | 훈련지역 중분류<br>훈련지역 대분류에 따라 내용이 달라짐 | * 해당 코드관련 API 제공<br>* 훈련지역 대분류 제외시 이항목도 옵션 파라미터에 미등록처리 |  |
| srchNcs1 | string | 선택 | NCS 직종 1차분류 코드 | '01' : 사업관리<br>'02' : 경영/회계/사무<br>'03' : 금융/보험<br>'04' : 교육/자연/사회과학<br>'05' : 법률/경찰/소방/교도/국방<br>'06' : 보건/의료<br>'07' : 사회복지/종교<br>'08' : 문화/예술/디자인/방송<br>'09' : 운전/운송<br>'10' : 영업판매<br>'11' : 경비/청소<br>'12' : 이용/숙박/여행/오락/스포츠 | '13' : 음식서비스<br>'14' : 건설<br>'15' : 기계<br>'16' : 재료<br>'17' : 화학/바이오<br>'18' : 섬유/의복<br>'19' : 전기/전자<br>'20' : 정보통신<br>'21' : 식품가공<br>'22' : 인쇄/목재/가구/공예<br>'23' : 환경/에너지/안전<br>'24' : 농림어업 |
| * 전체일 경우에는 옵션 파라미터의 미등록처리 |  |  |  |  |  |
| srchNcs2 | string | 선택 | NCS 직종 2차분류 코드<br>상위분류에 따라 내용이 달라짐 | * 해당 코드관련 API 제공<br>* 전체일 경우에는 옵션 파라미터의 미등록처리 |  |
| srchNcs3 | string | 선택 | NCS 직종 3차분류 코드<br>상위분류에 따라 내용이 달라짐 | * 해당 코드관련 API 제공<br>* 전체일 경우에는 옵션 파라미터의 미등록처리 |  |
| srchNcs4 | string | 선택 | NCS 직종 4차분류 코드<br>상위분류에 따라 내용이 달라짐 | * 해당 코드관련 API 제공<br>* 전체일 경우에는 옵션 파라미터의 미등록처리 |  |
| crseTracseSe | string | 선택 | 훈련유형 | 'C0041T' : 일반직무훈련<br>'C0041B' : 기업직업훈련카드<br>'C0041N' : 고숙련신기술훈련<br>'C0041A' : HRD 아카이브<br>* 전체일 경우에는 옵션 파라미터의 미등록처리 |  |
| srchTraGbn | string | 선택 | 훈련구분코드 | 'M1001' : 일반과정<br>'M1005' : 인터넷과정<br>'M1010' : 혼합과정(BL)<br>'M1011' : 스마트혼합훈련<br>* 전체일 경우에는 옵션 파라미터의 미등록처리 |  |
| srchTraType | string | 선택 | 훈련종류(훈련구분에 따라 세부내용이 변경됨) | '* 해당 코드관련 API 제공<br>* 훈련지역 대분류 제외시 이항목도 옵션 파라미터에 미등록처리<br>* 인터넷과정과 혼합과정의 경우 세부항목이 없음 |  |
| srchTraStDt | string | 필수 | 훈련시작일 From |  |  |
| srchTraEndDt | string | 필수 | 훈련시작일 To |  |  |
| srchTraProcessNm | string | 선택 | 훈련과정명 |  |  |
| srchTraOrganNm | string | 선택 | 훈련기관명 |  |  |
| sort | string | 필수 | 정렬방법 | "ASC",<br>"DESC" |  |
| sortCol | string | 필수 | 정렬컬럼 | 훈련기관명 : 1<br>훈련시작일 : 2<br>훈련기관 직종별 취업률 : 3<br>만족도점수 : 5<br>훈련종료일 : 6 |  |

### 출력 항목

| 출력항목 | 타입 | 설명 | 비고 |  |  |  |
|---|---|---|---|---|---|---|
| <HRDNet> |  | XML문서의 최상위 노드입니다. |  |  |  |  |
|  | <scn_cnt> | string | 검색된 총 건수 | </scn_cnt> |  |  |
|  | <pageNum> | string | 현재페이지 | </pageNum> |  |  |
|  | <pageSize> | string | 페이지당 출력개수, 페이지당 표현될 자료의 개수 | </pageSize> |  |  |
|  | <srchList> | string |  |  |  |  |
|  |  | <scn_list> |  |  |  |  |
|  |  |  | ADDRESS | string | 주소 | <address></address> |
|  |  |  | CERTIFICATE | string | 자격증 | <certificate></certificate> |
|  |  |  | CONTENTS | string | 컨텐츠 | <contents></contents> |
|  |  |  | COURSE_MAN | string | 수강비 | <courseMan></courseMan> |
|  |  |  | GRADE | string | 등급 | <grade></grade> |
|  |  |  | IMG_GUBUN | string | 제목 아이콘 구분 | <imgGubun></imgGubun> |
|  |  |  | INST_CD | string | 훈련기관 코드 | <instCd></instCd> |
|  |  |  | NCS_CD | string | NCS 코드 | <ncsCd></ncsCd> |
|  |  |  | REAL_MAN | string | 실제 훈련비 | <realMan></realMan> |
|  |  |  | REG_COURSE_MAN | string | 수강신청 인원 | <regCourseMan></regCourseMan> |
|  |  |  | SUB_TITLE | string | 부 제목 | <subTitle></subTitle> |
|  |  |  | SUB_TITLE_LINK | string | 부 제목 링크 | <subTitleLink></subTitleLink> |
|  |  |  | SUPER_VISER | string | 주관부처 | <superViser></superViser> |
|  |  |  | TEL_NO | string | 전화번호 | <telNo></telNo> |
|  |  |  | TITLE | string | 제목 | <title></title> |
|  |  |  | TITLE_ICON | string | 제목 아이콘 | <titleIcon></titleIcon> |
|  |  |  | TITLE_LINK | string | 제목 링크 | <titleLink></titleLink> |
|  |  |  | TRA_END_DATE | string | 훈련종료일자 | <traEndDate></traEndDate> |
|  |  |  | TRA_START_DATE | string | 훈련시작일자 | <traStartDate></traStartDate> |
|  |  |  | TRAIN_TARGET | string | 훈련대상 | <trainTarget></trainTarget> |
|  |  |  | TRAIN_TARGET_CD | string | 훈련구분 | <trainTargetCd></trainTargetCd> |
|  |  |  | TRAINST_CST_ID | string | 훈련기관ID | <trainstCstId></trainstCstId> |
|  |  |  | TRNG_AREA_CD | string | 지역코드(중분류) | <trngAreaCd></trngAreaCd> |
|  |  |  | TRPR_DEGR | string | 훈련과정 순차 | <trprDegr></trprDegr> |
|  |  |  | TRPR_ID | string | 훈련과정ID | <trprId></trprId> |
|  |  |  | YARD_MAN | string | 정원 | <yardMan></yardMan> |
|  |  | </scn_list> |  |  |  |  |
|  | </srchList> |  |  |  |  |  |
| </HRDNet> |  |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<HRDNet>
 <pageNum>1</pageNum>
 <pageSize>20</pageSize>
 <scn_cnt>41708</scn_cnt>
 <srchList>
  <scn_list>
   <address>서울 금천구</address>
   <certificate/>
   <contents/>
   <courseMan>0</courseMan>
   <grade/>
   <instCd>201800920</instCd>
   <ncsCd>20010702</ncsCd>
   <realMan>117040</realMan>
   <regCourseMan>22</regCourseMan>
   <subTitle>주식회사 엘캠퍼스</subTitle>
   <subTitleLink>https://www.work24.go.kr/hr/a/a/3200/selectTrainInstitution2.do?tracseId=ABA20263001243702&amp;tracseTme=10&amp;crseTracseSe=C0041&amp;trainstCstmrId=500034233608</subTitleLink>
   <telNo>***</telNo>
   <title>[AI기초] AI x 오피스 자동화: 보안 걱정 ZERO, 나만의 AI 솔루션</title>
   <titleIcon>&lt;img src="hrd.work24.go.kr/images/ico_system5.gif" alt="사업주훈련" title="사업주훈련" /&gt;</titleIcon>
   <titleLink>https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl2.do?tracseId=ABA20263001243702&amp;tracseTme=10&amp;crseTracseSe=C0041&amp;trainstCstmrId=500034233608</titleLink>
   <traEndDate>2026-10-30</traEndDate>
   <traStartDate>2026-10-01</traStartDate>
   <trainTarget>기업직업훈련카드</trainTarget>
   <trainTargetCd>C0041B</trainTargetCd>
   <trainstCstId>500034233608</trainstCstId>
   <trngAreaCd>11545</trngAreaCd>
   <trprDegr>10</trprDegr>
   <trprId>ABA20263001243702</trprId>
   <yardMan>380</yardMan>
  </scn_list>
  <scn_list>
   <address>서울 강남구</address>
   <certificate/>
   <contents/>
   <courseMan>0</courseMan>
   <grade/>
   <instCd>200400743</instCd>
   <ncsCd>20010105</ncsCd>
   <realMan>148000</realMan>
   <regCourseMan>1</regCourseMan>
   <subTitle>멀티캠퍼스 원격평생교육원</subTitle>
   <subTitleLink>https://www.work24.go.kr/hr/a/a/3200/selectTrainInstitution2.do?tracseId=ABA20263001375359&amp;tracseTme=2&amp;crseTracseSe=C0041&amp;trainstCstmrId=500020037820</subTitleLink>
   <telNo>***</telNo>
… (생략)
```


## 과정/기관정보

✅ 호출 확인

> 사업주훈련을 대상으로 실시하는 훈련과정 API를 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311D01.do`

**예제**

```
예제1) 기본 조건만을 이용하여 검색하는 경우
https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311D01.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=2&srchTrprId=[훈련과정ID]&srchTrprDegr=[훈련회차]&srchTorgId=[훈련기관ID]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311D01.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=2&srchTrprId=AIG20250000530869&srchTrprDegr=6&srchTorgId=500044302572`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |  |
|---|---|---|---|---|
| authKey | string | 필수 | 인증키(ex : authKey=[인증키] |  |
| returnType | string | 필수 | 리턴타입:XML, JSON 중 하나로 지정합니다. | (ex : returnType=XML) |
| outType | string | 필수 | 구분자 : 출력형태('1':리스트 '2':상세) | '2' |
| srchTrprId | string | 필수 | 훈련과정 ID |  |
| srchTrprDegr | string | 필수 | 훈련과정 회차 |  |
| srchTorgId | string | 필수 | 훈련기관 ID |  |

### 출력 항목

| 출력항목 | 타입 | 설명 | 비고 |  |  |
|---|---|---|---|---|---|
| <HRDNet> |  | XML문서의 최상위 노드입니다. |  |  |  |
|  | <inst_base_info> |  | 훈련기관 기초정보 |  |  |
|  |  | ADDR1 | string | 주소지 | <addr1></addr1> |
|  |  | ADDR2 | string | 상세주소 | <addr2></addr2> |
|  |  | FILE_PATH | string | 파일경로 | <filePath></filePath> |
|  |  | HP_ADDR | string | 홈페이지 주소 | <hpAddr></hpAddr> |
|  |  | INO_NM | string | 훈련기관명 | <inoNm></inoNm> |
|  |  | INST_INO | string | 훈련기관 코드 | <instIno></instIno> |
|  |  | INST_PER_TRCO | string | 실제 훈련비 | <instPerTrco></instPerTrco> |
|  |  | NCS_CD | string | NCS 코드 | <ncsCd></ncsCd> |
|  |  | NCS_NM | string | NCS 명 | <ncsNm></ncsNm> |
|  |  | NCS_YN | string | NCS 여부 | <ncsYn></ncsYn> |
|  |  | NON_NCS_COURSE_PRCTTQ_TIME | string | 비 NCS교과 실기시간 | <nonNcsCoursePrcttqTime></nonNcsCoursePrcttqTime> |
|  |  | NON_NCS_COURSE_THEORY_TIME | string | 비 NCS교과 이론시간 | <nonNcsCourseTheoryTime></nonNcsCourseTheoryTime> |
|  |  | P_FILE_NAME | string | 로고 파일명 | <pFileName></pFileName> |
|  |  | PER_TRCO | string | 정부지원금 | <perTrco></perTrco> |
|  |  | TORG_PAR_GRAD | string | 평가등급 | <torgParGrad></torgParGrad> |
|  |  | TR_DCNT | string | 총 훈련일수 | <trDcnt></trDcnt> |
|  |  | TR_GBN | string | 'HRD'로 일정한 값 조회 | <trGbn></trGbn> |
|  |  | TRAING_MTH_CD | string | 훈련방법코드 | <traingMthCd></traingMthCd> |
|  |  | TRPR_CHAP | string | 담당자명 | <trprChap></trprChap> |
|  |  | TRPR_CHAP_EMAIL | string | 담당자 이메일 | <trprChapEmail></trprChapEmail> |
|  |  | TRPR_CHAP_TEL | string | 담당자 전화번호 | <trprChapTel></trprChapTel> |
|  |  | TRPR_DEGR | string | 훈련과정 회차 | <trprDegr></trprDegr> |
|  |  | TRPR_GBN | string | 훈련과정 구분 | <trprGbn></trprGbn> |
|  |  | TRPR_ID | string | 훈련과정ID | <trprId></trprId> |
|  |  | TRPR_NM | string | 훈련과정명 | <trprNm></trprNm> |
|  |  | TRPR_TARGET | string | 주요 훈련과정 구분 | <trprTarget></trprTarget> |
|  |  | TRPR_TARGET_NM | string | 주요 훈련과정 구분명 | <trprTargetNm></trprTargetNm> |
|  |  | TRTM | string | 총 훈련시간 | <trtm></trtm> |
|  |  | ZIP_CD | string | 우편번호 | <zipCd></zipCd> |
|  | </inst_base_info> |  | 훈련기관 기초정보 |  |  |
|  | <inst_detail_info> |  | 훈련기관 상세정보 |  |  |
|  |  | GOV_BUSI_NM | string | 훈련분야명 | <govBusiNm></govBusiNm> |
|  |  | TORG_GBN_CD | string | 훈련종류 | <torgGbnCd></torgGbnCd> |
|  |  | TOT_TRAING_DYCT | string | 훈련일수 | <totTraingDyct></totTraingDyct> |
|  |  | TOT_TRAING_TIME | string | 훈련시간 | <totTraingTime></totTraingTime> |
|  |  | TOTAL_CRS_AT | string | 수강료 | <totalCrsAt></totalCrsAt> |
|  |  | TGCR_GNRL_TRNE_OWEP_ALLT | string | 본인부담액 | <tgcrGnrlTrneOwepAllt></tgcrGnrlTrneOwepAllt> |
|  |  | TRPR_DEGR | string | 훈련과정 회차 | <trprDegr></trprDegr> |
|  |  | TRPR_ID | string | 훈련과정코드 | <trprId></trprId> |
|  |  | TRPR_NM | string | 훈련과정명 | <trprNm></trprNm> |
|  | </inst_detail_info> |  | 훈련기관 상세정보 |  |  |
|  | <inst_facility_info> |  | 시설 상세 정보 |  |  |
|  |  | <inst_facility_info_list> | 시설 정보 리스트 |  |  |
|  |  | CHANGE_CSTMR_ID | string | 변동훈련기관ID | <changeCstmrId></changeCstmrId> |
|  |  | CSTMR_ID | string | 훈련기관ID | <cstmrId></cstmrId> |
|  |  | CSTRMR_NM | string | 등록훈련기관 | <cstmrNm></cstmrNm> |
|  |  | FCLTY_AR_CN | string | 시설 면적(㎡) | <fcltyArCn></fcltyArCn> |
|  |  | HOLD_QY | string | 시설 수 | <holdQy></holdQy> |
|  |  | OCU_ACPTN_CN | string | 인원 수(명) | <ocuAcptnNmprCn></ocuAcptnNmprCn> |
|  |  | TRAFCLTY_NM | string | 시설명 | <trafcltyNm></trafcltyNm> |
|  |  | </inst_facility_info_list> | 시설 정보 리스트 |  |  |
|  | </inst_facility_info> |  | 시설 상세정보 |  |  |
|  | <inst_eqnm_info> |  | 장비 상세 정보 |  |  |
|  |  | <inst_eqnm_info_list> | 장비 정보 리스트 |  |  |
|  |  | CSTMR_NM | string | 등록훈련기관 | <cstmrNm></cstmrNm> |
|  |  | EQPMN_NM | string | 장비명 | <eqpmnNm></eqpmnNm> |
|  |  | HOLD_QY | string | 보유 수량 | <holdQy></holdQy> |
|  |  | </inst_eqnm_info_list> | 장비 정보 리스트 |  |  |
|  | </inst_eqnm_info> |  | 장비 상세 정보 |  |  |
| </HRDNet> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<HRDNet>
 <inst_base_info/>
 <inst_detail_info/>
 <inst_facility_info>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>9.1</fcltyArCn>
   <ocuAcptnNmprCn>2</ocuAcptnNmprCn>
   <trafcltyNm>상담실</trafcltyNm>
  </inst_facility_info_list>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>31.9</fcltyArCn>
   <ocuAcptnNmprCn>10</ocuAcptnNmprCn>
   <trafcltyNm>실습실1</trafcltyNm>
  </inst_facility_info_list>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>37.4</fcltyArCn>
   <ocuAcptnNmprCn>10</ocuAcptnNmprCn>
   <trafcltyNm>실습실2</trafcltyNm>
  </inst_facility_info_list>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>10.5</fcltyArCn>
   <ocuAcptnNmprCn>4</ocuAcptnNmprCn>
   <trafcltyNm>휴게실</trafcltyNm>
  </inst_facility_info_list>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>2.2</fcltyArCn>
   <ocuAcptnNmprCn>1</ocuAcptnNmprCn>
   <trafcltyNm>물품보관실</trafcltyNm>
  </inst_facility_info_list>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>9.2</fcltyArCn>
   <ocuAcptnNmprCn>1</ocuAcptnNmprCn>
   <trafcltyNm>탕비실</trafcltyNm>
  </inst_facility_info_list>
  <inst_facility_info_list>
   <cstmrNm>비아트 플로리스트학원</cstmrNm>
   <fcltyArCn>43</fcltyArCn>
   <ocuAcptnNmprCn>10</ocuAcptnNmprCn>
… (생략)
```


## 훈련일정

✅ 호출 확인

> 사업주훈련을 대상으로 실시하는 훈련과정 API를 이용할 수 있습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311D02.do`

**예제**

```
예제1) 기본 조건만을 이용하여 검색하는 경우
http://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311D02.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=2&srchTrprId=[훈련과정ID]&srchTrprDegr=[훈련회차]&srchTorgId=[훈련기관ID]
```

**실제로 호출한 주소**: `http://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo311D02.do?authKey=[WORK24_KEY_TRAIN_EMPLOYER]&returnType=XML&outType=2&srchTrprId=AIG20250000530869&srchTrprDegr=6&srchTorgId=500044302572`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |  |
|---|---|---|---|---|
| authKey | string | 필수 | 인증키(ex : authKey=[인증키] |  |
| returnType | string | 필수 | 리턴타입:XML, JSON 중 하나로 지정합니다. | (ex : returnType=XML) |
| outType | string | 필수 | 구분자 : 출력형태('1':리스트 '2':상세) | '2' |
| srchTrprId | string | 필수 | 훈련과정 ID |  |
| srchTrprDegr | string | 선택 | 훈련과정 회차(입력하지 않으면 모든 회차가 조회됩니다.) |  |

### 출력 항목

| 출력항목 | 타입 | 설명 | 비고 |  |  |
|---|---|---|---|---|---|
| <HRDNet> |  | XML문서의 최상위 노드입니다. |  |  |  |
|  | <scn_list> | string |  |  |  |
|  |  | EI_EMPL_RATE_3 | string | 3개월 고용보험 취업률(%)<br>'A‘ : 개설예정<br>‘B‘ : 진행중<br>‘C‘ : 미실시<br>‘D‘ : 수료자 없음<br>숫자 : 취업률 | <eiEmplRate3></eiEmplRate3> |
|  |  | EI_EMPL_CNT_3 | string | 3개월 고용보험 취업인원 | <eiEmplCnt3></eiEmplCnt3> |
|  |  | EI_EMPL_RATE_6 | string | 6개월 고용보험 취업률(%)<br>'A‘ : 개설예정<br>‘B‘ : 진행중<br>‘C‘ : 미실시<br>‘D‘ : 수료자 없음<br>숫자 : 취업률 | <eiEmplRate6></eiEmplRate6> |
|  |  | EI_EMPL_CNT_6 | string | 6개월 고용보험 취업인원 | <eiEmplCnt6></eiEmplCnt6> |
|  |  | HRD_EMPL_RATE_6 | string | 6개월 고용보험 미가입 취업률(%)<br>'A‘ : 개설예정<br>‘B‘ : 진행중<br>‘C‘ : 미실시<br>‘D‘ : 수료자 없음<br>숫자 : 취업률 | <hrdEmplRate6></hrdEmplRate6> |
|  |  | HRD_EMPL_CNT_6 | string | 6개월 고용보험 미가입 취업인원 | <hrdEmplCnt6></hrdEmplCnt6> |
|  |  | INST_INO | string | 훈련기관 코드 | <instIno></instIno> |
|  |  | TOT_FXNUM | string | 모집인원(정원) | <totFxnum></totFxnum> |
|  |  | TOT_PAR_MKS | string | 수강인원 | <totParMks></totParMks> |
|  |  | TOT_TRCO | string | 총 훈련비 | <totTrco></totTrco> |
|  |  | TOT_TRP_CNT | string | 수강(신청) 인원 | <totTrpCnt></totTrpCnt> |
|  |  | TR_END_DT | string | 훈련종료일 | <trEndDt></trEndDt> |
|  |  | TR_STA_DT | string | 훈련 시작일 | <trStaDt></trStaDt> |
|  |  | TRPR_DEGR | string | 훈련과정 회차 | <trprDegr></trprDegr> |
|  |  | TRPR_ID | string | 훈련과정ID | <trprId></trprId> |
|  |  | TRPR_NM | string | 훈련과정명 | <trprNm></trprNm> |
|  | </scn_list> | string |  |  |  |
| </HRDNet> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<HRDNet/>
```
