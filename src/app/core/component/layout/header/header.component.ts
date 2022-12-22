import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/app.authconfig';
import { ChangePasswordComponent } from '../../password/change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  annonimousAvatar = './../../../../../assets/images/annonimous.jpg'
  constructor(private dialog: MatDialog, private oauthService: OAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open(ChangePasswordComponent, {
      minWidth: '500px',
      width: '50%',
      minHeight: '600px',
      height: '80%'
    })
  }

  clear() {
    localStorage.clear()
    sessionStorage.clear()
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.logOut();
  }

}
