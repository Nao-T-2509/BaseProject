import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/guard.guard';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../core/component/component.module';

const routes: Routes = [
  {
    path: '',
    children: [
      //Sử dụng PasswordFlow
      {
        path: 'auth',
        loadChildren: () => import('../layout/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
      },
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: 'pages',
        loadChildren: () => import('../layout/main-layout/main-layout.module').then(m => m.MainLayoutModule),
        canActivate : [AuthGuard]
      }, 
      
      //Sử dụng sso
      // {
      //   path: 'pages',
      //   loadChildren: () => import('../layout/main-layout/main-layout.module').then(m => m.MainLayoutModule)
      // },  
      // {
      //   path: '**',
      //   redirectTo: 'pages',
      //   pathMatch: 'full'
      // },
    ]
  }
]

@NgModule({
  declarations: [
    MainLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ComponentModule
  ]
})
export class LayoutModule { }
