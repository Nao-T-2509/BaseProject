import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  check_pass = true;
  login = false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
  }
  sendLoginInfor() {
    this.check_pass = true;
    this.login = true;
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: true
    }
    this.authservice.sendLoginInfor(body).subscribe(data => {
      if (data != null) {
        this.authservice.setToken(data.id_token);
        this.authservice.GetTokenDecoded(data.id_token)
        this.router.navigate(['admin/pages']);
        this.login = false;
      }
    },
      (error: any) => {
        this.login = false;
        this.check_pass = false;
      }
    )
  }
  forgotpassword() {
    this.router.navigateByUrl('/admin/auth/forgotpassword');
  }
}
