import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable, pipe } from 'rxjs';
import { base_url, gateway_url } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http: HttpClient) { }

  getListCollab(body: any): Observable<any> {
    return this.http.post(base_url + '/admin/GetListCollab', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  getDetailCollab(id: any): Observable<any> {
    return this.http.get(base_url + '/admin/GetDetailCollab?RequestId=' + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  UpdateCollab(body: any): Observable<any> {
    return this.http.put(base_url + '/admin/UpdateCollabInfo', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  Approve(body: any): Observable<any> {
    return this.http.post(base_url + '/admin/ApproveRequestCollab', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  UpdateLock(id: any, locked: any): Observable<any> {
    return this.http.put(base_url + '/admin/UpdateLock?RequestId=' + id + '&Locked=' + locked, {})
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  GetRoleList(): Observable<any> {
    return this.http.get(base_url + '/admin/GetRoleList')
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  GetStatusList(): Observable<any> {
    return this.http.get(base_url + '/admin/GetStatusList')
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  getHierarchicalTree(login: any): Observable<any> {
    return this.http.get(base_url + '/admin/GetHierarchicalTree?MemberLogin=' + login)
      .pipe(
        map((reponse: any) => reponse)
      )
  }
}
