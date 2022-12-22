import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { gateway_url } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomerRequestList(page: number, size: number): Observable<any> {
    return this.http.get(gateway_url + '/Request/customerAdminGetListRequest?'+'Page=' + page + '&PageSize=' + size)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  getDetailRequest(id: any): Observable<any> {
    return this.http.get(gateway_url + '/Request/customerAdminGetDetailRequest?Id=' + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  upadateRequest(body: any): Observable<any> {
    return this.http.post(gateway_url + '/Request/customerAdminUpdateRequest', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

}
