# 고용24 Open API — 채용정보 2종 명세

> 조사: 2026-10-05 (Playwright 렌더링, 사용자 제공 URL 2개)
> ⚠️ **아직 우리 인증키로 신청/실호출하지 않았다.** 아래는 **명세 읽기**까지다.
>    직업정보 때처럼 명세와 실제가 어긋날 수 있다(예: 인증 실패가 HTTP 200 으로 온 것).

## 조사 방법 (다음 사람을 위해)

명세를 **AJAX 로 불러온다.** `curl` 로는 사이트 공통 메뉴만 잡히고 본문이 없다.
→ **Playwright 렌더링 + 스냅샷 파싱**이 필요하다.

⚠️ 파라미터 표에 **빈 셀**이 있다. 셀을 평탄화해 4개씩 묶으면 **줄이 밀려 엉킨다**
   (실제로 `region String occupation String` 처럼 깨졌다). **행 단위로** 파싱할 것.

⚠️ 사용자가 준 URL 2개는 **같은 페이지의 탭**이다. 탭을 클릭해야 다른 명세가 뜨고,
   그때 URL 의 `apiSvcId` 가 바뀐다.

---

## 1. 채용정보목록

```
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do
```

예제:
```
?authKey=[인증키]&callTp=L&returnType=XML&startPage=1&display=10
?authKey=[인증키]&callTp=L&returnType=XML&startPage=1&display=10&occupation=[직종코드1|직종코드2]
```

### 🔑 직업정보 API 와 다른 점

| | 직업정보(212) | 채용정보(210) |
|---|---|---|
| 호출 경로 | `cm/openApi/call/...212L01` | `cm/openApi/call/wk/...210L01` ← **`/wk/` 가 붙는다** |
| 페이지네이션 | **없음**(전량 한 번에) | **있음** `startPage`(≤1000) · `display`(≤100) |
| 검색 파라미터 | `srchType` 등 소수 | **38개** |
| 데이터 성격 | 연 1회 조사(정적) | **수시 변동**(마감일 있음) |

### 요청 Parameters (38개 중 필수 5)

| 항목 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `authKey` | String | **Y** | 인증키 |
| `callTp` | String | **Y** | `L`: 목록 / `D`: 상세 |
| `returnType` | String | **Y** | xml 고정 |
| `startPage` | Number | **Y** | 기본 1, **최대 1000** |
| `display` | Number | **Y** | 기본 10, **최대 100** |

선택 파라미터(조건부 필수 포함):

```
region  occupation  salTp  minPay*  maxPay*  education  career
minCareerM*  maxCareerM*  pref  subway  empTp  termContractMmcnt
holidayTp  coTp†  busino  dtlSmlgntYn  workStudyJoinYn  smlgntCoClcd†
workerCnt  welfare  certLic  regDate  keyword  untilEmpWantedYn
minWantedAuthDt  maxWantedAuthDt  empTpGb  sortOrderBy  major
foreignLanguage  comPreferential  pfPreferential  workHrCd
```
- `*` = 임금형태(`salTp`) / 경력코드(`career`) 를 넣으면 **필수**가 된다
- `†` `coTp` · `smlgntCoClcd` 는 "기업형태 택일"
- `occupation` 은 `|` 로 다중 지정 (직업정보 API 의 `srchType` 결합과 같은 방식)
- `keyword` 는 다중검색 가능, **UTF-8 인코딩**

### 출력결과

```
<wantedRoot>
  <total>       Number  총건수
  <startPage>   Number
  <display>     Number
  <wanted>                      ← 반복
    wantedAuthNo  구인인증번호     ← **상세 조회의 키**
    company       회사명
    title         채용제목
    salTpNm       임금형태      sal / minSal / maxSal
    region        근무지역      holidayTpNm  근무형태
    minEdubg / maxEdubg  최소·최대학력
    career        경력
    regDt         등록일자      closeDt  마감일자
    busino · indTpNm · infoSvc
    wantedInfoUrl · wantedMobileInfoUrl
    zipCd · strtnmCd · basicAddr · detailAddr
    empTpCd · jobsCd · smodifyDtm
```

---

## 2. 채용정보상세

```
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210D01.do
?authKey=[인증키]&callTp=D&returnType=XML&wantedAuthNo=[구인인증번호]&infoSvc=VALIDATION
```

### 요청 Parameters (전부 필수)

| 항목 | 타입 | 설명 |
|---|---|---|
| `authKey` | String | 인증키 |
| `wantedAuthNo` | String | **구인인증번호** (목록에서 받는다) |
| `callTp` | String | `D` |
| `returnType` | String | xml |

