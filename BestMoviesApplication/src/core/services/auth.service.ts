import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/model/user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;

  private isLoggedInSubject: BehaviorSubject<boolean>;

  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  hasLoggedInSuccessfully(user: User) {
    this.isLoggedInSubject.next(true);
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  hasLoggedOut() {
    this.isLoggedInSubject.next(false);
    this.user = null;
    localStorage.removeItem('currentUser');
  }

  private isLoggedIn(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
  }
}
