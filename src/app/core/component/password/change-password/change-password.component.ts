import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private _snackBar: MatSnackBar) { }

  check_repeatpass = true;
  check_lengthpass = true;
  check_strongpass = true;
  check_char1!: boolean;
  check_char2!: boolean;
  check_char3!: boolean;
  check_pass = true;
  newPassword!: string;
  phone?: any;

  ngOnInit(): void {
  }

  ChangePassword(value: any) {
    this.check_char1 = false;
    this.check_char2 = false;
    this.check_char3 = false;
    for (var i = 0; i < this.newPassword.length; i++) {
      if (this.newPassword[i] <= '9' && this.newPassword[i] >= '0') {
        this.check_char1 = true;
      }
    }
    for (var i = 0; i < this.newPassword.length; i++) {
      if ((this.newPassword[i] <= 'Z' && this.newPassword[i] >= 'A') || (this.newPassword[i] <= 'z' && this.newPassword[i] >= 'a')) {
        this.check_char2 = true;
      }
    }
    for (var i = 0; i < this.newPassword.length; i++) {
      if ((this.newPassword[i] <= '/' && this.newPassword[i] >= '!') || (this.newPassword[i] <= '@' && this.newPassword[i] >= '?')) {
        this.check_char3 = true;
      }
    }
    if (this.check_char1 == true && this.check_char2 == true && this.check_char3 == true) {
      this.check_strongpass = true;
    }
    else {
      this.check_char1 = false;
      this.check_char2 = false;
      this.check_char3 = false;
      this.check_strongpass = false;
    }
    if (this.newPassword.length < 8) {
      this.check_lengthpass = false;
    }
    else {
      this.check_lengthpass = true;
    }
    if (value.repeatnewPassword !== this.newPassword) {
      this.check_repeatpass = false;
    }
    else {
      this.check_repeatpass = true;
    }
    if (this.check_lengthpass == true && this.check_repeatpass == true && this.check_strongpass == true) {
      const body = {
        currentPassword: value.currentPassword,
        newPassword: value.repeatnewPassword
      }
      // this.account.ChangePassword(body).subscribe(data => {
        this.dialogRef.close();
        // this.openSnackBar();
      // },
        // error => {
        //   if (error.error.detail == 'Incorrect Password') {
        //     this.check_pass = false;
        //   }
        // })
    }
  }
  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnackbarComponent, {
  //     duration: 1500,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   })
  // }
}