> ℹ️ 예제에는 `infoSvc=VALIDATION` 이 있는데 **파라미터 표에는 없다.**
>   실호출 때 필요 여부를 확인할 것.

### 출력결과 — `<wantedDtl>`

세 묶음이다.

**`<corpInfo>`** 회사
```
corpNm 회사명 · reperNm 대표자명 · totPsncnt 근로자수 · capitalAmt 자본금
yrSalesAmt 연매출액 · indTpCdNm 업종 · busiCont 주요사업내용
corpAddr 회사주소 · homePg 회사홈페이지 · busiSize 회사규모
```

**`<wantedInfo>`** 채용 (가장 큰 묶음)
```
jobsNm 모집직종 · wantedTitle 구인제목 · relJobsNm 관련직종 · jobCont 직무내용
receiptCloseDt 접수마감일 · empTpNm 고용형태 · collectPsncnt 모집인원
salTpNm 임금조건 · enterTpNm 경력조건 · eduNm 학력 · forLang 외국어
major 전공 · certificate 자격면허 · mltsvcExcHope 병역특례채용희망
compAbl 컴퓨터활용능력 · pfCond 우대조건 · etcPfCond 기타우대조건
selMthd 전형방법 · rcptMthd 접수방법 · submitDoc 제출서류준비물
etcHopeCont 기타안내 · workRegion 근무예정지 · nearLine 인근전철역
workdayWorkhrCont 근무시간/형태 · fourIns 연금4대보험 · retirepay 퇴직금
etcWelfare 기타복리후생 · disableCvntl 장애인편의시설
dtlRecrContUrl 상세모집내용 URL · jobsCd 직종코드 · regionCd 근무지역코드
minEdubgIcd · maxEdubgIcd · empTpCd · enterTpCd · salTpCd · walkDistCd
staAreaRegionCd · lineCd · staNmCd · exitNoCd  (지하철 관련)
  <attachFileInfo><attachFileUrl>  회사소개 첨부파일
  <corpAttachList><attachFileUrl>  제출서류 양식첨부
  <keywordList><srchKeywordNm>     키워드
```

**`<empchargeInfo>`** 담당자
```
empChargerDpt 채용부서 · contactTelno 전화번호 · chargerFaxNo 팩스번호
```

---

## 🚨 이용 조건 (명세에 명시돼 있다 — 설계에 반영해야 한다)

1. **출처 표기 의무**
   > "상세페이지 하단에 자료 출처를 아래 이미지로 반드시 명기하여 주시기 바랍니다."
   > "본 자료는 고용노동부 고용24(www.work24.go.kr)에서 제공된 정보이며, 무단복제 및 배포를 금지합니다."

2. **상세 링크 의무** — 채용정보 상세페이지의 '채용정보 제공사이트로 이동' 링크는
   **반드시 워크넷 해당 채용정보 화면**으로 가야 한다.
   ```
   웹   https://www.work24.go.kr/wk/a/b/1500/empDetailAuthView.do?wantedAuthNo=[구인인증번호]&infoTypeCd=VALIDATION&infoTypeGroup=tb_workinfoworknet
   모바일 https://m.work24.go.kr/wk/a/b/1500/empDetailAuthView.do?wantedAuthNo=[구인인증번호]&infoTypeCd=VALIDATION&infoTypeGroup=tb_workinfoworknet
   ```

⚠️ **"무단복제 및 배포 금지"가 직업정보와 다른 무게로 걸린다.**
   직업정보는 연 1회 조사자료라 전량 덤프가 자연스러웠지만, 채용정보는
   **수시 변동 + 복제 금지 + 출처·링크 의무**다. 전량 덤프를 기본으로 두면 안 된다.
   → 캐시 전략은 **짧은 TTL** 또는 **실시간 프록시** 쪽을 먼저 검토할 것.

---

## 착수 전 확인할 것

- [ ] 이 2종 **서비스 신청·인증키 발급** (직업정보 키와 별개일 가능성 — 서비스별 키 체계다)
- [ ] `infoSvc` 파라미터 실제 필요 여부 (예제엔 있고 표엔 없다)
- [ ] `jobsCd`(직종코드) 체계가 우리 `jobCode`(KECO 6자리)와 어떻게 대응되나
      — 직업정보는 `K`+9자리였고 **또 다를 수 있다.** 매핑이 필요한지부터 실호출로 확인
- [ ] 호출 한도 (직업정보도 공개돼 있지 않았다)
- [ ] `display` 최대 100 / `startPage` 최대 1000 → **이론상 최대 10만건**. 실제 총건수 확인
- [ ] 마감일(`closeDt`) 지난 공고 처리 — 숨길지, 표시할지
