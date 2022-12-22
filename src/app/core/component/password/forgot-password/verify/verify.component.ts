import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  selectinfor!: any;
  countdown = 60;
  complete = false;
  check: any;
  cardclass = '';

  constructor(private data: DataService, private routes: Router) { }

  verify_code!: string;
  ngOnInit(): void {
    let id = setInterval(() => {
      if (this.complete == true) {
        clearInterval(id)
      }
      if (this.countdown == 0) {
        this.countdown = 60
        this.data.data.subscribe(data => {
          // this.accountService.GetOTP(data).subscribe(data => {
          // })
        })
      }
      this.countdown = this.countdown - 1;
    }, 1000)
    this.data.data.subscribe(data => this.selectinfor = data)
  }

  ConfirmOTP() {
    const body = {
      login: this.selectinfor.login,
      type: this.selectinfor.type,
      key: this.verify_code
    };
    // this.accountService.ConfirmOTP(body).subscribe(data => {
      this.cardclass = 'card';
      this.check = true;
      setTimeout(() => {
        this.routes.navigate(['login'])
      }, 2000);
    // },
    //   (error: any) => {
    //     this.check = false;
    //   })
  }
  back() {
    this.routes.navigate(['forgotpassword'])
  }
}
