import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard3' },
            { path: 'dashboard3', loadChildren: './dashboard3/dashboard.module#DashboardModule' },
            { path: 'Certificate3', loadChildren: './Certificate3/Certificate.module#CertificateModule' },
            { path: 'User3', loadChildren: './User3/User.module#UserModule' },
            { path: 'UserInfoInEnt3', loadChildren: './UserInfoInEnt3/UserInfoInEnt.module#UserInfoInEntModule' },
            { path: 'UserInfoInSch3', loadChildren: './UserInfoInSch3/UserInfoInSch.module#UserInfoInSchModule' },
            { path: 'School3', loadChildren: './School3/School.module#SchoolModule' },
            { path: 'ResumeInfoUser3', loadChildren: './ResumeInfoUser3/ResumeInfoUser.module#ResumeInfoUserModule' },
            { path: 'RequestResume3', loadChildren: './RequestResume3/RequestResume.module#RequestResumeModule' },
            { path: 'Organization3', loadChildren: './Organization3/Organization.module#OrganizationModule' },
            { path: 'Enterprise3', loadChildren: './Enterprise3/Enterprise.module#EnterpriseModule' },
            { path: 'AwardDetails3', loadChildren: './AwardDetails3/AwardDetails.module#AwardDetailsModule' },
            { path: 'Organization3Info', loadChildren: './Organization3Info/Organization.module#OrganizationModule' },
            { path: 'SearchtitleCer3', loadChildren: './SearchtitleCer3/Search.module#SearchModule' },
            { path: 'SearchtitleEnt3', loadChildren: './SearchtitleEnt3/Enterprise.module#EnterpriseModule' },
            { path: 'SearchtitleSch3', loadChildren: './SearchtitleSch3/School.module#SchoolModule' },
            { path: 'SearchtitleOrg3', loadChildren: './SearchtitleOrg3/Organization.module#OrganizationModule' },
            { path: 'SearchtitleUser3', loadChildren: './SearchtitleUser3/User.module#UserModule' }



        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
