import { Injectable } from '@angular/core';
import { User } from "src/model/user";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;

  isLoggedIn$: Subject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {
  }

  hasLoggedInSuccessfully(user: User) {
    this.isLoggedIn$.next(true);
    this.user = user;
  }

  hasLoggedOut() {
    this.isLoggedIn$.next(false);
    this.user = null;
  }
}
