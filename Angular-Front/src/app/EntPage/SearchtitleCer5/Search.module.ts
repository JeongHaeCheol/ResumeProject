import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { SearchRoutingModule } from './Search-routing.module';
import { SearchComponent } from './Search.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, SearchRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [SearchComponent]
})
export class SearchModule {}
