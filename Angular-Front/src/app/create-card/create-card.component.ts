import { Component, OnInit } from '@angular/core';
import { CreateCardService } from './create-card.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
  providers: [CreateCardService, DataService],
  animations: [routerTransition()]
})
export class CreateCardComponent implements OnInit {

  private isAuthentication;

  constructor(private createCardService: CreateCardService, fb: FormBuilder, public router : Router) {
  }

  ngOnInit(): void {
    this.systemPing();
  }
  systemPing(): Promise<any> {
    return this.createCardService.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        console.log(result);
        Id = result['participant'];
        console.log(Id);
        if (Id == null) {
          return;
        }
        else {

          let types = Id.split('.');
          let temptype = types[4]; //with name
          let nametype = temptype.split('#');
          let type = nametype[0];
          console.log('type===  ' + type);

          if(type=='Organization'){

            localStorage.setItem('isOrgin', 'true');
            this.router.navigate(['/dashboard3']);

          }else if(type=='User'){

            localStorage.setItem('istestin', 'true');
            this.router.navigate(['/dashboard2']);

          }else if(type=='School'){

            localStorage.setItem('isSchin', 'true');
            this.router.navigate(['/dashboard4']);

          }else if(type=='Enterprise'){
            
            localStorage.setItem('isEntin', 'true');
            this.router.navigate(['/dashboard5']);
          }
        }
        this.isAuthentication = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
