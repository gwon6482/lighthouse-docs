# 고용24 Open API — 직업정보 3종 명세

> 출처: https://m.work24.go.kr/cm/e/a/0110/selectOpenApiSvcInfo.do (서비스 소개 및 신청 → 직업정보)
> 크롤링·정리: 2026-09-26. **정식 API 등록 완료 상태.**
>
> ⚠️ 원문 페이지는 명세를 AJAX(`selectOpenApiSvcInfoPost.do`)로 불러오고, 세 API가
> **한 페이지의 탭 3개**로 되어 있다. curl 로는 본문이 안 잡히므로 브라우저 렌더링이 필요하다.

## 공통

| 항목 | 값 |
|---|---|
| 호스트 | `https://www.work24.go.kr` (명세 페이지는 `m.work24.go.kr`, **호출은 `www`**) |
| 인증 | 쿼리스트링 `authKey` |
| 응답 형식 | `returnType=XML` — **3종 모두 XML 고정** |
| 요청 방식 | GET |

> ⚠️ `returnType` 에 JSON 을 지정하는 선택지가 명세에 없다. 3종 모두 "XML 을 반드시 지정" 이다
> (직업사전만 소문자 `xml` 로 적혀 있다 — 대소문자 실동작은 확인 필요).
> 기존 API 응답 규약이 `{success, data, error}` JSON 이므로 **변환 계층이 필요하다.**

> ⚠️ 요청 Parameter 에 대괄호 `[]` 는 제외하고 넣는다(명세 주의문).

---

## 1. 직업정보 (목록/검색)

**요청 URL**
```
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L01.do
```

**안내**: 직업정보 키워드 검색, 조건별 검색, 분류별 카테고리 정보로 직업명을 검색할 수 있고,
직업상세에 대한 정보를 직업정보 API를 통해 이용할 수 있습니다.

**사용예제**
```
...callOpenApiSvcInfo212L01.do?authKey=[인증키]&returnType=XML&target=JOBCD
```

**요청 Parameters**

| 항목 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `authKey` | String | Y | 인증키 |
| `returnType` | String | Y | `XML` 고정 |
| `target` | String | Y | `JOBCD` 고정 |
| `srchType` | String | N | 검색타입(미입력 시 `K`). **단일 검색만 가능**<br>`K`: 키워드 검색 / `C`: 조건별 검색(연봉·전망) |
| `keyword` | String | N | `srchType=K` 일 때만. 직업명 키워드. UTF-8 인코딩 |
| `avgSal` | String | N | `srchType=C` 일 때만. 미입력 시 전체<br>`10` 3천만원 미만 / `20` 3~4천 / `30` 4~5천 / `40` 5천만원 이상 |
| `prospect` | String | N | `srchType=C` 일 때만. 미입력 시 전체<br>`1` 증가 / `2` 다소 증가 / `3` 유지 / `4` 다소 감소 / `5` 감소 |

> ⚠️ **페이지네이션 파라미터가 없다**(`startPage`/`display` 미제공). 직업사전(3번)에는 있다.
> 전체 목록을 받으면 몇 건이 오는지는 실호출로 확인해야 한다.

**출력결과 (XML)**
```xml
<jobsList>
  <total>Number 총건수</total>
  <jobList>
    <jobClcd>String 직업분류코드</jobClcd>
    <jobClcdNM>String 직업분류명</jobClcdNM>
    <jobCd>String 직업코드</jobCd>
    <jobNm>String 직업명</jobNm>
  </jobList>
</jobsList>
```

---

## 2. 직업정보 상세

**요청 URL**
```
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212D01.do
```

**사용예제**
```
...callOpenApiSvcInfo212D01.do?authKey=[인증키]&returnType=XML&target=JOBDTL&jobGb=1&jobCd=[직업코드]&dtlGb=[상세구분]
```

**요청 Parameters**

| 항목 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `authKey` | String | Y | 인증키 |
| `returnType` | String | Y | `XML` 고정 |
| `target` | String | Y | `JOBDTL` 고정 |
| `jobGb` | String | Y | 직업구분코드 — `1` 고정 |
| `jobCd` | String | Y | 직업코드 (1번 API 결과의 `jobCd`) |
| `dtlGb` | String | Y | 상세구분<br>`1` 요약 / `2` 하는 일 / `3` 교육·자격·훈련 / `4` 임금·직업만족도·전망 / `5` 능력·지식·환경 / `6` 성격·흥미·가치관 / `7` 업무활동 |

