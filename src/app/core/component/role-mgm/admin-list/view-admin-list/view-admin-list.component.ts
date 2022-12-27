import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/core/service/blog.service';
import { QuestionService } from 'src/app/core/service/question.service';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';
import { NotiComponent } from '../../../noti/noti.component';

@Component({
  selector: 'app-view-admin-list',
  templateUrl: './view-admin-list.component.html',
  styleUrls: ['./view-admin-list.component.scss']
})
export class ViewAdminListComponent implements OnInit {

  user: any;
  active: any;
  rolelist: any = [];
  now = new Date;
  listnoti: any = [];
  authorities: any = [];
  isEditMode= false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: any}, private blogService: BlogService, private questionService: QuestionService,
  public datepipe: DatePipe, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ViewAdminListComponent>, private roleService: RoleService) { }

  ngOnInit(): void {
  console.log(this.data.id);

    this.questionService.getQuestioDetail(this.data.id).subscribe(data => {
      console.log(data);
      
      this.user = data[0];
      if (data.activated == true) {
        this.active = 'Active'
      }
      else {
        this.active = 'Deactive'
      }
    },
      (error: any) => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 3000,
          data: {
            message: 'User không tồn tại',
            status: true
          }
        })
        this.dialogRef.close()
    })
    
  }

  UserDetail(userdetail: any) {
    this.now = new Date;
    this.now.setHours(this.now.getHours() + 7)
    const user = {
      id: this.user._id,
      tenDangNhap: this.user.tenDangNhap,
      hoVaTen: this.user.hoVaTen,
      maLienHe: this.user.maLienHe,
      moTa: this.user.moTa,
      anhDaiDien: this.user.anhDaiDien,
      matKhau: this.user.matKhau,
      danhSachCauHoiTheoDoi: this.user.danhSachCauHoiTheoDoi,
      laNguoiDung: this.user.laNguoiDung,
      // activated: this.user.activated,
      // activationKey: this.user.activationKey,
      // langKey: this.user.langKey,
      // createdBy: this.user.createdBy,
      // createdDate: this.user.createdDate,
      // lastModifiedBy: this.user.lastModifiedBy,
      // lastModifiedDate: this.user.lastModifiedDate,
      // authorities: this.authorities[0] || this.user.authorities
    }
    console.log(user)
    console.log(this.user._id.$id)
    this.questionService.update(this.user._id.$id, user).subscribe(
      data => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Cập nhật thông tin thành công',
            status: true
          }
        })
      },
      (error: any) => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Cập nhật thông tin thất bại',
            status: false
          }
        })
      },
      () => {
        setTimeout(() => {
          this.dialogRef.close({ isCloseDialog: true });
        }, 200);
      })
  }

}
