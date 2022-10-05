# homework

```
    git init
    // 깃헙과 연결
    git remote add origin https://github.com/dhkim0835/homework.git

    // 브랜치 이름 변경
    git branch -m master main
```

#### express setting

- yarn add express
- yarn add -g typescript
- yarn add express
- yarn add nodemon --dev
- yarn add typescript --dev
- yarn add @types/express --dev
- yarn add @types/node --dev
- yarn add ts-node --dev

##### PPA Personal Package Archive

- 런치패드에서 제공하는 우분투의 공식 패키지 저장소에 없는 서드파티 소프트웨어를 위한 개인용 소프트웨어 패키지 저장소이다.
- 단순히 소프트웨어의 패키지를 저장할 뿐 아니라 해당 소프트웨어의 업데이트 기능도 제공한다.

- sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash
- sudo apt-get install -y nodejs

##### 우분투 전역 환경 변수

- 환경 변수 등록
- export [환경변수]=[환경변수 내용]

- 환경 변수 삭제
- unset [환경 변수]

- 재부팅시 환경 변수 자동 적용
- vi ~/.bashrc
- vi 편집기로 홈 디렉토리에 위치한 .bashrc 파일 열고 마지막 줄에 추가
- export PATH=$PATH:/home/jang/.local/bin
