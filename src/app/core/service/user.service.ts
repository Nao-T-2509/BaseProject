import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { admin_url, baseUrlT, gateway_url } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetUserList(page: any, pageSize: any): Observable<any> {
    return this.http.post(admin_url + '/Users/GetAllUser?page=' + page + '&pagesize=' + pageSize, null)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  GetUserDetail(login: any): Observable<any> {
    return this.http.get(admin_url + '/Users/' + login)
      .pipe(
        map((reponse: any) => reponse)
      )
  }
  
  SearchUser(page: any, pageSize: any, value: any): Observable<any> {
    return this.http.post(admin_url + '/Users/searchUser?page=' + page + '&pagesize=' + pageSize, value)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  UpdateUserInfor(id: any, body: any): Observable<any> {
    return this.http.put(admin_url + '/Users/' + id, body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  DeActiveUser(id: any): Observable<any> {
    return this.http.get(gateway_url + '/User/admin/deactivate?key=' + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  CreateUser(body: any): Observable<any> {
    return this.http.post(admin_url + '/Users', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  getAlluser(): Observable<any> {
    return this.http.get(baseUrlT + '/taikhoan').pipe(
      map((reponse: any) => reponse)
    )
  }

  getDetail(name: any): Observable<any> {
    return this.http.get(baseUrlT + '/taikhoan?tenDangNhap=' + name ).pipe(
      map((reponse: any) => reponse)
    )
  }

  update(id: any, body: any): Observable<any> {
    return this.http.put(baseUrlT + '/taikhoan' + "/" + id, body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  delete(id: string): Observable<any> {
    return this.http.delete(baseUrlT + '/taikhoan' + "/" + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

}