> ⚠️ `dtlGb` 가 **필수**다. 한 번 호출로 전체 상세가 오지 않고 **섹션별로 7번 호출**해야
> 전부 모인다. 진로백과 상세 화면을 채우려면 호출 수를 미리 계산할 것.

**출력결과 (XML)**
```xml
<jobSum>
  <jobCd>String 직업코드</jobCd>
  <jobLrclNm>String 직업 대분류명</jobLrclNm>
  <jobMdclNm>String 직업 중분류명</jobMdclNm>
  <jobSmclNm>String 직업 소분류명</jobSmclNm>
  <jobSum>String 하는일</jobSum>
  <way>String 되는길</way>
  <relMajorList>
    <majorCd>String 관련전공코드</majorCd>
    <majorNm>String 관련전공명</majorNm>
  </relMajorList>
  <relCertList>
    <certNm>String 관련자격증명</certNm>
  </relCertList>
  <sal>String 임금</sal>
  <jobSatis>직업만족도</jobSatis>
  <jobProspect>String 일자리전망</jobProspect>
  <jobStatus>String 일자리현황</jobStatus>
  <jobAbil>String 업무수행능력</jobAbil>
  <knowldg>String 지식</knowldg>
  <jobEnv>String 업무환경</jobEnv>
  <jobChr>String 성격</jobChr>
  <jobIntrst>String 흥미</jobIntrst>
  <jobVals>String 직업가치관</jobVals>
  <jobActvImprtncs>String 업무활동 중요도</jobActvImprtncs>
  <jobActvLvls>String 업무활동 수준</jobActvLvls>
  <relJobList>
    <jobCd>String 관련직업코드</jobCd>
    <jobNm>String 관련직업명</jobNm>
  </relJobList>
</jobSum>
```

> 💡 `jobAbil`·`knowldg`·`jobEnv`·`jobChr`·`jobIntrst`·`jobVals` 는 우리 자기이해 검사
> (T1 성격 / T21 재능 / T22 흥미 / T23 가치관 / T3 업무환경)와 **개념이 겹친다.**
> 매칭 점수 산출에 쓸 수 있는지 검토 가치가 있다.

---

## 3. 직업사전

**요청 URL**
```
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo212L50.do
```

**안내**: 직업사전 API를 활용하여 한국고용정보원이 발간한 직업사전을 직접 구성할 수 있습니다.

**사용예제**
```
예제1) ...212L50.do?authKey=[인증키]&returnType=XML&target=dJobCD&startPage=1&display=10&srchType=K&keyword=[키워드]
예제2) ...212L50.do?authKey=[인증키]&returnType=XML&target=dJobCD&startPage=1&display=10&srchType=EL|WS|SY&eduLevel=[교육수준]&workStrong=[직업강도]&skillYear=[숙련기간]
```

**요청 Parameters**

