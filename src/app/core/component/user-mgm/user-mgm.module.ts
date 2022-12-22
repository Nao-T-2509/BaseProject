import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMgmComponent } from './user-mgm.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleComponent } from './user-role/user-role.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './user-list/create-user/create-user.component';
import { ViewUpdateUserComponent } from './user-list/view-update-user/view-update-user.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerRequestComponent } from '../customer-request/customer-request.component';
import { CustomerDetailComponent } from '../customer-request/customer-detail/customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserMgmComponent,
    children: [
      {
        path: '',
        redirectTo: 'userList',
        pathMatch: 'full'
      },
      {
        path: 'userList',
        component: UserListComponent,
      },
      {
        path: 'customer',
        children: [
          {
            path: '',
            component: CustomerRequestComponent,
          }
        ]
      }
    ]
  }
]

@NgModule({
  declarations: [
    UserListComponent,
    UserRoleComponent ,
    UserMgmComponent,
    CreateUserComponent,
    ViewUpdateUserComponent
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserMgmModule { }
