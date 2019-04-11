import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoInEntComponent } from './UserInfoInEnt.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
    

    const routes: Routes = [
    {
        path: '',
        component: UserInfoInEntComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserInfoInEntRoutingModule {}
