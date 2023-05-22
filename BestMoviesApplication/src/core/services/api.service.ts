import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Director } from "src/model/director";
import { peopleMock } from "src/util/mocks/people_mock";
import { Star } from "src/model/star";
import { Movie } from "src/model/movie";
import { moviesMock } from "src/util/mocks/movies_mock";
import { Rating } from "src/model/rating";
import { ratingsMock } from "src/util/mocks/ratings_mock";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService<T> {
  constructor(private http: HttpClient) {
  }

  get(path: string): Observable<T> {
    return this.http.get<T>(`${environment.api_url}${path}`);
  }

  put(path: string, body: Object = {}): Observable<T> {
    return this.http.put<T>(`${environment.api_url}${path}`, body);
  }

  post(path: string, body: Object = {}): Observable<T> {
    return this.http.post<T>(`${environment.api_url}${path}`, body);
  }

  delete(path: string): Observable<T> {
    return this.http.delete<T>(`${environment.api_url}${path}`);
  }
}

