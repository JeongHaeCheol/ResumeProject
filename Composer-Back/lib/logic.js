/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


'use strict';

var CORE_NAMESPACE_PREFIX = "hansung.ac.kr";
var PARTICIPANTS = "participants";
var ASSETS = "assets";
var TRANSACTION = "transaction";
var RESUME = "ResumeInfoUser";

var NAMESPACE_PARTICIPANTS = CORE_NAMESPACE_PREFIX + "." + PARTICIPANTS;
var NAMESPACE_USER = CORE_NAMESPACE_PREFIX + "." + PARTICIPANTS + "." + "User";
var NAMESPACE_ORG = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "Organization";
var NAMESPACE_ENT = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "Enterprise";
var NAMESPACE_INS = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "School";

var NAMESAPCE_ASSETS = CORE_NAMESPACE_PREFIX + "." + ASSETS;
var ASSET_RESUME_INFO_USER =CORE_NAMESPACE_PREFIX + "."  + ASSETS + "." + "ResumeInfoUser";
var ASSET_CERTIFICATE =CORE_NAMESPACE_PREFIX + "."  + ASSETS + "." + "Certificate";
var ASSET_AWARD_DETAILS =CORE_NAMESPACE_PREFIX + "."  + ASSETS + "." + "AwardDetails";
var USER_INFO_IN_ENT =CORE_NAMESPACE_PREFIX + "."  + ASSETS + "." + "UserInfoInEnt";
var USER_INFO_IN_SCH =CORE_NAMESPACE_PREFIX + "."  + ASSETS+ "." + "UserInfoInSch";


var NAMESPACE_EVENT_OR_TRANSACTION = CORE_NAMESPACE_PREFIX + "." + TRANSACTION ;






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





/**
 * @param {hansung.ac.kr.transaction.CreateCertificate}  txCreateCertificate  - the member to be processed
 * @transaction
 */
function CreateCertificate (txCreateCertificate) {
   var actionDateTime = new Date();
   var me = getCurrentParticipant();
   var factory = getFactory();

   if(!me) {
        throw new Error('can not find Participant');
    }

   return getAssetRegistry(ASSET_CERTIFICATE)
  .then(function (allCertificateRegistry) {

       // math.random은 완전한 난수를 보장하지 않기 때문에 보안에 안좋음, crypto 모듈 참고
      var randomIntId = me.getIdentifier() +  getRandomIntInclusive(1,100000000000);
       var newCertificate = factory.newResource(NAMESAPCE_ASSETS, "Certificate", randomIntId );

       newCertificate.ownerId = me.getIdentifier();
       newCertificate.certificateName = txCreateCertificate.certificateName;
       newCertificate.certificateScore = txCreateCertificate.certificateScore;
       newCertificate.authorizedParticipantId = txCreateCertificate.authorizedParticipantId;
       newCertificate.organizationName  = txCreateCertificate.organizationName ;
       newCertificate.dob  = txCreateCertificate.dob ;
       newCertificate.expirationDate  = txCreateCertificate.expirationDate;
       newCertificate.transactionTime  = actionDateTime;
       newCertificate.isPublic  = txCreateCertificate.isPublic;
       
       
       let sendEvent = factory.newEvent(NAMESPACE_EVENT_OR_TRANSACTION, 'SendEvent');
       txCreateCertificate.userId = me.getIdentifier();
       txCreateCertificate.authorizedParticipantType = "Organization1";
       sendEvent.txForUser = txCreateCertificate;
       sendEvent.resumeAssetId = randomIntId;
       emit(sendEvent);

       return allCertificateRegistry.add(newCertificate);
   })
  .catch(function (error){
   	throw error;
   });
}



/**
 * @param {hansung.ac.kr.transaction.CreateAwardDetails}  txCreateAwardDetails  - the member to be processed
 * @transaction
 */
function CreateAwardDetails (txCreateAwardDetails) {
   var actionDateTime = new Date();
   var me = getCurrentParticipant();
   var factory = getFactory();

   if(!me) {
        throw new Error('can not find Participant');
    }

   return getAssetRegistry(ASSET_AWARD_DETAILS)
  .then(function (allAwardDetailsRegistry) {
       var randomIntId = me.getIdentifier() +  getRandomIntInclusive(1,100000000000);
       var newAwardDetails = factory.newResource(NAMESAPCE_ASSETS, "AwardDetails",  randomIntId  );
     
       newAwardDetails.ownerId = me.getIdentifier();
       newAwardDetails.contestName = txCreateAwardDetails.contestName;
       newAwardDetails.authorizedParticipantId = txCreateAwardDetails.authorizedParticipantId;
       newAwardDetails.organizationName  = txCreateAwardDetails.organizationName ;
       newAwardDetails.dateOfAward  = txCreateAwardDetails.dateOfAward ;
       newAwardDetails.awardGrade  = txCreateAwardDetails.awardGrade;
       newAwardDetails.description  = txCreateAwardDetails.description;
       newAwardDetails.transactionTime  = actionDateTime;
       newAwardDetails.isPublic  = txCreateAwardDetails.isPublic;

       
       let sendEvent = factory.newEvent(NAMESPACE_EVENT_OR_TRANSACTION, 'SendEvent');
       txCreateAwardDetails.userId = me.getIdentifier();
       txCreateAwardDetails.authorizedParticipantType = "Organization2"
       sendEvent.txForUser = txCreateAwardDetails;
       sendEvent.resumeAssetId = randomIntId;
       emit(sendEvent);


       return allAwardDetailsRegistry.add(newAwardDetails);
   })
  .catch(function (error){
   	throw error;
   });
}




