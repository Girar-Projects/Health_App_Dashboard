import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './pages/page404/page404.component';
import { Page500Component } from './pages/page500/page500.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { NewProfessionalComponent } from './dashboard/customers/new-professional/new-professional.component';
import { NewOrganizationComponent } from './dashboard/customers/new-organization/new-organization.component';
import { TemplatesListComponent } from './preference/templates-list/templates-list.component';
import { AddTemplateComponent } from './preference/templates-list/add-template/add-template.component';
import { AddPhaseComponent } from './preference/phases-list/add-phase/add-phase.component';
import { PhasesListComponent } from './preference/phases-list/phases-list.component';
import { PreferenceComponent } from './preference/preference.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        component: PreferenceComponent,canActivate: [AuthGuard],
      },
      {
        path: 'customers-list',
        component: CustomersComponent,canActivate: [AuthGuard],
      },
      {
        path: 'add-professional',
        component: NewProfessionalComponent,canActivate: [AuthGuard],
      },
      {
        path: 'add-recruiter',
        component: NewOrganizationComponent,canActivate: [AuthGuard],
      },
      {
        path: 'manage-templates',
        component: TemplatesListComponent,canActivate: [AuthGuard],
      },
 
      {
        path: 'manage-statuses',
        component: PhasesListComponent,canActivate: [AuthGuard],
      },

      
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'forgetPassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'Password Reset Page'
    }
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    data: {
      title: 'Email Verification'
    }
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
