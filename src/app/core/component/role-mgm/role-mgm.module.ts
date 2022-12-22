import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DecentralizationComponent } from './decentralization/decentralization.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleMgmComponent } from './role-mgm.component';
import { SharedModule } from 'src/app/shared/shared.module';

const roleRoutes: Routes = [
  {
    path: '',
    component: RoleMgmComponent,
    children: [
      {
        path: '',
        redirectTo: 'adminList',
        pathMatch: 'full'
      },
      {
        path: 'adminList',
        component: AdminListComponent,
      },
      {
        path: 'decentralization',
        component: DecentralizationComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminListComponent,
    DecentralizationComponent,
    RoleMgmComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes),
    SharedModule
  ],
  exports: [
    AdminListComponent,
    DecentralizationComponent
  ]
})
export class RoleMgmModule { }
