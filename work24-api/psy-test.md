# 고용24 심리검사 API

> 인증키: `WORK24_KEY_PSY_TEST` (lighthouse-api/.env — **값은 문서에 적지 않는다**)  
> 원본 명세: 고용24 OPEN-API 소개 · 수집·호출 검증 2026-10-16

**우리 서비스에서**: ⚠️ 개인 검사 결과 조회 — 우리 서비스와 무관, 호출하지 않았다.


## 심리검사결과

⏭️ skipped(개인 검사 결과)

> 심리검사API를 이용하여 개인별 심리검사 결과를 조회할 수 있습니다.
> 개인정보처리방침에 따라 직업심리검사 회원은 회원정책(보유기간 2년)/비회원(API등)은 보유기간 7일 이후에 개인정보가 삭제됨을 알려드리며 그 이후에는 검사이력은 조회되지 않습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214L01.do`

**예제**

```
예제1) 검사자 키값 검색
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214L01.do?authKey=[WORK24_KEY_PSY_TEST]&returnType=XML&userInfo3=[기관코드]&userInfo4=[피검사자키값]
```

> ⚠️ 개인(피검사자)의 심리검사 결과 조회. 기관코드·피검사자 키가 필요하고 우리 서비스와 무관 — **호출하지 않았다**.

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| userInfo3 | Sting | Y | 제공받은 학교코드를 입력합니다. |
| userInfo4 | String | Y | 학번을 입력합니다. |
| psyExamCd | String |  | 심리검사코드를 입력합니다.<br>- 9 : 성인용 직업심리검사<br>- Q : 성인용 직업적성검사(개정)<br>- S : 직업선호도검사 S형<br>- W : 창업적성검사<br>- A : 직업가치관검사<br>- H : 청소년직업흥미검사<br>- 13 : 청소년직업흥미검사(개정)<br>- R : 대학전공흥미검사<br>- Z : 고등학교적성검사<br>- L : 직업선호도검사L형<br>- P : 구직준비도검사<br>- O : 대학생 진로준비도검사 |

### 출력 항목 (총 659개 — 앞 120개만)

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
| <examRsltRoot> |  |  |  |  |  |  |
|  | <adultJobAptExam> |  | 성인용 직업심리검사 |  |  |  |
|  |  | <total> |  | 조회건수 | </total> |  |
|  |  | <examRslt> |  |  |  |  |
|  |  |  | <psyExamCd> | String | 심리검사코드 | </psyExamCd> |
|  |  |  | <psyExamNo> | String | 심리검사번호 | </psyExamNo> |
|  |  |  | <examDt> | String | 검사일자 (YYYYMMDD) | </examDt> |
|  |  |  | <score1> | String | 언어력 점수 | </score1> |
|  |  |  | <score2> | String | 수리력 점수 | </score2> |
|  |  |  | <score3> | String | 추리력 점수 | </score3> |
|  |  |  | <score4> | String | 공간지각력 점수 | </score4> |
|  |  |  | <score5> | String | 사물지각력 점수 | </score5> |
|  |  |  | <score6> | String | 상황판단력 점수 | </score6> |
|  |  |  | <score7> | String | 기계능력 점수 | </score7> |
|  |  |  | <score8> | String | 집중력 점수 | </score8> |
|  |  |  | <score9> | String | 색채지각력 점수 | </score9> |
|  |  |  | <score10> | String | 사고유창력 점수 | </score10> |
|  |  |  | <score11> | String | 협응능력 점수 | </score11> |
|  |  |  | <jobInfo1> | String | 최적합 직업군 | </jobInfo1> |
|  |  |  | <jobInfo2> | String | 적합 직업군 | </jobInfo2> |
|  |  | </examRslt> |  |  |  |  |
|  | </adultJobAptExam> |  |  |  |  |  |
|  | <adultJobAptReviseExam> |  | 성인용 직업적성검사(개정) |  |  |  |
|  |  | <total> |  | 조회건수 | </total> |  |
|  |  | <examRslt> |  |  |  |  |
|  |  |  | <psyExamCd> | String | 심리검사코드 | </psyExamCd> |
|  |  |  | <psyExamNo> | String | 심리검사번호 | </psyExamNo> |
|  |  |  | <examDt> | String | 검사일자 (YYYYMMDD) | </examDt> |
|  |  |  | <vocaOsco> | String | 어휘력 원점수 | </vocaOsco> |
|  |  |  | <clrmixOsco> | String | 색혼합 원점수 | </clrmixOsco> |
|  |  |  | <numprginf1Osco> | String | 수열추리1 원점수 | </numprginf1Osco> |
|  |  |  | <thngsprcpOsco> | String | 사물지각 원점수 | </thngsprcpOsco> |
|  |  |  | <calclOsco> | String | 계산능력 원점수 | </calclOsco> |
|  |  |  | <asbpieceOsco> | String | 조각맞추기 원점수 | </asbpieceOsco> |
|  |  |  | <datacomOsco> | String | 자료해석력 원점수 | </datacomOsco> |
|  |  |  | <asbpitureOsco> | String | 그림맞추기_원점수 | </asbpitureOsco> |
|  |  |  | <readcOsco> | String | 문장독해력 원점수 | </readcOsco> |
|  |  |  | <cncntOsco> | String | 집중력 원점수 | </cncntOsco> |
|  |  |  | <numprginf2Osco> | String | 수열추리2 원점수 | </numprginf2Osco> |
|  |  |  | <clrgbnOsco> | String | 색구분 원점수 | </clrgbnOsco> |
|  |  |  | <prbsolablOsco> | String | 문제해결능력 원점수 | </prbsolablOsco> |
|  |  |  | <figinfOsco> | String | 도형추리력 원점수 | </figinfOsco> |
|  |  |  | <situjdgablOsco> | String | 상황판단능력 원점수 | </situjdgablOsco> |
|  |  |  | <mechanablOsco> | String | 기계능력 원점수 | </mechanablOsco> |
|  |  |  | <thinkflntOsco> | String | 사고유창력 원점수 | </thinkflntOsco> |
|  |  |  | <vocaSsco> | String | 어휘력 표준점수 | </vocaSsco> |
|  |  |  | <clrmixSsco> | String | 색혼합 표준점수 | </clrmixSsco> |
|  |  |  | <numprginf1Ssco> | String | 수열추리1 표준점수 | </numprginf1Ssco> |
|  |  |  | <thngsprcpSsco> | String | 사물지각 표준점수 | </thngsprcpSsco> |
|  |  |  | <calclSsco> | String | 계산능력 표준점수 | </calclSsco> |
|  |  |  | <asbpieceSsco> | String | 조각맞추기 표준점수 | </asbpieceSsco> |
|  |  |  | <datacomSsco> | String | 자료해석력 표준점수 | </datacomSsco> |
|  |  |  | <asbpitureSsco> | String | 그림맞추기 표준점수 | </asbpitureSsco> |
|  |  |  | <readcSsco> | String | 문장독해력 표준점수 | </readcSsco> |
|  |  |  | <cncntSsco> | String | 집중력 표준점수 | </cncntSsco> |
|  |  |  | <numprginf2Ssco> | String | 수열추리2 표준점수 | </numprginf2Ssco> |
|  |  |  | <clrgbnSsco> | String | 색구분 표준점수 | </clrgbnSsco> |
|  |  |  | <prbsolablSsco> | String | 문제해결능력 표준점수 | </prbsolablSsco> |
|  |  |  | <figinfSsco> | String | 도형추리력 표준점수 | </figinfSsco> |
|  |  |  | <situjdgablSsco> | String | 상황판단능력 표준점수 | </situjdgablSsco> |
|  |  |  | <mechanablSsco> | String | 기계능력 표준점수 | </mechanablSsco> |
|  |  |  | <thinkflntSsco> | String | 사고유창력 표준점수 | </thinkflntSsco> |
|  |  |  | <topLangablOsco> | String | 적성요인 언어력 원점수 | </topLangablOsco> |
|  |  |  | <topMathablOsco> | String | 적성요인 수리력 원점수 | </topMathablOsco> |
|  |  |  | <topPrginfablOsco> | String | 적성요인 추리력 원점수 | </topPrginfablOsco> |
|  |  |  | <topSpatprcpablOsco> | String | 적성요인 공간지각력 원점수 | </topSpatprcpablOsco> |
|  |  |  | <topThngsprcpablOsco> | String | 적성요인 사물지각력 원점수 | </topThngsprcpablOsco> |
|  |  |  | <topSitujdgablOsco> | String | 적성요인 상황판단력 원점수 | </topSitujdgablOsco> |
|  |  |  | <topMechanablOsco> | String | 적성요인 기계능력 원점수 | </topMechanablOsco> |
|  |  |  | <topCncntablOsco> | String | 적성요인 집중력 원점수 | </topCncntablOsco> |
|  |  |  | <topClrprcpablOsco> | String | 적성요인 색채지각력 원점수 | </topClrprcpablOsco> |
|  |  |  | <topPrbsolablOsco> | String | 적성요인 문제해결능력 원점수 | </topPrbsolablOsco> |
|  |  |  | <topThinkflntablOsco> | String | 적성요인 사고유창력 원점수 | </topThinkflntablOsco> |
|  |  |  | <topLangablSsco> | String | 적성요인 언어력 표준점수 | </topLangablSsco> |
|  |  |  | <topMathablSsco> | String | 적성요인 수리력 표준점수 | </topMathablSsco> |
|  |  |  | <topPrginfablSsco> | String | 적성요인 추리력 표준점수 | </topPrginfablSsco> |
|  |  |  | <topSpatprcpablSsco> | String | 적성요인 공간지각력 표준점수 | </topSpatprcpablSsco> |
|  |  |  | <topThngsprcpablSsco> | String | 적성요인 사물지각력 표준점수 | </topThngsprcpablSsco> |
|  |  |  | <topSitujdgablSsco> | String | 적성요인 상황판단력 표준점수 | </topSitujdgablSsco> |
|  |  |  | <topMechanablSsco> | String | 적성요인 기계능력 표준점수 | </topMechanablSsco> |
|  |  |  | <topCncntablSsco> | String | 적성요인 집중력 표준점수 | </topCncntablSsco> |
|  |  |  | <topClrprcpablSsco> | String | 적성요인 색채지각력 표준점수 | </topClrprcpablSsco> |
|  |  |  | <topPrbsolablSsco> | String | 적성요인 문제해결능력 표준점수 | </topPrbsolablSsco> |
|  |  |  | <topThinkflntablSsco> | String | 적성요인 사고유창력 표준점수 | </topThinkflntablSsco> |
|  |  |  | <topLangablPsco> | String | 적성요인 언어력 백분위점수 | </topLangablPsco> |
|  |  |  | <topMathablPsco> | String | 적성요인 수리력 백분위점수 | </topMathablPsco> |
|  |  |  | <topPrginfablPsco> | String | 적성요인 추리력 백분위점수 | </topPrginfablPsco> |
|  |  |  | <topSpatprcpablPsco> | String | 적성요인 공간지각력 백분위점수 | </topSpatprcpablPsco> |
|  |  |  | <topThngsprcpablPsco> | String | 적성요인 사물지각력 백분위점수 | </topThngsprcpablPsco> |
|  |  |  | <topSitujdgablPsco> | String | 적성요인 상황판단력 백분위점수 | </topSitujdgablPsco> |
|  |  |  | <topMechanablPsco> | String | 적성요인 기계능력 백분위점수 | </topMechanablPsco> |
|  |  |  | <topCncntablPsco> | String | 적성요인 집중력 백분위점수 | </topCncntablPsco> |
|  |  |  | <topClrprcpablPsco> | String | 적성요인 색채지각력 백분위점수 | </topClrprcpablPsco> |
|  |  |  | <topPrbsolablPsco> | String | 적성요인 문제해결능력 백분위점수 | </topPrbsolablPsco> |
|  |  |  | <topThinkflntablPsco> | String | 적성요인 사고유창력 백분위점수 | </topThinkflntablPsco> |
|  |  |  | <rcmndJob1> | String | 1순위 추천직업 | </rcmndJob1> |
|  |  |  | <rcmndJob2> | String | 2순위 추천직업 | </rcmndJob2> |
|  |  |  | <rcmndJob3> | String | 3순위 추천직업 | </rcmndJob3> |
|  |  |  | <rcmndJob4> | String | 4순위 추천직업 | </rcmndJob4> |
|  |  |  | <rcmndJob5> | String | 5순위 추천직업 | </rcmndJob5> |
|  |  | </examRslt> |  |  |  |  |
|  | </adultJobAptReviseExam> |  |  |  |  |  |
|  | <jobPrefExamS> |  | 직업선호도검사 S형 |  |  |  |
|  |  | <total> |  | 조회건수 | </total> |  |
|  |  | <examRslt> |  |  |  |  |
|  |  |  | <psyExamCd> | String | 심리검사코드 | </psyExamCd> |
|  |  |  | <psyExamNo> | String | 심리검사번호 | </psyExamNo> |
|  |  |  | <examDt> | String | 검사일자 (YYYYMMDD) | </examDt> |
|  |  |  | <intrst1Nm> | String | 첫번째 흥미코드 | </intrst1Nm> |
|  |  |  | <intrst1Sco> | String | 첫번째 흥미 원점수 | </intrst1Sco> |
|  |  |  | <intrst2Nm> | String | 두번째 흥미코드 | </intrst2Nm> |
|  |  |  | <intrst2Sco> | String | 두번째 흥미 원점수 | </intrst2Sco> |
|  |  |  | <score1Nm> | String | 현실형(R) | </score1Nm> |
|  |  |  | <score1Rw> | String | 현실형(R) 원점수 | </score1Rw> |
|  |  |  | <score1St> | String | 현실형(R) 표준점수 | </score1St> |
|  |  |  | <score2Nm> | String | 탐구형(I) | </score2Nm> |
|  |  |  | <score2Rw> | String | 탐구형(I) 원점수 | </score2Rw> |
|  |  |  | <score2St> | String | 탐구형(I) 표준점수 | </score2St> |
|  |  |  | <score3Nm> | String | 예술형(A) | </score3Nm> |
|  |  |  | <score3Rw> | String | 예술형(A) 원점수 | </score3Rw> |


## (신규) 심리검사결과

⏭️ skipped(개인 검사 결과)

> 심리검사API를 이용하여 개인별 심리검사 결과를 조회할 수 있습니다.
> 2022년 10월 01일 이후부터 (신규)심리검사결과 API를 통해 고용24에서 제공하는 8종의 심리검사 검사결과를 조회 할 수 있습니다.
> 개인정보처리방침에 따라 직업심리검사 회원은 회원정책(보유기간 2년)/비회원(API등)은 보유기간 7일 이후에 개인정보가 삭제됨을 알려드리며 그 이후에는 검사이력은 조회되지 않습니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214D01.do`

