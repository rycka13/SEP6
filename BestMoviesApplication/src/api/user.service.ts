import { Injectable } from '@angular/core';
import { ApiService } from "src/core/services/api.service";
import { Observable } from "rxjs";
import { User } from "src/model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (
    private apiService: ApiService<User>
  ) {}

  PATH_CONTROLLER = 'user';

  register(user): Observable<User> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/regiser`,
      { user: { body: user } }
    );
  }

  login(user): Observable<User> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/regiser`,
      { user: { body: user } }
    );
  }
}
