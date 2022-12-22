import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private routes: Router, private data: DataService) { }

  body: any = {
    login: '',
    type: '',
    value: ''
  }
  error!: any;
  way!: any;
  infor!: any;
  selects: any[] = [];
  checkDisplay = false;
  checkDisplay2 = false;
  check_infor = false;
  ngOnInit(): void {
    this.selects = [
      { select: 'Gửi qua số điện thoại', infor: '0826258507', type: 'phoneNumber' },
      { select: 'Gửi qua email', infor: "vantu2102@gmail.com", type: 'email' }];
  }
  FindAccount() {
    this.check_infor = false;
    // this.accountService.FindAccount(this.infor).subscribe(data => {
      this.checkDisplay = true;
    //   this.selects = [
    //     { select: 'Gửi qua số điện thoại', infor: data[1].value, type: data[1].type },
    //     { select: 'Gửi qua email', infor: data[0].value, type: data[0].type }];
    // }, error => {
    //   this.error = error.error;
    //   this.checkDisplay = false;
    //   this.check_infor = true;
    // })
  }

  selected() {
    this.body = {
      login: this.infor,
      type: this.way.type,
      value: this.way.infor
    }
  }

  ChooseWay() {
    this.data.changeData(this.body);
    // this.accountService.GetOTP(this.body).subscribe(data => {
    // })
    this.routes.navigateByUrl("/admin/auth/verify");
  }

  back() {
    this.routes.navigate(["login"]);
  }
}
