import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { baseUrlT } from '../const/url';

@Injectable({
    providedIn: 'root'
  })
  export class BlogService {
    constructor(private http: HttpClient) { }
  
    getAllBlog(): Observable<any> {
      return this.http.get(baseUrlT + '/blogs')
        .pipe(
          map((reponse: any) => reponse)
        )
    }

    getBlogDetail(id: any) : Observable<any> {
      return this.http.get(baseUrlT + '/blogs?id=' + id)
    }
  
    create(body: any): Observable<any> {
        return this.http.post(baseUrlT + '/blogs', body)
          .pipe(
            map((reponse: any) => reponse)
          )
      }

    update(id: any, body: any): Observable<any> {
      return this.http.put(baseUrlT + '/blogs' + "/" + id, body)
        .pipe(
          map((reponse: any) => reponse)
        )
    }

    delete(id: string): Observable<any> {
        return this.http.delete(baseUrlT + '/blogs' + "/" + id)
          .pipe(
            map((reponse: any) => reponse)
          )
      }

      searchByTitle(title: string): Observable<any> {
        const keyword = title.trim();
        return this.http.get(baseUrlT + '/blogs/' + "/tieuDe_like=" + keyword)
          .pipe(
            map((reponse: any) => reponse)
          )
      }
  }