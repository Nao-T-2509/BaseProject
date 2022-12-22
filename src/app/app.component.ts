import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwksValidationHandler, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { authCodeFlowConfig } from './app.authconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.setStorage(localStorage);
  }
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  get decodedAccessToken() {
    return this._decodedAccessToken;
  }
  get decodedIDToken() {
    return this._decodedIDToken;
  }
  title = 'admin';

  ngOnInit(): void {
    //Đăng nhập sso
    // this.openLogin()
  }

  async openLogin(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      {
        this.oauthService.tokenValidationHandler = new NullValidationHandler()
        this.oauthService.events
          .pipe(filter((e: any) => e.type === 'token_received'))
          .subscribe(({ type }) => {
            this.handleNewToken();
          });

        this.oauthService.loadDiscoveryDocumentAndLogin().then(
          (isLoggedIn) => {
            if (isLoggedIn) {
              this.oauthService.setupAutomaticSilentRefresh();
              resolve();
            } else {
              this.oauthService.initCodeFlow();
              reject();
            }
          }
        );
      }
    })
  }
  private handleNewToken() {
    this._decodedAccessToken = this.jwtHelper.decodeToken(
      this.oauthService.getAccessToken()
    );

    this._decodedIDToken = this.jwtHelper.decodeToken(
      this.oauthService.getIdToken()
    );
  }
}