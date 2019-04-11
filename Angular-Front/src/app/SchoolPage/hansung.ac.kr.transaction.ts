import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Certificate,AwardDetails,UserInfoInEnt,UserInfoInSch} from './hansung.ac.kr.assets';
// export namespace hansung.ac.kr.transaction{
   export abstract class TxForOrg extends Transaction {
      orgId: string;
   }
   export abstract class TxForEnt extends Transaction {
      entId: string;
   }
   export abstract class TxForSch extends Transaction {
      schId: string;
   }
   export abstract class TxForUser extends Transaction {
      userId: string;
      authorizedParticipantType: string;
   }
   export class AddRequestUser extends Transaction {
      requestUserId: string;
      requestDetails: string;
      targetParticipantId: string;
      targetParticipantType: string;
      requestResumeAssetId: string;
   }
   export class RevokeRequestUser extends TxForUser {
    targetargetParticipantType: string;
    targetParticipantId: string;
    requestResumeAssetId: string;
   }
   export class CreateAuthentication extends TxForUser {
      authorizedParticipantId: string;
      resumeDetails: string;
      resumeAssetId: string;
   }
   export class CreateResumeInfoUser extends TxForUser {
      dob: Date;
      name: string;
      supportField: string;
      salaryRequirement: string;
      majorActivities: string;
      socialExperience: string;
      skillsAndCapabilities: string;
      isPublic: boolean;
   }
   export class CreateCertificate extends TxForUser {
      certificateName: string;
      certificateScore: number;
      authorizedParticipantId: string;
      organizationName: string;
      dob: Date;
      expirationDate: Date;
      isPublic: boolean;
   }
   export class CreateAwardDetails extends TxForUser {
      contestName: string;
      authorizedParticipantId: string;
      organizationName: string;
      dateOfAward: Date;
      awardGrade: string;
      description: string;
      isPublic: boolean;
   }
   export class CreateUserInfoInEnt extends TxForUser {
      authorizedParticipantId: string;
      enterpriseName: string;
      userPosition: string;
      performingTask: string;
      dateOfEmployment: Date;
      retirementDate: Date;
      isPublic: boolean;
   }
   export class CreateUserInfoInSch extends TxForUser {
      authorizedParticipantId: string;
      schoolName: string;
      entranceDate: Date;
      graduationDate: Date;
      majorField: string;
      gradeAverage: number;
      isPublic: boolean;
   }
   export class SendEvent extends Event {
      certificate: Certificate;
      awardDetails: AwardDetails;
      userInfoInEnt: UserInfoInEnt;
      userInfoInSch: UserInfoInSch;
      txForUser: TxForUser;
      resumeAssetId: string;
   }
   export class UserEvent extends Event {
      txForUser: TxForUser;
   }
   export class OrganizationEvent extends Event {
      txForOrg: TxForOrg;
   }
   export class EnterpriseEvent extends Event {
      txForEnt: TxForEnt;
   }
   export class SchoolEvent extends Event {
      txForSch: TxForSch;
   }
// }
