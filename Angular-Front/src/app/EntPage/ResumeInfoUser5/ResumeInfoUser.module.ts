import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { ResumeInfoUserRoutingModule } from './ResumeInfoUser-routing.module';
import { ResumeInfoUserComponent } from './ResumeInfoUser.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, ResumeInfoUserRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [ResumeInfoUserComponent]
})
export class ResumeInfoUserModule {}
