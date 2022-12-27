import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DecentralizationComponent } from './decentralization/decentralization.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleMgmComponent } from './role-mgm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewAdminListComponent } from './admin-list/view-admin-list/view-admin-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    RoleMgmComponent,
    ViewAdminListComponent
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    RouterModule.forChild(roleRoutes),
    SharedModule
  ],
  exports: [
    AdminListComponent,
    ViewAdminListComponent,
    DecentralizationComponent
  ]
})
export class RoleMgmModule { }
