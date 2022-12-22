import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { gateway_url } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getListNotiType(page: any, pageSize: any): Observable<any> {
    return this.http.get(gateway_url + '/Delivery/notificationtype/search?page=' + page + '&pageSize=' + pageSize)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  searchListNoti(keyword: any, type: any, isSend: any, isIntend: any,
    fromDate: any, toDate: any, page: any, pageSize: any): Observable<any> {
    return this.http.get(gateway_url + '/Delivery/notification/search?keyword=' + keyword +
    '&type=' + type + '&isSend=' + isSend + '&isIntend=' + isIntend + '&fromDate=' + fromDate + '&toDate=' + toDate
    + '&page=' + page + '&pageSize=' + pageSize)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  addNoti(body: any): Observable<any> {
    return this.http.post(gateway_url + '/Delivery/notification/add', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  updateNoti(body: any): Observable<any> {
    return this.http.put(gateway_url + '/Delivery/notification/update', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  deleteNoti(id: any): Observable<any> {
    return this.http.delete(gateway_url + '/Delivery/notification/delete?Id=' + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }
}