/**
 * @param {hansung.ac.kr.transaction.CreateUserInfoInEnt}  txCreateUserInfoInEnt  - the member to be processed
 * @transaction
 */
function CreateUserInfoInEnt (txCreateUserInfoInEnt) {
   var actionDateTime = new Date();
   var me = getCurrentParticipant();
   var factory = getFactory();

   if(!me) {
        throw new Error('can not find Participant');
    }

   return getAssetRegistry(USER_INFO_IN_ENT)
  .then(function (allUserInfoInEntRegistry) {
       var randomIntId = me.getIdentifier() +  getRandomIntInclusive(1,100000000000);
       var newUserInfoInEnt = factory.newResource(NAMESAPCE_ASSETS, "UserInfoInEnt",  randomIntId );
     
     
       newUserInfoInEnt.ownerId = me.getIdentifier();
       newUserInfoInEnt.authorizedParticipantId  = txCreateUserInfoInEnt.authorizedParticipantId ;
       newUserInfoInEnt.enterpriseName  = txCreateUserInfoInEnt.enterpriseName ;
       newUserInfoInEnt.userPosition  = txCreateUserInfoInEnt.userPosition ;
       newUserInfoInEnt.performingTask  = txCreateUserInfoInEnt.performingTask;
       newUserInfoInEnt.dateOfEmployment  = txCreateUserInfoInEnt.dateOfEmployment;
       newUserInfoInEnt.retirementDate  = txCreateUserInfoInEnt.retirementDate;
       newUserInfoInEnt.transactionTime = actionDateTime;
       newUserInfoInEnt.isPublic  = txCreateUserInfoInEnt.isPublic;
       
       
       let sendEvent = factory.newEvent(NAMESPACE_EVENT_OR_TRANSACTION, 'SendEvent');
       txCreateUserInfoInEnt.authorizedParticipantType = "Enterprise"
       txCreateUserInfoInEnt.userId = me.getIdentifier();
       sendEvent.txForUser = txCreateUserInfoInEnt;
       sendEvent.resumeAssetId = randomIntId;
       emit(sendEvent);


       return allUserInfoInEntRegistry.add(newUserInfoInEnt);
   })
  .catch(function (error){
   	throw error;
   });
}





/**
 * @param {hansung.ac.kr.transaction.CreateUserInfoInSch}  txCreateUserInfoInSch  - the member to be processed
 * @transaction
 */
function CreateUserInfoInSch (txCreateUserInfoInSch) {
   var actionDateTime = new Date();
   var me = getCurrentParticipant();
   var factory = getFactory();

   if(!me) {
        throw new Error('can not find Participant');
    }

   return getAssetRegistry(USER_INFO_IN_SCH)
  .then(function (allUserInfoInSchRegistry) {
       var randomIntId = me.getIdentifier() +  getRandomIntInclusive(1,100000000000);
       var newUserInfoInSch = factory.newResource(NAMESAPCE_ASSETS, "UserInfoInSch",  randomIntId  );
     
       newUserInfoInSch.ownerId = me.getIdentifier();
       newUserInfoInSch.authorizedParticipantId  = txCreateUserInfoInSch.authorizedParticipantId;
       newUserInfoInSch.schoolName  = txCreateUserInfoInSch.schoolName ;
       newUserInfoInSch.entranceDate  = txCreateUserInfoInSch.entranceDate ;
       newUserInfoInSch.graduationDate  = txCreateUserInfoInSch.graduationDate;
       newUserInfoInSch.majorField  = txCreateUserInfoInSch.majorField;
       newUserInfoInSch.gradeAverage  = txCreateUserInfoInSch.gradeAverage;
       newUserInfoInSch.transactionTime = actionDateTime;
       newUserInfoInSch.isPublic  = txCreateUserInfoInSch.isPublic;

       
       let sendEvent = factory.newEvent(NAMESPACE_EVENT_OR_TRANSACTION, 'SendEvent');
       txCreateUserInfoInSch.userId = me.getIdentifier();
       txCreateUserInfoInSch.authorizedParticipantType = "School";
       sendEvent.txForUser = txCreateUserInfoInSch;
       sendEvent.resumeAssetId = randomIntId;
       emit(sendEvent);


       return allUserInfoInSchRegistry.add(newUserInfoInSch);
   })
  .catch(function (error){
   	throw error;
   });
}





