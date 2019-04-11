import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { SchoolRoutingModule } from './School-routing.module';
import { SchoolComponent } from './School.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, SchoolRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [SchoolComponent]
})
export class SchoolModule {}
