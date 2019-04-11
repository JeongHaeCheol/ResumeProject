import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { OrganizationRoutingModule } from './Organization-routing.module';
import { OrganizationComponent } from './Organization.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, OrganizationRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [OrganizationComponent]
})
export class OrganizationModule {}