/**
 * @param {hansung.ac.kr.transaction.CreateResumeInfoUser}  txCreateResumeInfoUser  - the member to be processed
 * @transaction
 */
function CreateResumeInfoUser (txCreateResumeInfoUser) {

   var me = getCurrentParticipant();
   var allResume = null;
   var factory = getFactory();

   if(!me) {
        throw new Error('can not find Participant');
    }

   return getAssetRegistry(ASSET_RESUME_INFO_USER)
  .then(function (allResumeAssetRegistry) {
     allResume = allResumeAssetRegistry;

       var newResumeAsset = factory.newResource(NAMESAPCE_ASSETS, RESUME,  me.getIdentifier());
       newResumeAsset.ownerId = me.getIdentifier();
       newResumeAsset.name = txCreateResumeInfoUser.name;
       newResumeAsset.dob = txCreateResumeInfoUser.dob;
       newResumeAsset.supportField = txCreateResumeInfoUser.supportField;
       newResumeAsset.salaryRequirement  = txCreateResumeInfoUser.salaryRequirement ;
       newResumeAsset.majorActivities  = txCreateResumeInfoUser.majorActivities ;
       newResumeAsset.socialExperience  = txCreateResumeInfoUser.socialExperience ;
       newResumeAsset.skillsAndCapabilities  = txCreateResumeInfoUser.skillsAndCapabilities ;
       newResumeAsset.isPublic  = txCreateResumeInfoUser.isPublic ;

 /*      
       let sendEvent = factory.newEvent(NAMESPACE_EVENT_OR_TRANSACTION, 'SendEvent');
       txCreateResumeInfoUser = me.getIdentifer();
       sendEvent.txForUser = txCreateResumeInfoUser;
       emit(sendEvent);
*/


       return allResume.add(newResumeAsset);
   })
  .catch(function (error){
   	throw error;
   });
}


/**
 * @param {hansung.ac.kr.transaction.AddRequestUser} addRequestUser - the authorize to be processed
 * @transaction
 */
function addRequestUser(addRequestUser) {


    var index = -1;
    var participantList = null;   
    var factory = getFactory();

 
   
    return getParticipantRegistry(addRequestUser.targetParticipantType)
   .then(function (participantRegistry) {
        participantList = participantRegistry;

        return participantRegistry;
    }).
      then(function () {

        return participantList.get(addRequestUser.targetParticipantId);

    }).then(function (target){

	if(!target.requestResumeList) {
     	  target.requestResumeList = [];
 
        }
          target.requestResumeList.findIndex(function testF(element, indexf, array){
              if( (element.requestResumeAssetId) == addRequestUser.requestResumeAssetId ) {
                 index = indexf;
              }
          });
           
        if(index < 0 ) {
          var newRequestResume = factory.newConcept(NAMESPACE_PARTICIPANTS, 'RequestResume');
           newRequestResume.userId = addRequestUser.requestUserId;
           newRequestResume.requestDetails =  addRequestUser.requestDetails;
           newRequestResume.requestResumeAssetId = addRequestUser.requestResumeAssetId;
	   newRequestResume.participantType = addRequestUser.targetParticipantType;
           // Need to insert Relation User Type user 

          target.requestResumeList.push(newRequestResume);
          return  participantList.update(target);
        }
  	else 
          throw new Error("Same requestResumeAssetId already exist");
   });

}

/**
 * @param {hansung.ac.kr.transaction.RevokeRequestUser} revokeRequestUser - the authorize to be processed
 * @transaction
 */
function revokeRequestUser(revokeRequestUser) {

	
    var index = -1;
    var participantList = null;
    var factory = getFactory();



    return getParticipantRegistry(revokeRequestUser.targetParticipantType)
   .then(function (participantRegistry) {
        participantList = participantRegistry;

        return participantRegistry;
    }).
      then(function () {

        return participantList.get(revokeRequestUser.targetParticipantId);

    }).then(function (target){

        if(!target.requestResumeList) {
          throw "requestResumeList not exist";
        }

        target.requestResumeList.findIndex(function testF(element, indexf, array){
             
        if( (element.requestResumeAssetId) == revokeRequestUser.requestResumeAssetId ) {
                 index = indexf;
              }
        });

	if(index > -1) {
		target.requestResumeList.splice(index, 1);	
	}
	else 
		throw Error("target to delete is not exist");

        return  participantList.update(target);
        
		      
      
});
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