| 항목 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `authKey` | String | Y | 인증키 |
| `returnType` | String | Y | `xml` 고정 |
| `startPage` | Number | Y | 기본 1, **최대 1000** |
| `display` | Number | Y | 출력건수. 기본 10, **최대 100** |
| `target` | String | Y | `dJobCD` 고정 |
| `srchType` | String | Y | 검색타입 (아래) |
| `keyword` | String | K일 때 필수 | 직업명 키워드. UTF-8. 유사·관련 직업 검색 가능 |
| `empJobCl` | String | E일 때 필수 | 한국고용직업분류 |
| `stdJobCl` | String | J일 때 필수 | 한국표준직업분류 |
| `stdIndCl` | String | I일 때 필수 | 한국표준산업분류 |
| `eduLevel` | String | EL일 때 필수 | `1` 6년 이하(초졸 이하) / `2` 6~9년(중졸) / `3` 9~12년(고졸) / `4` 12~14년(전문대졸) / `5` 14~16년(대졸) / `6` 16년 초과(대학원 이상) |
| `workStrong` | String | WS일 때 필수 | `SW` 아주 가벼운 / `LW` 가벼운 / `MW` 보통 / `HW` 힘든 / `VH` 아주 힘든 |
| `skillYear` | String | SY일 때 필수 | `1` 약간의 시범 / `2` 시범후 30일 이하 / `3` 1~3개월 / `4` 3~6개월 / `5` 6개월~1년 / `6` 1~2년 / `7` 2~4년 / `8` 4~10년 / `9` 10년 초과 |
| `workPlace` | String | WP일 때 필수 | `I` 실내 / `O` 실외 / `B` 실내·외 |
| `workFunc1` | String | F1일 때 필수 | 직무기능(자료) `0` 종합 / `1` 조정 / `2` 분석 / `3` 수집 / `4` 계산 / `5` 기록 / `6` 비교 |
| `workFunc2` | String | F2일 때 필수 | 직무기능(사람) `0` 자문 / `1` 협의 / `2` 교육 / `3` 감독 / `4` 오락제공 / `5` 설득 / `6` 말하기-신호 / `7` 서비스 제공 / `8` 관련없음 |
| `workFunc3` | String | F3일 때 필수 | 직무기능(사물) `0` 설치 / `1` 정밀작업 / `2` 제어조작 / `3` 조작운전 / `4` 수동조작 / `5` 유지 / `6` 투입-인출 / `7` 단순작업 / `8` 관련없음 |

**`srchType` 값**

| 단일 검색만 가능 | 다중 검색 가능 (`|` 로 결합, 예 `EL\|WS\|SY`) |
|---|---|
| `K` 키워드(keyword)<br>`E` 한국고용직업분류(empJobCl)<br>`J` 한국표준직업분류(stdJobCl)<br>`I` 한국표준산업분류(stdIndCl) | `EL` 교육수준 / `WS` 직업강도 / `SY` 숙련기간 / `WP` 작업장소<br>`F1`·`F2`·`F3` 직무기능(자료·사람·사물) |

> ⚠️ `K`/`E`/`J`/`I` 는 **단일만** 되고, `EL`/`WS`/`SY`/`WP`/`F1~F3` 만 `|` 로 묶을 수 있다.
> 섞어 쓰면 안 된다.

**출력결과 (XML)**
```xml
<dJobsList>
  <total>총건수</total>
  <startPage></startPage>
  <display></display>
  <dJobList>
    <dJobCd>직업사전 세세분류 코드</dJobCd>
    <dJobCdSeq>직업사전 세세분류 순번</dJobCdSeq>
    <dJobNm>세세분류 직업명</dJobNm>
  </dJobList>
</dJobsList>
```

> ⚠️ 직업사전은 **코드와 이름만** 돌려준다. 상세 본문을 주는 엔드포인트는 이 명세에 없다.
> 직업사전 본문이 필요하면 별도 API 를 더 찾아야 한다.

---

## 우리 데이터와의 관계 (착수 전 확인할 것)

현재 직업 데이터는 `job_data.job_info` 에 **537건**이 적재돼 있고, 출처는 워크넷 진로백과다
(`lighthouse-api/docs/job_code_structure.md` — 한국표준직업분류 기반 6자리 코드.
⚠️ 그 파일은 `docs/` 가 gitignore 대상이라 **로컬 전용**이다. 레포에서 찾지 말 것).

- [ ] **`jobCd` 체계가 우리 `jobCode` 6자리와 같은지** 실호출로 대조. 같으면 매핑이 필요 없다
- [ ] 1번 API 가 전체 목록을 주는지, 준다면 몇 건인지(페이지네이션 파라미터가 없다)
- [ ] `dtlGb` 7개를 다 불러야 우리 상세 화면이 채워지는지 — 화면별로 필요한 섹션만 고를 것
- [ ] 진로백과의 **준비과정·채용 탭**은 현재 FE 하드코딩(013601·024101 2건)이다.
      `way`(되는길)·`relCertList`·`relMajorList` 로 준비과정 탭을 대체할 수 있는지 검토
- [ ] 인증키 호출 한도·과금 정책 확인(명세 페이지에 없음 → 신청 화면/약관 확인 필요)
