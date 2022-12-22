import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { admin_url, api_url } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  GetRoleList(): Observable<any> {
    return this.http.get(api_url + '/Users/authorities')
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  searchRoleList(page: number, size: number): Observable<any> {
    return this.http.get(admin_url + '/Role/search?page=' + page + '&pageSize=' + size)
      .pipe(
        map((reponse: any) => reponse)
      )
  }
}