**예제**

```
예제1) 검사자 키값 검색
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214D01.do?authKey=[WORK24_KEY_PSY_TEST]&returnType=XML&userInfo3=[기관코드]&userInfo4=[피검사자 키값]
```

> ⚠️ 37 과 같음 — 호출하지 않았다.

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| userInfo3 | Sting | Y | 제공받은 기관코드를 입력합니다. |
| userInfo4 | String | Y | 피검사자 키값을 입력합니다. |
| psyExamCd | String |  | 심리검사코드를 입력합니다.<br>- Z : 고등학생 적성검사<br>- A : 직업가치관검사<br>- C : 청소년 진로발달검사<br>- K : 초등학생 진로인식검사<br>- 11 : 청소년 인성검사<br>- 13 : 청소년직업흥미검사(개정)<br>- S : 직업선호도검사 S형<br>- 14 : 진로준비 진단검사(찾아Dream) |

### 출력 항목 (총 513개 — 앞 120개만)

| 항목 | 타입 | 설명 |  |  |  |  |
|---|---|---|---|---|---|---|
|  | <youthHiStudAptdExam> |  | 고등학생 적성검사 |  |  |  |
|  |  | <total> |  | 검사결과건수 | </total> |  |
|  |  | <examRslt> |  |  |  |  |
|  |  |  | <psyExamCd> | String | 심리검사코드 | </psyExamCd> |
|  |  |  | <psyExamNo> | String | 심리검사번호 | </psyExamNo> |
|  |  |  | <examDt> | String | 검사일자 (YYYYMMDD) | </examDt> |
|  |  |  | <langablAptdPsco> | String | 백분위 언어력 | </langablAptdPsco> |
|  |  |  | <mathsklAptdPsco> | String | 백분위 수리력 | </mathsklAptdPsco> |
|  |  |  | <infablAptdPsco> | String | 백분위 추리력 | </infablAptdPsco> |
|  |  |  | <sptlablAptdPsco> | String | 백분위 공간능력 | </sptlablAptdPsco> |
|  |  |  | <prcpablAptdPsco> | String | 백분위 지각속도 | </prcpablAptdPsco> |
|  |  |  | <sciablAptdPsco> | String | 백분위 과학능력 | </sciablAptdPsco> |
|  |  |  | <cnctablAptdPsco> | String | 백분위 집중능력 | </cnctablAptdPsco> |
|  |  |  | <clrablAptdPsco> | String | 백분위 색채능력 | </clrablAptdPsco> |
|  |  |  | <thinkablAptdPsco> | String | 백분위 사고유연성 | </thinkablAptdPsco> |
|  |  |  | <langablAptdSsco> | String | 변환점수 언어력 | </langablAptdSsco> |
|  |  |  | <mathsklAptdSsco> | String | 변환점수 수리력 | </mathsklAptdSsco> |
|  |  |  | <infablAptdSsco> | String | 변환점수 추리력 | </infablAptdSsco> |
|  |  |  | <sptlablAptdSsco> | String | 변환점수 공간능력 | </sptlablAptdSsco> |
|  |  |  | <prcpablAptdSsco> | String | 변환점수 지각속도 | </prcpablAptdSsco> |
|  |  |  | <sciablAptdSsco> | String | 변환점수 과학능력 | </sciablAptdSsco> |
|  |  |  | <cnctablAptdSsco> | String | 변환점수 집중능력 | </cnctablAptdSsco> |
|  |  |  | <clrablAptdSsco> | String | 변환점수 색채능력 | </clrablAptdSsco> |
|  |  |  | <thinkablAptdSsco> | String | 변환점수 사고유연성 | </thinkablAptdSsco> |
|  |  |  | <langablGrade> | String | 수준 언어력 | </langablGrade> |
|  |  |  | <mathsklGrade> | String | 수준 수리력 | </mathsklGrade> |
|  |  |  | <infablGrade> | String | 수준 추리력 | </infablGrade> |
|  |  |  | <sptlablGrade> | String | 수준 공간능력 | </sptlablGrade> |
|  |  |  | <prcpablGrade> | String | 수준 지각속도 | </prcpablGrade> |
|  |  |  | <sciablGrade> | String | 수준 과학능력 | </sciablGrade> |
|  |  |  | <cnctablGrade> | String | 수준 집중능력 | </cnctablGrade> |
|  |  |  | <clrablGrade> | String | 수준 색채능력 | </clrablGrade> |
|  |  |  | <thinkablGrade> | String | 수준 사고유연성 | </thinkablGrade> |
|  |  |  | <vocaablSubSsco> | String | 어휘력 | </vocaablSubSsco> |
|  |  |  | <fndsbjcSubSsco> | String | 주제찾기 | </fndsbjcSubSsco> |
|  |  |  | <sciprncpSubSsco> | String | 과학원리 | </sciprncpSubSsco> |
|  |  |  | <clrprcpSubSsco> | String | 색상지각 | </clrprcpSubSsco> |
|  |  |  | <smplmathSubSsco> | String | 단순수리 | </smplmathSubSsco> |
|  |  |  | <aplmathSubSsco> | String | 응용수리 | </aplmathSubSsco> |
|  |  |  | <imgrotSubSsco> | String | 심상회전 | </imgrotSubSsco> |
|  |  |  | <fndpartSubSsco> | String | 부분찾기 | </fndpartSubSsco> |
|  |  |  | <concablSubSsco> | String | 집중력 | </concablSubSsco> |
|  |  |  | <prgrsinfSubSsco> | String | 수열추리 | </prgrsinfSubSsco> |
|  |  |  | <sntncinfSubSsco> | String | 문장추리 | </sntncinfSubSsco> |
|  |  |  | <prcpspdSubSsco> | String | 지각속도 | </prcpspdSubSsco> |
|  |  |  | <mtchstckSubSsco> | String | 성냥개비 | </mtchstckSubSsco> |
|  |  |  | <langablAptdTypComSsco> | String | 일반고 언어력 | </langablAptdTypComSsco> |
|  |  |  | <mathsklAptdTypComSsco> | String | 일반고 수리력 | </mathsklAptdTypComSsco> |
|  |  |  | <infablAptdTypComSsco> | String | 일반고 추리력 | </infablAptdTypComSsco> |
|  |  |  | <sptlablAptdTypComSsco> | String | 일반고 공간능력 | </sptlablAptdTypComSsco> |
|  |  |  | <prcpablAptdTypComSsco> | String | 일반고 지각속도 | </prcpablAptdTypComSsco> |
|  |  |  | <sciablAptdTypComSsco> | String | 일반고 과학능력 | </sciablAptdTypComSsco> |
|  |  |  | <cnctablAptdTypComSsco> | String | 일반고 집중능력 | </cnctablAptdTypComSsco> |
|  |  |  | <clrablAptdTypComSsco> | String | 일반고 색채능력 | </clrablAptdTypComSsco> |
|  |  |  | <thinkablAptdTypComSsco> | String | 일반고 사고유연성 | </thinkablAptdTypComSsco> |
|  |  |  | <langablAptdTypSpclSsco> | String | 특성화고 언어력 | </langablAptdTypSpclSsco> |
|  |  |  | <mathsklAptdTypSpclSsco> | String | 특성화고 수리력 | </mathsklAptdTypSpclSsco> |
|  |  |  | <infablAptdTypSpclSsco> | String | 특성화고 추리력 | </infablAptdTypSpclSsco> |
|  |  |  | <sptlablAptdTypSpclSsco> | String | 특성화고 공간능력 | </sptlablAptdTypSpclSsco> |
|  |  |  | <prcpablAptdTypSpclSsco> | String | 특성화고 지각속도 | </prcpablAptdTypSpclSsco> |
|  |  |  | <sciablAptdTypSpclSsco> | String | 특성화고 과학능력 | </sciablAptdTypSpclSsco> |
|  |  |  | <cnctablAptdTypSpclSsco> | String | 특성화고 집중능력 | </cnctablAptdTypSpclSsco> |
|  |  |  | <clrablAptdTypSpclSsco> | String | 특성화고 색채능력 | </clrablAptdTypSpclSsco> |
|  |  |  | <thinkablAptdTypSpclSsco> | String | 특성화고 사고유연성 | </thinkablAptdTypSpclSsco> |
|  |  |  | <langablAptdSexManSsco> | String | 남성 언어력 | </langablAptdSexManSsco> |
|  |  |  | <mathsklAptdSexManSsco> | String | 남성 수리력 | </mathsklAptdSexManSsco> |
|  |  |  | <infablAptdSexManSsco> | String | 남성 추리력 | </infablAptdSexManSsco> |
|  |  |  | <sptlablAptdSexManSsco> | String | 남성 공간능력 | </sptlablAptdSexManSsco> |
|  |  |  | <prcpablAptdSexManSsco> | String | 남성 지각속도 | </prcpablAptdSexManSsco> |
|  |  |  | <sciablAptdSexManSsco> | String | 남성 과학능력 | </sciablAptdSexManSsco> |
|  |  |  | <cnctablAptdSexManSsco> | String | 남성 집중능력 | </cnctablAptdSexManSsco> |
|  |  |  | <clrablAptdSexManSsco> | String | 남성 색채능력 | </clrablAptdSexManSsco> |
|  |  |  | <thinkablAptdSexManSsco> | String | 남성 사고유연성 | </thinkablAptdSexManSsco> |
|  |  |  | <langablAptdSexWomanSsco> | String | 여성 언어력 | </langablAptdSexWomanSsco> |
|  |  |  | <mathsklAptdSexWomanSsco> | String | 여성 수리력 | </mathsklAptdSexWomanSsco> |
|  |  |  | <infablAptdSexWomanSsco> | String | 여성 추리력 | </infablAptdSexWomanSsco> |
|  |  |  | <sptlablAptdSexWomanSsco> | String | 여성 공간능력 | </sptlablAptdSexWomanSsco> |
|  |  |  | <prcpablAptdSexWomanSsco> | String | 여성 지각속도 | </prcpablAptdSexWomanSsco> |
|  |  |  | <sciablAptdSexWomanSsco> | String | 여성 과학능력 | </sciablAptdSexWomanSsco> |
|  |  |  | <cnctablAptdSexWomanSsco> | String | 여성 집중능력 | </cnctablAptdSexWomanSsco> |
|  |  |  | <clrablAptdSexWomanSsco> | String | 여성 색채능력 | </clrablAptdSexWomanSsco> |
|  |  |  | <thinkablAptdSexWomanSsco> | String | 여성 사고유연성 | </thinkablAptdSexWomanSsco> |
|  |  |  | <fitstJob1Nm> | String | 추천 직업명1 | </fitstJob1Nm> |
|  |  |  | <fitstJob2Nm> | String | 추천 직업명2 | </fitstJob2Nm> |
|  |  |  | <fitstJob3Nm> | String | 추천 직업명3 | </fitstJob3Nm> |
|  |  |  | <fitstJob4Nm> | String | 추천 직업명4 | </fitstJob4Nm> |
|  |  |  | <fitstJob5Nm> | String | 추천 직업명5 | </fitstJob5Nm> |
|  |  |  | <fitstJob6Nm> | String | 추천 직업명6 | </fitstJob6Nm> |
|  |  |  | <fitstJob7Nm> | String | 추천 직업명7 | </fitstJob7Nm> |
|  |  |  | <fitstJob8Nm> | String | 추천 직업명8 | </fitstJob8Nm> |
|  |  |  | <sciablAptdSexWomanSsco> | String | 추천 직업명9 | </sciablAptdSexWomanSsco> |
|  |  |  | <fitstJob9Nm> | String | 여성 집중능력 | </fitstJob9Nm> |
|  |  |  | <fitstJob10Nm> | String | 추천 직업명10 | </fitstJob10Nm> |
|  |  |  | <fitstJob1Csco> | String | 일치도1 | </fitstJob1Csco> |
|  |  |  | <fitstJob2Csco> | String | 일치도2 | </fitstJob2Csco> |
|  |  |  | <fitstJob3Csco> | String | 일치도3 | </fitstJob3Csco> |
|  |  |  | <fitstJob4Csco> | String | 일치도4 | </fitstJob4Csco> |
|  |  |  | <fitstJob5Csco> | String | 일치도5 | </fitstJob5Csco> |
|  |  |  | <fitstJob6Csco> | String | 일치도6 | </fitstJob6Csco> |
|  |  |  | <fitstJob7Csco> | String | 일치도7 | </fitstJob7Csco> |
|  |  |  | <fitstJob8Csco> | String | 일치도8 | </fitstJob8Csco> |
|  |  |  | <fitstJob9Csco> | String | 일치도9 | </fitstJob9Csco> |
|  |  |  | <fitstJob10Csco> | String | 일치도10 | </fitstJob10Csco> |
|  |  |  | <fitstJob1Grp> | String | 관련직업군1 | </fitstJob1Grp> |
|  |  |  | <fitstJob2Grp> | String | 관련직업군2 | </fitstJob2Grp> |
|  |  |  | <fitstJob3Grp> | String | 관련직업군3 | </fitstJob3Grp> |
|  |  |  | <fitstJob4Grp> | String | 관련직업군4 | </fitstJob4Grp> |
|  |  |  | <fitstJob5Grp> | String | 관련직업군5 | </fitstJob5Grp> |
|  |  |  | <fitstJob6Grp> | String | 관련직업군6 | </fitstJob6Grp> |
|  |  |  | <fitstJob7Grp> | String | 관련직업군7 | </fitstJob7Grp> |
|  |  |  | <fitstJob8Grp> | String | 관련직업군8 | </fitstJob8Grp> |
|  |  |  | <fitstJob9Grp> | String | 관련직업군9 | </fitstJob9Grp> |
|  |  |  | <fitstJob10Grp> | String | 관련직업군10 | </fitstJob10Grp> |
|  |  |  | <fitstJob1Abl> | String | 중요적성요인1 | </fitstJob1Abl> |
|  |  |  | <fitstJob2Abl> | String | 중요적성요인2 | </fitstJob2Abl> |
|  |  |  | <fitstJob3Abl> | String | 중요적성요인3 | </fitstJob3Abl> |
|  |  |  | <fitstJob4Abl> | String | 중요적성요인4 | </fitstJob4Abl> |
|  |  |  | <fitstJob5Abl> | String | 중요적성요인5 | </fitstJob5Abl> |
|  |  |  | <fitstJob6Abl> | String | 중요적성요인6 | </fitstJob6Abl> |
|  |  |  | <fitstJob7Abl> | String | 중요적성요인7 | </fitstJob7Abl> |


