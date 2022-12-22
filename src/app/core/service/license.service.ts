import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { gateway_url, license_url } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(private http: HttpClient) { }

  getListLicenseRequest(body: any): Observable<any> {
    return this.http.post(license_url + '/licenseorder/search', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  getDetailLicensePackage(id: any): Observable<any> {
    return this.http.get(license_url + '/license?Id=' + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  viewDetailOrder(id: any): Observable<any> {
    return this.http.post(license_url + '/licenseorder/viewDetailOrder?Id=' + id, null)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  updateLicenseOrder(body: any): Observable<any> {
    return this.http.post(license_url + '/licenseorder/update', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  updateLockStatus(body: any): Observable<any> {
    return this.http.post(license_url + '/licenseorder/lockLicenseOrder', body)
      .pipe(
        map((reponse: any) => reponse)
      )
  }

  checkLockStatus(id: any): Observable<any> {
    return this.http.get(license_url + '/licenseorder/statusLockLicenseOrder?Id=' + id)
      .pipe(
        map((reponse: any) => reponse)
      )
  }
}
