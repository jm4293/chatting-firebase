# 채팅 
1. 로그인
1. 채팅
1. 프로필
1. 친구목록
1. 로그인 한 아이디로 메세지 보내기
2. 로그아웃

## 개발언어
- React
- express

## 추가 패키지
- styled-components
  - npm install styled-components
  - version: 5.3.6

- react-router-dom
  - npm install react-router-dom --save
  - version: 6.4.2

- firebase
  - npm install firebase
  - version: 9.16.0

- react-icons
  - npm install react-icons
  - version: 4.7.1

- react-redux
  - npm install react-redux
  - version: 8.0.5

- @reduxjs/toolkit
  - npm install @reduxjs/toolkit
  - version: 1.9.1

- react-router-dom
  - npm install react-router-dom
  - version: 6.8.0

## 실행 방법
- npm start

## 실행 과정
- 서버실행 -> 클라이언트 실행 -> localhost:3000 접속

## 구현
- 프론트엔드에서 로그인 버튼을 누르면 인증코드를 프론트엔드가 받음 -> 받은 인증코드를 백엔드로 넘김 -> 백엔드에서 인증코드로 카카오서버로 넘겨서 토큰을 받음 -> 백엔드에서 토큰으로 원하는 정보 얻음 -> 받은 정보를 프론트엔드로 넘김
- 카카오 로그인 구현 (인증코드, 토큰)
- 로그인 아이디의 프로필 구현
- 친구 목록(친구목록은 API 검수를 통해 추가 동의 권한을 사용할 수 있습니다.)
- 로그인한 아이디로 메세지 보내기 구현
- 로그아웃 구현
