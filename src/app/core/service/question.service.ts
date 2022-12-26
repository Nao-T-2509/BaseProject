import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { baseUrlT } from '../const/url';

@Injectable({
    providedIn: 'root'
  })
  export class QuestionService {
    constructor(private http: HttpClient) { }
  
    getAllQuetion(): Observable<any> {
      return this.http.get(baseUrlT + '/questions')
        .pipe(
          map((reponse: any) => reponse)
        )
    }
  
    create(body: any): Observable<any> {
        return this.http.post(baseUrlT + '/questions', body)
          .pipe(
            map((reponse: any) => reponse)
          )
      }

      update(id: any, body: any): Observable<any> {
        return this.http.put(baseUrlT + '/questions' + "/" + id, body)
          .pipe(
            map((reponse: any) => reponse)
          )
      }

    delete(id: string): Observable<any> {
        return this.http.delete(baseUrlT + '/questions' + "/" + id)
          .pipe(
            map((reponse: any) => reponse)
          )
      }

      searchByTitle(title: string): Observable<any> {
        const keyword = title.trim();
        return this.http.get(baseUrlT + '/questions/' + "/tieuDe_like=" + keyword)
          .pipe(
            map((reponse: any) => reponse)
          )
      }
  }