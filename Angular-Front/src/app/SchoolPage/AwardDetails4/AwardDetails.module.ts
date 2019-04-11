import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { AwardDetailsRoutingModule } from './AwardDetails-routing.module';
import { AwardDetailsComponent } from './AwardDetails.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, AwardDetailsRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [AwardDetailsComponent]
})
export class AwardDetailsModule {}
