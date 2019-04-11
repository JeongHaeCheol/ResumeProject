import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { RequestResumeRoutingModule } from './RequestResume-routing.module';
import { RequestResumeComponent } from './RequestResume.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, RequestResumeRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [RequestResumeComponent]
})
export class RequestResumeModule {}
