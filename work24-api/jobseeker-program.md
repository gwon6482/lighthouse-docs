# 고용24 구직자취업역량 강화프로그램 API

> 인증키: `WORK24_KEY_JOBSEEKER_PROGRAM` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16


## 구직자취업역량 강화프로그램

✅ 호출 확인

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo217L01.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo217L01.do?authKey=[WORK24_KEY_JOBSEEKER_PROGRAM]&returnType=XML&startPage=1&display=10
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo217L01.do?authKey=[WORK24_KEY_JOBSEEKER_PROGRAM]&returnType=XML&startPage=1&display=10`

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| startPage | Number | Y | 기본값 1, 최대 1000 검색 시작위치를 지정할 수 있습니다.<br>최대 1000 까지 가능합니다. |
| display | Number | Y | 출력건수, 기본값 10, 최대 100 까지 가능합니다. |
| pgmStdt | String | N | 과정시작일<br>*미입력 시 오늘 일자로 조회됩니다. |
| topOrgCd | String | N | 고용센터 관할 청 코드(코드표 1 depth)<br>고용지청/센터코드 보기 |
| orgCd | String | N | 고용센터 코드(코드표 2 depth)<br>고용지청/센터코드 보기 |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |  |
|---|---|---|---|---|---|
| <empPgmSchdInviteList> |  |  |  |  |  |
|  | <total> | Number | 총건수 | </total> |  |
|  | <startPage> | Number | 기본값 1, 최대 1000 검색의 시작위치를 지정 할 수 있습니다. | </startPage> |  |
|  | <display> | Number | 출력건수, 기본값 10 | </display> |  |
|  | <empPgmSchdInvite> |  |  |  |  |
|  |  | <orgNm> | String | 고용센터명 | </orgNm> |
|  |  | <pgmNm> | String | 프로그램명 | </pgmNm> |
|  |  | <pgmSubNm> | String | 과정명 | </pgmSubNm> |
|  |  | <pgmTarget> | String | 대상자 | </pgmTarget> |
|  |  | <pgmStdt> | String | 과정시작일( YYYYMMDD ) | </pgmStdt> |
|  |  | <pgmEndt> | String | 과정종료일( YYYYMMDD ) | </pgmEndt> |
|  |  | <openTimeClcd> | String | 오전, 오후 구분<br>- 오전 : 1<br>- 오후 : 2 | </openTimeClcd> |
|  |  | <openTime> | String | 시작시간( HH:MM )<br>- 24시 표현식이 아닌 12시 표현 방식으로 제공됩니다<br>- ex) 오전 10시 > 10:00<br>- 오후 10시 > 10:00 | </openTime> |
|  |  | <operationTime> | String | 운영시간 | </operationTime> |
|  |  | <openPlcCont> | String | 개최장소 | </openPlcCont> |
|  | </smallGiant> |  |  |  |  |
| </empPgmSchdInviteList> |  |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<empPgmSchdInviteList>
 <total>33</total>
 <startPage>1</startPage>
 <display>10</display>
 <empPgmSchdInvite>
  <orgNm>서울북부고용센터</orgNm>
  <pgmNm>취업특강</pgmNm>
  <pgmSubNm>[서울북부 유스온] SK하이닉스로 읽는 AI시대 채용 변화의 이해와 취업성공 전략</pgmSubNm>
  <pgmTarget>[대면] (~34세이하 청년층) 국민취업지원제도 참여자, 실업급여 수급자, 일반구직자 등</pgmTarget>
  <pgmStdt>20261015</pgmStdt>
  <pgmEndt>20261015</pgmEndt>
  <openTimeClcd>2</openTimeClcd>
  <openTime>02:00</openTime>
  <operationTime>2</operationTime>
  <openPlcCont>서울북부고용센터 2층 교육장</openPlcCont>
 </empPgmSchdInvite>
 <empPgmSchdInvite>
  <orgNm>서울북부고용센터</orgNm>
  <pgmNm>[HI+_구직기술형] 고졸 청년층 취업지원</pgmNm>
  <pgmSubNm>[HI+] Hi+(고졸 청년층 취업지원 프로그램)_구직기술형</pgmSubNm>
  <pgmTarget>(이대병설 미디어고) 직업계고 재학생</pgmTarget>
  <pgmStdt>20261015</pgmStdt>
  <pgmEndt>20261016</pgmEndt>
  <openTimeClcd>1</openTimeClcd>
  <openTime>08:20</openTime>
  <operationTime>12</operationTime>
  <openPlcCont>이대병설 미디어고 </openPlcCont>
 </empPgmSchdInvite>
 <empPgmSchdInvite>
  <orgNm>수원고용센터</orgNm>
  <pgmNm>취업특강</pgmNm>
  <pgmSubNm>취업성공을 부르는 시간관리 </pgmSubNm>
  <pgmTarget>일반구직자, 실업급여수급자 및 취업성공패키지, 국민취업지원제도 참여자 등</pgmTarget>
  <pgmStdt>20261015</pgmStdt>
  <pgmEndt>20261015</pgmEndt>
  <openTimeClcd>2</openTimeClcd>
  <openTime>02:00</openTime>
  <operationTime>2</operationTime>
  <openPlcCont>수원고용센터 별관(삼성생명고객프라자 )2층  직업진로지도팀 단기프로그램실</openPlcCont>
 </empPgmSchdInvite>
 <empPgmSchdInvite>
  <orgNm>대구고용센터</orgNm>
  <pgmNm>취업특강</pgmNm>
  <pgmSubNm>슬기로운 직업훈련 선택</pgmSubNm>
… (생략)
```
