import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { UserInfoInEntRoutingModule } from './UserInfoInEnt-routing.module';
import { UserInfoInEntComponent } from './UserInfoInEnt.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, UserInfoInEntRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [UserInfoInEntComponent]
})
export class UserInfoInEntModule {}
