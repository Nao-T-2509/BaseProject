import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/core/component/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentModule } from 'src/app/core/component/component.module';
import { ForgotPasswordComponent } from 'src/app/core/component/password/forgot-password/forgot-password.component';
import { VerifyComponent } from 'src/app/core/component/password/forgot-password/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verify',
        component: VerifyComponent
      }
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthLayoutModule { }
