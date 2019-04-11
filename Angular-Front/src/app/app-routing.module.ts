import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { CreateEnterpriseComponent } from './create-enterprise/create-enterprise.component';


const routes: Routes = [
    //{ path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: './UserPage/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: './OrgPage/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: './EntPage/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: './SchoolPage/layout.module#LayoutModule', canActivate: [AuthGuard] },

    // { path: '', loadChildren: './layout3/layout.module#LayoutModule', canActivate: [AuthGuard] },
    // { path: '', loadChildren: './layout4/layout.module#LayoutModule', canActivate: [AuthGuard] },

    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },

    { path: 'Create-Card', component: CreateCardComponent },
    { path: 'Create-User', component: CreateUserComponent },
    { path: 'Create-Organization', component: CreateOrganizationComponent },
    { path: 'Create-School', component: CreateSchoolComponent },
    { path: 'Create-Enterprise', component: CreateEnterpriseComponent },


    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
