import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard2' },
            { path: 'dashboard2', loadChildren: './dashboard2/dashboard.module#DashboardModule' },
            { path: 'Certificate', loadChildren: './Certificate/Certificate.module#CertificateModule' },
            { path: 'User', loadChildren: './User/User.module#UserModule' },
            { path: 'UserInfoInEnt', loadChildren: './UserInfoInEnt/UserInfoInEnt.module#UserInfoInEntModule' },
            { path: 'UserInfoInSch', loadChildren: './UserInfoInSch/UserInfoInSch.module#UserInfoInSchModule' },
            { path: 'School', loadChildren: './School/School.module#SchoolModule' },
            { path: 'ResumeInfoUser', loadChildren: './ResumeInfoUser/ResumeInfoUser.module#ResumeInfoUserModule' },
            { path: 'RequestResume', loadChildren: './RequestResume/RequestResume.module#RequestResumeModule' },
            { path: 'Organization', loadChildren: './Organization/Organization.module#OrganizationModule' },
            { path: 'Enterprise', loadChildren: './Enterprise/Enterprise.module#EnterpriseModule' },
            { path: 'AwardDetails', loadChildren: './AwardDetails/AwardDetails.module#AwardDetailsModule' },
            { path: 'SearchtitleCer', loadChildren: './SearchtitleCer/Search.module#SearchModule' },
            { path: 'SearchtitleEnt', loadChildren: './SearchtitleEnt/Enterprise.module#EnterpriseModule' },
            { path: 'SearchtitleSch', loadChildren: './SearchtitleSch/School.module#SchoolModule' },
            { path: 'SearchtitleOrg', loadChildren: './SearchtitleOrg/Organization.module#OrganizationModule' },
            { path: 'SearchtitleUser', loadChildren: './SearchtitleUser/User.module#UserModule' }



        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
