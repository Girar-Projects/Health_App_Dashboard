import { NgModule } from '@angular/core';
// import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';
import { MatTableModule } from '@angular/material/table';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { SETTINGS as USE_FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { IconModule } from '@coreui/icons-angular';
import { AuthService } from './shared/services/auth.service';
import { ToasterService } from './shared/services/toaster.service';
import { LoginComponent } from './pages/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './pages/register/register.component';
import { Page404Component } from './pages/page404/page404.component';
import { Page500Component } from './pages/page500/page500.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/forget-password/forget-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { NewProfessionalComponent } from './dashboard/customers/new-professional/new-professional.component';
import { NewOrganizationComponent } from './dashboard/customers/new-organization/new-organization.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CustomersService } from './shared/services/customers.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SendMessageComponent } from './dashboard/customers/send-message/send-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectUsersListComponent } from './dashboard/customers/send-message/select-users-list/select-users-list.component';
import { PreferenceComponent } from './preference/preference.component';
import { TemplatesListComponent } from './preference/templates-list/templates-list.component';
import { AddTemplateComponent } from './preference/templates-list/add-template/add-template.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddPhaseComponent } from './preference/phases-list/add-phase/add-phase.component';
import { PhasesListComponent } from './preference/phases-list/phases-list.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { DialogComponent } from './shared/dialog/dialog.component';
import { SetAppointmentComponent } from './dashboard/customers/set-appointment/set-appointment.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { EditTemplateComponent } from './preference/templates-list/edit-template/edit-template.component';
import { EditPhaseComponent } from './preference/phases-list/edit-phase/edit-phase.component';
// import { EditProfessionalComponent } from './dashboard/customers/edit-professional/edit-professional.component';
import { EditOrganizationComponent } from './dashboard/customers/edit-organization/edit-organization.component';
import { EditProfessionalComponent } from './dashboard/customers/edit-professional/edit-professional.component';
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ...APP_CONTAINERS,
    CustomersComponent,
    NewProfessionalComponent,
    NewOrganizationComponent,
    SendMessageComponent,
    SelectUsersListComponent,
    PreferenceComponent,
    TemplatesListComponent,
    AddTemplateComponent,
    AddPhaseComponent,
    PhasesListComponent,
    DialogComponent,
    SetAppointmentComponent,
    ProfileDetailComponent,
    EditTemplateComponent,
    EditPhaseComponent,
    EditProfessionalComponent,
    EditOrganizationComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    FormsModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EditorModule,
    MatProgressBarModule
    
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    {
      provide: USE_FIRESTORE_SETTINGS,
      useValue: { experimentalForceLongPolling: true },
    },
    Title,
    AuthService,
    ToasterService,
    CustomersService,

    // {
    // provide: LocationStrategy,
    // useClass: HashLocationStrategy,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
