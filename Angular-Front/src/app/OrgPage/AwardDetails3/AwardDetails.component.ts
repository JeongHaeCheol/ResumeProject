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
import { AwardDetailsService } from './AwardDetails.service';
import 'rxjs/add/operator/toPromise';
import { routerTransition } from '../../router.animations';
import { NullAstVisitor } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-AwardDetails',
	templateUrl: './AwardDetails.component.html',
	styleUrls: ['./AwardDetails.component.css'],
  providers: [AwardDetailsService],
  animations: [routerTransition()]

})
export class AwardDetailsComponent implements OnInit {
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
  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  private myAwardDetailsList;
  private myAuthenticationList;
  private isAuthentication;

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          contestName = new FormControl("", Validators.required);
        
  
      
          authorizedParticipantId = new FormControl("", Validators.required);
        
  
      
          organizationName = new FormControl("", Validators.required);
        
  
      
          dateOfAward = new FormControl("", Validators.required);
        
  
      
          transactionTime = new FormControl("", Validators.required);
        
  
      
          awardGrade = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);



          userId  = new FormControl("test",Validators.required);
        
      
        
          transactionId  = new FormControl("",Validators.required);
        
      
        
          timestamp  = new FormControl("",Validators.required);
        
  


  constructor(private  modalService: NgbModal,private serviceAwardDetails:AwardDetailsService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          ownerId:this.ownerId,
        
    
        
          contestName:this.contestName,
        
    
        
          authorizedParticipantId:this.authorizedParticipantId,
        
    
        
          organizationName:this.organizationName,
        
    
        
          dateOfAward:this.dateOfAward,
        
    
        
          transactionTime:this.transactionTime,
        
    
        
          awardGrade:this.awardGrade,
        
    
        
          description:this.description,
        
    
        
          isPublic:this.isPublic
        
    
    });



    this.myForm2 = fb.group({
    
      contestName:this.contestName,
        
    
        
      authorizedParticipantId:this.authorizedParticipantId,
    

    
      organizationName:this.organizationName,
    

    
      dateOfAward:this.dateOfAward,
    

    
      awardGrade:this.awardGrade,
    

    
      description:this.description,
    

    
      isPublic:this.isPublic,
    

    
      userId:this.userId,
    


});
  };



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


  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAwardDetails.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        this.currentId = Id[1];

  
        this.getMyAwardDetailsList();
      })

      .catch((error) => {
          if(error == 'Server error'){
              this.errorMessage = "Could not connect to REST server. Please check your configuration details";
          }
          else if(error == '404 - Not Found'){
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
              this.errorMessage = error;
          }
      });


  }



  authenticationExist(approvalStatus : string){
    this.isAuthentication = approvalStatus;

  }

  printAuthentication(){

   return this.isAuthentication;
  }







  getMyAwardDetailsList(): Promise<any> {
    return   this.serviceAwardDetails.getSystemQueryAwardDetails("targetUserId", this.currentId)
    .toPromise()
    .then((awardDetailsList) => {
      this.myAwardDetailsList = awardDetailsList;
      this.getMyAuthenticationList();
    })
    .catch((error) => {
      console.log(error);
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


  getMyAuthenticationList(): Promise<any> {
    return   this.serviceAwardDetails.getSystemQueryAuthentication("targetUserId", this.currentId)
    .toPromise()
    .then((authenticationList) => {
      this.myAuthenticationList = authenticationList;
    })
    .catch((error) => {
      console.log(error);
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
   * @param {String} name - the name of the asset field to update
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

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }



  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "hansung.ac.kr.transaction.CreateAwardDetails",
      
        
          "contestName":this.contestName.value,
        
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "organizationName":this.organizationName.value,
        
      
        
          "dateOfAward":this.dateOfAward.value,
        
      
        
          "awardGrade":this.awardGrade.value,
        
      
        
          "description":this.description.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value
        
      
      
    };

    this.myForm2.setValue({
      
        
          "contestName":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
          "isPublic":false,
        
      
        
          "userId":null
        
      
  
      
    });

    return this.serviceAwardDetails.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.loadAll();
			this.errorMessage = null;
      this.myForm2.setValue({
      
        
          "contestName":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
          "isPublic":false,
        
      
        
          "userId":null
        

      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
          this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
        }
    });
  }




   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.AwardDetails",
      
        
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "contestName":this.contestName.value,
          
        
    
        
          
            "authorizedParticipantId":this.authorizedParticipantId.value,
          
        
    
        
          
            "organizationName":this.organizationName.value,
          
        
    
        
          
            "dateOfAward":this.dateOfAward.value,
          
        
    
        
          
            "transactionTime":this.transactionTime.value,
          
        
    
        
          
            "awardGrade":this.awardGrade.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "isPublic":this.isPublic.value
          
        
    
    };

    return this.serviceAwardDetails.updateAsset(form.get("assetId").value,this.asset)
		.toPromise()
		.then(() => {
      this.loadAll();
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAwardDetails.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
      this.loadAll();
      this.errorMessage = null;
      this.deleteAsset2();
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }



  deleteAsset2(): Promise<any> {
    return this.serviceAwardDetails.deleteAsset2(this.currentId)
      .toPromise()
      .then(() => {
        this.loadAll();
        this.errorMessage = null;
       
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





  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceAwardDetails.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "contestName":null,
          
        
          
            "authorizedParticipantId":null,
          
        
          
            "organizationName":null,
          
        
          
            "dateOfAward":null,
          
        
          
            "transactionTime":null,
          
        
          
            "awardGrade":null,
          
        
          
            "description":null,
          
        
          
            "isPublic":false 
          
        
      };



      
        if(result.assetId){
          
            formObject.assetId = result.assetId;
          
        }else{
          formObject.assetId = null;
        }
      
        if(result.ownerId){
          
            formObject.ownerId = result.ownerId;
          
        }else{
          formObject.ownerId = null;
        }
      
        if(result.contestName){
          
            formObject.contestName = result.contestName;
          
        }else{
          formObject.contestName = null;
        }
      
        if(result.authorizedParticipantId){
          
            formObject.authorizedParticipantId = result.authorizedParticipantId;
          
        }else{
          formObject.authorizedParticipantId = null;
        }
      
        if(result.organizationName){
          
            formObject.organizationName = result.organizationName;
          
        }else{
          formObject.organizationName = null;
        }
      
        if(result.dateOfAward){
          
            formObject.dateOfAward = result.dateOfAward;
          
        }else{
          formObject.dateOfAward = null;
        }
      
        if(result.transactionTime){
          
            formObject.transactionTime = result.transactionTime;
          
        }else{
          formObject.transactionTime = null;
        }
      
        if(result.awardGrade){
          
            formObject.awardGrade = result.awardGrade;
          
        }else{
          formObject.awardGrade = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.isPublic){
          
            formObject.isPublic = result.isPublic;
          
        }else{
          formObject.isPublic = false;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "contestName":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "transactionTime":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
          "isPublic":false 
        
      
      });
  }

}
