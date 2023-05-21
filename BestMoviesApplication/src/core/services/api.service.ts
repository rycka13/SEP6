import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import {Director} from "src/model/director";
import {moviesMock} from "src/util/mocks/movies_mock";
import {Movie} from "src/model/movie";
import {Star} from "src/model/star";
import {Rating} from "src/model/rating";
import {ratingsMock} from "src/util/mocks/ratings_mock";
import {peopleMock} from "src/util/mocks/people_mock";

@Injectable()
export class ApiService<T> {
  constructor(private http: HttpClient) {}

  get(path: string): Promise<T> {
    return this.returnMockIfTest(this.http.get<T>(`${environment.api_url}${path}`).toPromise());
  }

  put(path: string, body: Object = {}): Promise<T> {
    return this.returnMockIfTest(
      this.http.put<T>(`${environment.api_url}${path}`, JSON.stringify(body)).toPromise()
    );
  }

  post(path: string, body: Object = {}): Promise<T> {
    return this.returnMockIfTest(
      this.http.post<T>(`${environment.api_url}${path}`, JSON.stringify(body)).toPromise()
    );
  }

  delete(path: string): Promise<T> {
    return this.returnMockIfTest(this.http.delete<T>(`${environment.api_url}${path}`).toPromise());
  }

  returnMockIfTest(method: Promise<T>): Promise<T> {
    if (environment.test && method instanceof Promise) {
      if (method as Promise<Director>) {
        return Promise.resolve(peopleMock[0] as unknown as T);
      }
      else if (method as Promise<Director[]>) {
        return Promise.resolve([peopleMock[0]] as unknown as T);
      }
      else if (method as Promise<Star>) {
        return Promise.resolve(peopleMock[0] as unknown as T);
      }
      else if (method as Promise<Star[]>) {
        return Promise.resolve([peopleMock[0]] as unknown as T);
      }
      else if (method as Promise<Movie>) {
        return Promise.resolve(moviesMock[0] as unknown as T);
      }
      else if (method as Promise<Movie[]>) {
        return Promise.resolve([moviesMock[0]] as unknown as T);
      }
      else if (method as Promise<Rating>) {
        return Promise.resolve(ratingsMock[0] as unknown as T);
      }
      else if (method as Promise<Movie[]>) {
        return Promise.resolve([ratingsMock[0]] as unknown as T);
      }
    }
    return method;
  }

}
