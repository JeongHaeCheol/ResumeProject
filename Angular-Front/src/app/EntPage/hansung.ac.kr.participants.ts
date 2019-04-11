import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace hansung.ac.kr.participants{
   export class User extends Participant {
      userId: string;
      userName: string;
      dob: Date;
      address: string;
      phoneNumber: string;
      email: string;
      isPublic: boolean;
      isHuntingForJob: boolean;
   }
   export class Organization extends Participant {
      orgId: string;
      orgName: string;
      address: string;
      contactAdress: string;
      homepage: string;
      discription: string;
      requestResumeList: RequestResume[];

      
   }
   export class Enterprise extends Participant {
      entId: string;
      entName: string;
      address: string;
      contactAdress: string;
      hompage: string;
      numberOfemployees: string;
      sales: string;
      industryCategory: IndustryCategory;
      discription: string;
      requestResumeList: RequestResume[];
   }
   export class School extends Participant {
      schId: string;
      schName: string;
      address: string;
      contactAdress: string;
      hompage: string;
      requestResumeList: RequestResume[];
   }
   export class RequestResume {
      userId: string;
      requestDetails: string;
      participantType: string;
      requestResumeAssetId: string;
   }
   export enum IndustryCategory {
      Synthesis,
      ProduceAndChemistry,
      ServiceBusiness,
      BankFinancial,
      IT,
      Media,
      MedicalAndPharmaceuticals,
      Construction,
      SaleAndDistribution,
      Education,
   }
// }
