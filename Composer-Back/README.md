# ResumeNetwork Network

package.json : BNA파일 생성시 구성요소(비즈니스네트워크명, 버전, 의존 라이브러리) 설정

permissions.acl : 트랜잭션에 대한 네트워크 참가자의 권한과 실행조건 정의

queries.qry : DB에 사용되는 query문 정의

card파일 : 네트워크 참가자로써 참여할 수 있게 해주는 파일

lib 폴더 : 트랜잭션의 실제 작동될 코드를 포함하는 스크립트 파일 존재

models 폴더 : 네트워크 참가자, 자산, 트랜잭션 등을 


This business network defines:

**Participant**
`User`
`Organization`
`Enterprise`
`School`


**Asset**
`Authentication`
`ResumeInfoUser`
`Certificate`
`AwardDetails`
`UserInfoInOrg`
`UserInfoInEnt`
`UserInfoInSch`


**Transaction**
`AddRequestUser`
`RevokeRequestUser`
`CreateAuthentication`
`CreateResumeInfoUser`
`CreateCertificate`
`CreateAwardDetails`
`CreateUserInfoInEnt`
`CreateUserInfoInSch`

**Event**
`SendEvent`
`UserEvent` 
`OrganizationEvent` 
`EnterpriseEvent`
`SchoolEvent` 

**Transaction 예**
```typescript
/**
 * @param {hansung.ac.kr.transaction.CreateAuthentication }  txCreateAuthentication   - the member to be processed
 * @transaction
 */
function CreateAuthentication  (txCreateAuthentication ) {
   var actionDateTime = new Date();
   var me = getCurrentParticipant();
   var factory = getFactory();
   var indexf = -1;

   if(!me) {
        throw new Error('can not find Participant');
    }


   return getAssetRegistry(NAMESAPCE_ASSETS + ".Authentication")
  .then(function (allAuthenticationRegistry) {


      var newAuthentication = factory.newResource(NAMESAPCE_ASSETS, "Authentication", txCreateAuthentication.resumeAssetId );
       newAuthentication.authorizedParticipantId = txCreateAuthentication.authorizedParticipantId;
       newAuthentication.approvalStatus = "미인증";
       newAuthentication.resumeDetails = txCreateAuthentication.resumeDetails;
       newAuthentication.resumeAssetId =  txCreateAuthentication.resumeAssetId;
       newAuthentication.authenticationTime = actionDateTime;
       newAuthentication.ownerId = txCreateAuthentication.userId;
       return allAuthenticationRegistry.add(newAuthentication);
       })
        .catch(function (error){
        throw error;
       });
}

```
