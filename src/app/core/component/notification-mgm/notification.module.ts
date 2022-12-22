import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationMgmComponent } from './notification-mgm.component';
import { NotiListComponent } from './noti-list/noti-list.component';
import { CreateNotiComponent } from './noti-list/create-noti/create-noti.component';
import { ReviewListSentComponent } from './noti-list/review-list-sent/review-list-sent.component';
import { ViewEditNotiComponent } from './noti-list/view-edit-noti/view-edit-noti.component';
import { PreviewNotiOnScreenComponent } from './noti-list/preview-noti-on-screen/preview-noti-on-screen.component';

const notiRoutes: Routes = [
  {
    path: '',
    component: NotificationMgmComponent,
    children: [
      {
        path: 'notiList',
        component: NotiListComponent
      },
      {
        path: 'createNoti',
        component: CreateNotiComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    CreateNotiComponent,
    ReviewListSentComponent,
    ViewEditNotiComponent,
    PreviewNotiOnScreenComponent,
    NotificationMgmComponent,
    NotiListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(notiRoutes)
  ]
})
export class NotificationModule { }
