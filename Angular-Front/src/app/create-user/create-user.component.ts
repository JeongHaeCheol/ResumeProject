import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../router.animations';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [CreateUserService],
  animations: [routerTransition()]
})
export class CreateUserComponent implements OnInit {

  private isAuthentication;
  private currentType;
  private myForm: FormGroup;
  private tmpparticipant;

  userId = new FormControl("", Validators.required);
  userName = new FormControl("", Validators.required);
  dob = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  phoneNumber = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required);
  isPublic = new FormControl("", Validators.required);
  isHuntingForJob = new FormControl(false, Validators.required);
  participantsType = new FormControl(false, Validators.required);

  constructor(private createUserService: CreateUserService, fb: FormBuilder, public router : Router) {
    this.isAuthentication = null;
    this.currentType = null;
    this.myForm = fb.group({
      userId: this.userId,
      userName: this.userName,
      dob: this.dob,
      address: this.address,
      phoneNumber: this.phoneNumber,
      email: this.email,
      isPublic: this.isPublic,
      isHuntingForJob: this.isHuntingForJob,
      participantsType: this.participantsType
    });

  }
  ngOnInit() {
  }

  addParticipant(form: any) {
    this.tmpparticipant = {
      "userId": this.userId.value,
      "userName": this.userName.value,
      "dob": this.dob.value,
      "address": this.address.value,
      "phoneNumber": this.phoneNumber.value,
      "email": this.email.value,
      "isPublic": this.isPublic.value,
      "isHuntingForJob": this.isHuntingForJob.value
    };

    const participant = {

      userId: this.userId.value,
      userName: this.userName.value,
      $class: 'hansung.ac.kr.participants.User',
      dob: this.dob.value,
      address: this.address.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value,
      isPublic: this.isPublic.value,
      isHuntingForJob: this.isHuntingForJob.value
    }
    console.log(participant.$class);
    const issueParticipant = {
      participant: "hansung.ac.kr.participants.User#" + this.userId.value,
      userID: this.userId.value,
      options: {}
    };


    this.createUserService.addParticipant(participant)
      .then(() => {
        console.log(issueParticipant);
        return this.createUserService.issueParticipant(issueParticipant).then((result) => {
          return this.createUserService.importCard(result, this.userId.value).then(()=>{
            localStorage.setItem('istestin', 'true');
            this.router.navigate(['/dashboard2']);
          });
        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          alert('입력을 확인해 주세요');
        }
        else {
          alert('입력을 확인해 주세요');
        }
      });
  
    this.myForm.setValue({
      "userId": null,
      "userName": null,
      "dob": null,
      "address": null,
      "phoneNumber": null,
      "email": null,
      "isPublic": null,
      "isHuntingForJob": null,
      "participantsType": null
    });
  }

}
