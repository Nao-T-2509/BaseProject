import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './password/change-password/change-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { VerifyComponent } from './password/forgot-password/verify/verify.component';
import { NotiComponent } from './noti/noti.component';
import { CustomerRequestComponent } from './customer-request/customer-request.component';
import { CustomerDetailComponent } from './customer-request/customer-detail/customer-detail.component';
import { UnlocktransactionComponent } from './unlock-transaction/unlocktransaction.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    NotiComponent,
    VerifyComponent,
    CustomerRequestComponent,
    CustomerDetailComponent,
    UnlocktransactionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    LoginComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class ComponentModule { }
