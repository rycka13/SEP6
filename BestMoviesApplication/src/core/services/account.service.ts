import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  hasLoggedIn: boolean = false;

  constructor() {
  }

  hasLoggedInSuccessfully() {
    this.hasLoggedIn = true;
  }

  hasLoggedOut() {
    this.hasLoggedIn = false;
  }
}
