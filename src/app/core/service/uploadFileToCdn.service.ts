import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { URL_CDN_UPLOAD } from '../const/url';

@Injectable({
  providedIn: 'root'
})
export class UploadFileToCdnService {

  constructor(private http: HttpClient) { }
  uploadOneFile(file: any, type: string): Observable<any> {
    const formData: FormData = new FormData();
    let fileName = new Date().getTime() + file.name;
    formData.append('file', file, fileName)
    formData.append('type', type);
    return this.http
      .put(URL_CDN_UPLOAD, formData)
      .pipe(
        map((reponse: any) => reponse)
      )
  }
}
