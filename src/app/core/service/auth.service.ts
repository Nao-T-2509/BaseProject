import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { api_url } from '../const/url';
import { Token } from '@angular/compiler';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  sendLoginInfor(body: any) {
    return this.http.post(api_url + '/authenticate', body)
      .pipe(
        map((reponse: any) => reponse)
      );
  }

  setToken(token: string) {
    localStorage.setItem("LoggedInUser", token)

  }

  isLoggednIn() {
    return localStorage.getItem('LoggedInUser') !== null;
  }

  GetTokenDecoded(token: any) {
    sessionStorage.setItem('infor', this.jwtHelper.decodeToken(token))
  }
}