## 한국고용직업분류 매핑코드

❌ 호출 실패 — 직엄심리검사 결과 매핑 OES 코드가 없습니다.

> 심리검사API를 이용하여 개인별 심리검사 결과를 조회할 수 있습니다.
> 직업심리검사 직업코드를 한국고용직업분류코드 결과로 제공합니다.

**요청 URL**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214D02.do`

**예제**

```
예제1) 기본검색(필수 입력 예)
https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214D02.do?authKey=[WORK24_KEY_PSY_TEST]&returnType=XML&psyExamCd=[심리검사코드]&jobsIcd=[심리검사 직업코드]
```

**실제로 호출한 주소**: `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo214D02.do?authKey=[WORK24_KEY_PSY_TEST]&returnType=XML&psyExamCd=9&jobsIcd=K000000847`

> ⚠️ 심리검사 결과(37·38)의 `<jobInfo1/2>` 직업코드가 있어야 한다. 임의 코드로는 "매핑 OES 코드가 없습니다".

### 요청 파라미터

| 항목 | 타입 | 필수여부 | 설명 |
|---|---|---|---|
| authKey | String | Y | 인증키 |
| returnType | String | Y | 리턴타입 : XML 을 반드시 지정합니다. |
| psyExamCd | String | Y | 심리검사코드를 입력합니다.<br>- 9 : 성인용 직업심리검사<br>- A : 직업가치관검사 |
| jobsIcd | String | Y | 심리검사결과API의 출력결과 중 <jobInfo1>, <jobInfo2>에 해당하는 직업코드를 입력합니다. |

### 출력 항목

| 항목 | 타입 | 설명 |  |  |
|---|---|---|---|---|
| <oesRoot> |  |  |  |  |
|  | <oesList> |  | 한국고용직업분류코드리스트 | </oesList> |
| </oesRoot> |  |  |  |  |

### 실제 응답 예시 (연락처 성격의 값은 *** 처리)

```xml
<?xml version="1.0" ?>
<oesRoot>
 <message>직엄심리검사 결과 매핑 OES 코드가 없습니다.</message>
 <messageCd>005</messageCd>
</oesRoot>
```
