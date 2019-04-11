import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { CertificateRoutingModule } from './Certificate-routing.module';
import { CertificateComponent } from './Certificate.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, CertificateRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [CertificateComponent]
})
export class CertificateModule {
    
}
