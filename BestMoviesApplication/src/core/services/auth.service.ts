import { Injectable } from '@angular/core';
import { User } from "src/model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;

  constructor() {
  }

  isLoggedIn() {
    return this.user !== null;
  }
  hasLoggedInSuccessfully(user: User) {
    this.user = user;
  }

  hasLoggedOut() {
    this.user = null;
  }
}
