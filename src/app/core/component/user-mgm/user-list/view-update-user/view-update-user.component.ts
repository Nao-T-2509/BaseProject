import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RoleService } from 'src/app/core/service/role.service';
import { NotiComponent } from '../../../noti/noti.component';


@Component({
  selector: 'app-view-update-user',
  templateUrl: './view-update-user.component.html',
  styleUrls: ['./view-update-user.component.scss']
})
export class ViewUpdateUserComponent implements OnInit {
  user: any;
  active: any;
  rolelist: any = [];
  now = new Date;
  listnoti: any = [];
  authorities: any = [];
  isEditMode= false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {tenDangNhap: any},  private userService: UserService, public datepipe: DatePipe, 
  private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ViewUpdateUserComponent>, private roleService: RoleService) { }

  ngOnInit(): void {
    // get list role
    // this.roleService.GetRoleList().subscribe(data => {
    //   data.forEach((element: any) => {
    //     this.rolelist.push(element);
    //   });
    // })
    this.userService.getDetail(this.data.tenDangNhap).subscribe(data => {
      this.user = data[0];
      // console.log(data[0])
      // this.authorities.push(data.authorities)
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
    this.userService.update(this.user._id.$id, user).subscribe(
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

  // DeActiveUser() {
  //   this.userService.DeActiveUser(this.user.id).subscribe(
  //     data => {
  //       this._snackBar.openFromComponent(NotiComponent, {
  //         duration: 1000,
  //         data: {
  //           message: 'Bạn đã Deactived thẻ thành công',
  //           status: true
  //         },
  //       });
  //     },
  //     err => {
  //       this._snackBar.openFromComponent(NotiComponent, {
  //         duration: 1000,
  //         data: {
  //           message: 'Bạn đã Deactived thẻ thất bại',
  //           status: false
  //         }
  //       }),
  //         setTimeout(() => {
  //           this.dialogRef.close({ isCloseDialog: false });
  //         }, 200)
  //     },
  //     () => {
  //       setTimeout(() => {
  //         this.dialogRef.close({ isCloseDialog: true });
  //       }, 200);
  //     }
  //   )
  // }

  // ActiveUser() {
  //   const user = {
  //     id: this.user.id,
  //     login: this.user.login,
  //     firstName: this.user.firstName,
  //     email: this.user.email,
  //     phoneNumber: this.user.phoneNumber,
  //     imageUrl: this.user.imageUrl,
  //     activated: !this.user.activated,
  //     activationKey: this.user.activationKey,
  //     langKey: this.user.langKey,
  //     createdBy: this.user.createdBy,
  //     createdDate: this.user.createdDate,
  //     lastModifiedBy: this.user.lastModifiedBy,
  //     lastModifiedDate: this.user.lastModifiedDate,
  //     authorities: this.user.authorities
  //   }
  //   this.userService.UpdateUserInfor(this.user.id, user).subscribe(
  //     data => {
  //       this._snackBar.openFromComponent(NotiComponent, {
  //         duration: 1000,
  //         data: {
  //           message: 'Bạn đã Actived thẻ thành công',
  //           status: true
  //         },
  //       });
  //     },
  //     (error: any) => {
  //       this._snackBar.openFromComponent(NotiComponent, {
  //         duration: 1000,
  //         data: {
  //           message: 'Bạn đã Actived thẻ thất bại',
  //           status: false
  //         }
  //       }),
  //         setTimeout(() => {
  //           this.dialogRef.close({ isCloseDialog: false });
  //         }, 200)
  //     },
  //     () => {
  //       setTimeout(() => {
  //         this.dialogRef.close({ isCloseDialog: true });
  //       }, 200);
  //     }
  //   )
  // }

}
