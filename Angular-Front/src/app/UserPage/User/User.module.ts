import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { UserRoutingModule } from './User-routing.module';
import { UserComponent } from './User.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, UserRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [UserComponent]
})
export class UserModule {}
