# ResumeNetwork
이력인증 서비스를 제공하는 웹사이트로

공공기관/ 기업은 일반사용자로 부터 자격증이나 공모전 수상내역 같은 이력들을 인증해줄 수 있습니다.

웹이력 열람기능과 이력의 검증을 단축하는 이점을 제공합니다.

블록체인 오픈소스 Hyperledger Fabric을 이용하여 Rest Server를 구현하고

Angular로 Front-end를 구현했습니다.





## Program Stacks
- Hyperledger Composer
- OAuth(Github)
- Angular6
- Node js


## Development Environment
- javascript, typescript
- Ubuntu 16 LTS AWS
- Docker



## Run Project
### 1. 백엔드 실행

https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-single-org 를 따라 

Composer-Back의 파일들을 이용하여 Docker에 블록체인 네트워크 배포

npm으로 githup-passport2 노드 설치
https://hyperledger.github.io/composer/v0.19/integrating/enabling-rest-authentication 를 따라 OAuth 설정

두가지 Port로 Rest-server를 실행

3001번
composer-rest-server -c admin@resumenetwork -p 3001 -n never &

3000번 
composer-rest-server -c admin@resumenetwork -m true -n never -w true &
true 옵션을 주면 OAuth CallBack 담당할 서버가 됩니다.

이력서 인증처리를 담당하는 기능은 Angular-Front/event.js 파일이 담당합니다.
블록체인 네트워크 카드를 이용하기 때문에 블록체인 네트워크가 실행되고 있는 환경에서
node event.js로 실행합니다.

### 2. 프론트엔드 실행

node 8.15 버전 권장
@angular/cli 전역 설치
Angular-Front/package.json을 이용한 npm install
Angular-Front/proxy.conf.js와 Angular-Front/src/app/IpConfig.ts 파일의 ip 수정

ng serve --host 0.0.0.0 --port 4200 --disableHostCheck true 명령어로 개발용서버 실행

