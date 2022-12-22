import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainLayoutComponent } from './main-layout.component';
import { UnlocktransactionComponent } from 'src/app/core/component/unlock-transaction/unlocktransaction.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'userMGM',
        loadChildren: () => import('./../../core/component/user-mgm/user-mgm.module').then(module => module.UserMgmModule)
      },
      {
        path: '',
        redirectTo: 'userMGM',
        pathMatch: 'full'
      },
      {
        path: 'unlockTransaction',
        component: UnlocktransactionComponent
      },
      {
        path: 'noti',
        loadChildren: () => import('./../../core/component/notification-mgm/notification.module').then(module => module.NotificationModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./../../core/component/role-mgm/role-mgm.module').then(module => module.RoleMgmModule)
      }
    ],
  }, 
  
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MainLayoutModule { }
