import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { EnterpriseRoutingModule } from './Enterprise-routing.module';
import { EnterpriseComponent } from './Enterprise.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, EnterpriseRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [EnterpriseComponent]
})
export class EnterpriseModule {}
