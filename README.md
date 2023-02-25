# 공공 버스 API를 활용한 정보 제공 🔥

- 공공데이터 포털에서 제공하는 API를 활용하여 랜덤 3개의 버스 노선을 추출
- 위 3개의 노선 중 5분 이내에 도착 예정인 버스가 가장 많은 버스 정류장 3곳을 추출
- 도착 시간이 가장 빠른 순으로 버스 번호, 번호판, 도착 예정 시간을 정렬하여 응답

<br><br>

## 질문에 대한 답변

### In which point, did you feel hard?

- 어떤 이유에서인지는 파악이 되지 않았지만, 공공 API를 신청하여 받은 일반 인증키(Encoding, Decoding)가 동작 안함 `Key인증실패: SERVICE KEY IS NOT REGISTERED ERROR.[인증모듈 에러코드(30)]`
- 이로 인해 실행 테스트를 할 수가 없었음

#### -> 해결: 이는 실제 API 필드를 보고 응답값을 예상하여 코드를 작성함으로써 해결

- Nest.js 프로젝트를 설정하는 과정에서 어떤 이유에서인지 dependency 설치가 전혀 안되는 문제 발생

#### -> 해결: TS + Express를 활용하여 해결

<br>

### If you have more time to do this, what will you improve in your code?

- API Key가 정상화 되어, 실행을 테스트해볼 수 있었으면 함
- 유닛 테스트, 통합 테스트 코드 작성

<br><br>

## 목표

    1. 제약 사항 지키기(node.js)
    2. 가독성 좋은 코드
    3. 과제 요구사항 완료하기
    4. 문서화 잘하기

<br><br>

## How to Start?

- clone this repo `git clone https://github.com/SeungWookHan/backendcodetest.git`
- install the dependencies. `npm install`
- run `cp .env.example .env`
- run `docker compose up --build`

### .env 값 예시

```shell
PORT=80 # express 서버의 포트
ACCESS_KEY=OXiu4F8tgkpvsTh40ub2V0hG~~ # 공공 버스 API Service Key
```

<br><br>

## 설계

### 활용 API

> 참고: https://www.data.go.kr/index.do

- 서울특별시\_노선정보 조회 서비스
- 서울특별시\_버스도착정보조회 서비스

<br>

### 파일 구조

```
./src
├── api # 컨트롤러 로직
│   ├── index.ts
│   └── routes
│       └── bus.ts
├── app.ts # 메인 앱
├── config # 환경변수 관련
│   └── index.ts
├── loaders # 초기 로더
│   ├── dependencyInjector.ts
│   ├── express.ts
│   ├── index.ts
│   └── logger.ts
└── services # 서비스 로직
    └── bus.ts
```

<br>

## 개발 정보

### 개발환경 정보

- PC - MackBook Pro (14-inch, M1, 2021)
- Memory - 32GB
- OS - macOS Ventura (13.2)

- IDE - VSCode

<br>

### 기술스택

- NodeJS with TS
  - 견고한 코드를 만들기 위해서는 변수가 어떤 타입을 가지는지를 알아야하기 때문에 TS 채택
  - TS를 사용하면 IDE에서 사전에 오류를 잡아줘서 빌드 전에도 오류를 알아 작업 효율성 증가
- Express.js
  - Nest.js dependency 설치에 어려움이 생겨 대안으로 선택
  - Express 특성상 정의된 아키텍처 구조가 없다는 단점을, 견고한 구조를 도입함으로써 해결
- Docker, Docker-compose
  - Environment-Disparity, 즉 개발 환경을 맞춰주기 위해 활용
  - 추후 배포에도 유리함
