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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RequestResumeService } from './RequestResume.service';
import 'rxjs/add/operator/toPromise';
import { routerTransition } from '../../router.animations';
import { NullAstVisitor } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-RequestResume',
  templateUrl: './RequestResume.component.html',
  styleUrls: ['./RequestResume.component.css'],
  providers: [RequestResumeService],
  animations: [routerTransition()]

})
export class RequestResumeComponent implements OnInit {

  closeResult: string;
  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }
  myForm2: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  private txUpdateAuthentication;
  private txRevokeRequestUser;
  private myRequestResumeList;




  requestResumeList = new FormControl("", Validators.required);




  authorizedParticipantId = new FormControl("", Validators.required);



  resumeDetails = new FormControl("", Validators.required);



  resumeAssetId = new FormControl("", Validators.required);





  constructor(  private  modalService: NgbModal,

    private serviceRequestResume: RequestResumeService, fb: FormBuilder) {
   

    this.myForm2 = fb.group({


      authorizedParticipantId: this.authorizedParticipantId,



      resumeDetails: this.resumeDetails,



      resumeAssetId: this.resumeAssetId,

    });

  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {

    let tempList = [];
    return this.serviceRequestResume.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        console.log(Id[1]);
        this.currentId = Id[1];

        this.serviceRequestResume.getOrg(this.currentId) //   ** 여기서 ParticipantType에 따라 getOrg / getEnt/ getSch 선택
          .toPromise()
          .then((currentParticipant) => {
            this.myRequestResumeList = currentParticipant.requestResumeList;
          })
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }



	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }
  transferToDate(target : string): string{

    if(target == null){
      return null;
    }


    var targetDate = new Date(target);
    var options = {
      year: "numeric", month: "short", day: "numeric"
    };
    var result = targetDate.toLocaleDateString('ko-KR', options);
     return result;
  }
	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }
  updateAuthentication(ownerId: string, resumeDetails:string , resumeAssetId:string , approval:string) : Promise<any> {
    
    this.revokeRequestUser(resumeAssetId);

    
    this.txUpdateAuthentication = {
      $class: "hansung.ac.kr.assets.Authentication",
    
            "ownerId":ownerId,
          
        
    
          
            "resumeDetails":resumeDetails,
          
        
    
        
            "resumeAssetId":resumeAssetId,
          
        
    

            "approvalStatus":approval,


        
          
            "authorizedParticipantId":this.currentId,
          
        
    
        
          
            "authenticationTime":new Date().getTime()
          
        
    
    };
     return this.serviceRequestResume.updateAsset(resumeAssetId, this.txUpdateAuthentication)
		.toPromise()
		.then(() => {
      this.errorMessage = null;
    
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
        this.errorMessage = "경고 : 실패했습니다. (해당 사용자가 이력을 삭제 했을 수 있습니다.)  \n(요청 리스트에서 삭제됩니다 - 이 메세지를 다시보지 않기를 체크하시면 세션이 끊기기 전까지  이 경고를 볼 수 없습니다)"
        alert(this.errorMessage);
			}
			else{
				this.errorMessage = error;
			}
    });




  }

  revokeRequestUser(requestResumeAssetId:string): Promise<any> {
    this.txRevokeRequestUser = {
      $class : "hansung.ac.kr.transaction.RevokeRequestUser",


      "targetParticipantType": "hansung.ac.kr.participants.Organization",



      "targetParticipantId": this.currentId,



      "requestResumeAssetId": requestResumeAssetId

    }

    return this.serviceRequestResume.revokeRequestUser(this.txRevokeRequestUser)
    .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }



  setId(id: any): void {
    this.currentId = id;
  }

  

}
