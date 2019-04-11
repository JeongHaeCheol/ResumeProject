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
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { CertificateService } from './Certificate.service';
import 'rxjs/add/operator/toPromise';
import { NullAstVisitor } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';

@Component({
	selector: 'app-Certificate',
	templateUrl: './Certificate.component.html',
	styleUrls: ['./Certificate.component.css'],
  providers: [CertificateService],
  animations: [routerTransition()]

})
export class CertificateComponent implements OnInit {
  
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
  private myCertificateList;
  private myAuthenticationList;
  private isAuthentication;



  assetId = new FormControl("test", Validators.required);



  ownerId = new FormControl("test", Validators.required);



  certificateName = new FormControl("", Validators.required);



  certificateScore = new FormControl("", Validators.required);



  authorizedParticipantId = new FormControl("", Validators.required);



  organizationName = new FormControl("", Validators.required);



  dob = new FormControl("", Validators.required);



  expirationDate = new FormControl("", Validators.required);



  transactionTime = new FormControl("", Validators.required);



  isPublic = new FormControl("", Validators.required);



  userId = new FormControl("test", Validators.required);



  transactionId = new FormControl("", Validators.required);



  timestamp = new FormControl("", Validators.required);




  constructor(    private  modalService: NgbModal,
    private serviceCertificate: CertificateService, fb: FormBuilder) {
    this.myForm = fb.group({


      assetId: this.assetId,



      ownerId: this.ownerId,



      certificateName: this.certificateName,



      certificateScore: this.certificateScore,



      authorizedParticipantId: this.authorizedParticipantId,



      organizationName: this.organizationName,



      dob: this.dob,



      expirationDate: this.expirationDate,



      transactionTime: this.transactionTime,



      isPublic: this.isPublic,



    });
    this.myForm2 = fb.group({


      certificateName: this.certificateName,



      certificateScore: this.certificateScore,



      authorizedParticipantId: this.authorizedParticipantId,



      organizationName: this.organizationName,



      dob: this.dob,



      expirationDate: this.expirationDate,



      isPublic: this.isPublic,



      userId: this.userId



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
  authenticationExist(approvalStatus : string){
    this.isAuthentication = approvalStatus;

  }

  printAuthentication(){

   return this.isAuthentication;
  }



  ngOnInit(): void {
    this.loadAll();
  }


  getMyCertificateList(): Promise<any> {
    return   this.serviceCertificate.getSystemQueryCertificate("targetUserId", this.currentId)
    .toPromise()
    .then((certificateList) => {
      this.myCertificateList = certificateList;
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
    return   this.serviceCertificate.getSystemQueryAuthentication("targetUserId", this.currentId)
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




  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCertificate.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        this.currentId = Id[1];

  
        this.getMyCertificateList();
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
      $class: "hansung.ac.kr.transaction.CreateCertificate",


      "certificateName": this.certificateName.value,



      "certificateScore": this.certificateScore.value,



      "authorizedParticipantId": this.authorizedParticipantId.value,



      "organizationName": this.organizationName.value,



      "dob": this.dob.value,



      "isPublic": this.isPublic.value,



      "userId": this.userId.value,


    };


    if(this.expirationDate.value != null && this.expirationDate.value != "")
	this.Transaction.expirationDate = this.expirationDate.value; 



    this.myForm2.setValue({


      "certificateName": null,



      "certificateScore": null,



      "authorizedParticipantId": null,



      "organizationName": null,



      "dob": null,



      "expirationDate": null,



      "isPublic": false,



      "userId": null,


    });

    return this.serviceCertificate.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        
        
        this.loadAll();
        this.errorMessage = null;
        this.myForm2.setValue({


          "certificateName": null,



          "certificateScore": null,



          "authorizedParticipantId": null,



          "organizationName": null,



          "dob": null,



          "expirationDate": null,



          "isPublic": false,



          "userId": null,


        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
        }
      });


  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.Certificate",



      "ownerId": this.ownerId.value,





      "certificateName": this.certificateName.value,





      "certificateScore": this.certificateScore.value,





      "authorizedParticipantId": this.authorizedParticipantId.value,





      "organizationName": this.organizationName.value,





      "dob": this.dob.value,





      "expirationDate": this.expirationDate.value,





      "transactionTime": this.transactionTime.value,





      "isPublic": this.isPublic.value



    };

    return this.serviceCertificate.updateAsset(form.get("assetId").value, this.asset)
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
          this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
        }
      });
  }


  deleteAsset(): Promise<any> {
    console.log(this.currentId);
    return this.serviceCertificate.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.loadAll();
        this.errorMessage = null;
        this.deleteAsset2();
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

  deleteAsset2(): Promise<any> {
    return this.serviceCertificate.deleteAsset2(this.currentId)
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




  setId(id: any): void {
    this.currentId = id;
    console.log("aaaa");
  }

  getForm(id: any): Promise<any> {

    return this.serviceCertificate.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "assetId": null,



          "ownerId": null,



          "certificateName": null,



          "certificateScore": null,



          "authorizedParticipantId": null,



          "organizationName": null,



          "dob": null,



          "expirationDate": null,



          "transactionTime": null,



          "isPublic": false


        };




        if (result.assetId) {

          formObject.assetId = result.assetId;

        } else {
          formObject.assetId = null;
        }

        if (result.ownerId) {

          formObject.ownerId = result.ownerId;

        } else {
          formObject.ownerId = null;
        }

        if (result.certificateName) {

          formObject.certificateName = result.certificateName;

        } else {
          formObject.certificateName = null;
        }

        if (result.certificateScore) {

          formObject.certificateScore = result.certificateScore;

        } else {
          formObject.certificateScore = null;
        }

        if (result.authorizedParticipantId) {

          formObject.authorizedParticipantId = result.authorizedParticipantId;

        } else {
          formObject.authorizedParticipantId = null;
        }

        if (result.organizationName) {

          formObject.organizationName = result.organizationName;

        } else {
          formObject.organizationName = null;
        }

        if (result.dob) {

          formObject.dob = result.dob;

        } else {
          formObject.dob = null;
        }

        if (result.expirationDate) {

          formObject.expirationDate = result.expirationDate;

        } else {
          formObject.expirationDate = null;
        }

        if (result.transactionTime) {

          formObject.transactionTime = result.transactionTime;

        } else {
          formObject.transactionTime = null;
        }

        if (result.isPublic) {

          formObject.isPublic = result.isPublic;

        } else {
          formObject.isPublic = false;
        }


        this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({


      "assetId": null,



      "ownerId": null,



      "certificateName": null,



      "certificateScore": null,



      "authorizedParticipantId": null,



      "organizationName": null,



      "dob": null,



      "expirationDate": null,



      "transactionTime": null,



      "isPublic": false


    });
  }

}
