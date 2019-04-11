
'use strict';


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

var CORE_NAMESPACE_PREFIX = "hansung.ac.kr";
var PARTICIPANTS = "participants";
var ASSETS = "assets";
var TRANSACTION = "transaction";
var NAMESPACE_USER = CORE_NAMESPACE_PREFIX + "." + PARTICIPANTS + "." + "User";
var NAMESPACE_ORG = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "Organization";
var NAMESPACE_ENT = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "Enterprise";
var NAMESPACE_SCH = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "School";





class SitechainListener{
        
        constructor() {

                this.NetworkConnection = new BusinessNetworkConnection();
                this.CONNECTION_PROFILE_NAME = "admin@resumenetwork";
		this.Factory = null;
        }


        init() {

                return this.NetworkConnection.connect(this.CONNECTION_PROFILE_NAME)
                .then((result) => {
			console.log("");
                        console.log("Business network connection completed");


	                console.log("");
                        console.log("-------------------- subscrib start --------------------");
                        console.log("");

		        this.Factory = result.getFactory();
                        this.businessNetworkDefinition = result;
                        //LOG.info(this.businessNetworkDefinition.getIdentifier());
                })
                // and catch any exceptions that are triggered
                .catch(function (error) {
                        throw error;
                });

        }


        /** Listen for the sale transaction events
        */
        listen(){

                this.NetworkConnection.on('event',(getEvent)=>{

                       
                             
                        var temp = JSON.stringify(getEvent['txForUser']);
                        var evt = JSON.parse(temp);
                  
                        try{	
                            let factory = this.Factory;
                            let addRequestUser =  factory.newTransaction('hansung.ac.kr.transaction', 'AddRequestUser');

			    console.log("");
			    console.log("--------------------------------------------------------");
        		    console.log("");

                             addRequestUser.requestUserId = evt['userId'];
                             addRequestUser.targetParticipantId  =  evt['authorizedParticipantId'];
			     addRequestUser.requestResumeAssetId = getEvent['resumeAssetId'];


                             console.log("인증승인 참여자 타입 : " + evt['authorizedParticipantType']);
                             console.log("인증승인 참여자 ID : "  + evt['authorizedParticipantId']);
                             console.log("인증에셋 ID : " + getEvent['resumeAssetId']);

                              
		             if(evt['authorizedParticipantType'] == "Organization1"){
                                 addRequestUser.requestDetails = 
			          "자격증 이름 : " + evt['certificateName'] 
				+ " , 점수 : " + evt['certificateScore']
			        + " , 발급일 : " +  this.transferToDate(evt['dob'])
			        + " , 만료일 : " +  this.transferToDate(evt['expirationDate']);
                                 addRequestUser.targetParticipantType = NAMESPACE_ORG;
                
                             }
 
                             if(evt['authorizedParticipantType'] == "Organization2"){
                                 addRequestUser.requestDetails =
				   "대회명 : " + evt['contestName']
				 + " , 수상내역 : " + evt['awardGrade']
				 + " , 수상날짜 : " +  this.transferToDate(evt['dateOfAward'])
			         + " , 상세내용 : " + evt['description'];
                                 addRequestUser.targetParticipantType = NAMESPACE_ORG;
		         
                             }


                             if(evt['authorizedParticipantType'] == "Enterprise"){
                                 addRequestUser.requestDetails =
				 "회사명 : " +  evt['EnterpriseName']
				 + " , 직책 : " + evt['userPosition']
				 + " , 업무 : " + evt['performingTask']
				 + " , 입사일 : " +  this.transferToDate(evt['dateOfEmployment'])
				 + " , 퇴사일 : " +  this.transferToDate(evt['retirementDate']);
			
				;
                                 addRequestUser.targetParticipantType = NAMESPACE_ENT;
                                
                             }

                             if(evt['authorizedParticipantType'] == "School"){
                                addRequestUser.requestDetails =
				"학교명 : " +  evt['schoolName']
				+ ", 학점 : " + evt['gradeAverage'] 
				+ ", 전공 : " + evt['majorField']
				+ ", 입학일 : " +   this.transferToDate(evt['entranceDate'])
				+ ",  졸업일 : " +   this.transferToDate(evt['graduationDate']);
                                addRequestUser.targetParticipantType = NAMESPACE_SCH;     
                      
                             }


                            this.NetworkConnection.submitTransaction(addRequestUser);


                            let createAuthentication = factory.newTransaction('hansung.ac.kr.transaction', 'CreateAuthentication');
                    
                   
        	            createAuthentication.authorizedParticipantId = evt['authorizedParticipantId'];
                      
                            createAuthentication.resumeDetails = addRequestUser.requestDetails;
                        
                            createAuthentication.resumeAssetId =  addRequestUser.requestResumeAssetId;
        		     
                            createAuthentication.userId =  addRequestUser.requestUserId;

			
		            this.NetworkConnection.submitTransaction(createAuthentication);
             
			    console.log("");
			    console.log("AddRequestUser and CreateAuthentication is completed");
      			    console.log("");
			    console.log("--------------------------------------------------------------");
 
			}catch(err){
                          console.log("error in event.js : " + err);
                        }
                       
       })
     }


    transferToDate(target){

    if(target == null){
      return "";
    }


    var targetDate = new Date(target);
    var result = targetDate.getFullYear() + "년 " + targetDate.getMonth() + "월 " + targetDate.getDate() + "일";
     return result;
  }


}



var lnr = new SitechainListener();
lnr.init();
lnr.listen();
