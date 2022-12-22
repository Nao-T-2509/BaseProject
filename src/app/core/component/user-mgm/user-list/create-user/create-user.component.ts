import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';
import { NotiComponent } from '../../../noti/noti.component';
import { ViewUpdateUserComponent } from '../view-update-user/view-update-user.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: any;
  active: any;
  rolelist: any = [];
  now = new Date;
  listnoti: any = [];
  authorities: any = [];
  constructor(private userService: UserService, private _snackBar: MatSnackBar, 
  public dialogRef: MatDialogRef<ViewUpdateUserComponent>, private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.GetRoleList().subscribe(data => {
      data.forEach((element: any) => {
        this.rolelist.push(element);
      });
    })
  }

  createUser(userdetail: any) {
    const user = {
      login: userdetail.login,
      firstName: userdetail.firstName,
      email: userdetail.email,
      phoneNumber: userdetail.phoneNumber,
      activated: true,
      langKey: "vi",
      createdBy: localStorage.getItem('username'),
      createdDate: this.now.toISOString(),
      authorities: this.authorities[0]
    }
    this.userService.CreateUser(user).subscribe(
      data => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Tạo tài khoản thành công',
            status: true
          }
        })
      },
      (error: any) => {
        if (error.error.detail == undefined) {
          this.listnoti = []
          if (error.error.errors.email != undefined) {
            error.error.errors.email.forEach((e: any) => {
              this.listnoti.push(e)
            });
          }
          if (error.error.errors.login != undefined) {
            error.error.errors.login.forEach((e: any) => {
              this.listnoti.push(e)
            });
          }
        }
        else {
          this.listnoti = []
          this.listnoti.push(error.error.detail)
        }
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Tạo tài khoản thất bại',
            status: false
          }
        })
      },
      () => {
        setTimeout(() => {
          this.dialogRef.close({ isCloseDialog: true });
        }, 200);
      }
    )
  }
 
}
