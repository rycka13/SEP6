import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from "src/environments/environment";
import { catchError } from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class ApiService<T> {
  constructor(
    private http: HttpClient,
  ) {}

  get(path: string): Promise<T> {
    return this.http.get<T>(`${environment.api_url}${path}`).toPromise();
  }

  put(path: string, body: Object = {}): Promise<T> {
    return this.http.put<T>(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).toPromise();
  }

  post(path: string, body: Object = {}): Promise<T> {
    return this.http.post<T>(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).toPromise();
  }

  delete(path): Promise<T> {
    return this.http.delete<T>(
      `${environment.api_url}${path}`
    ).toPromise();
  }
}
