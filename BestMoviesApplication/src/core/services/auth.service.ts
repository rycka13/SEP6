import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/model/user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private userInformation: BehaviorSubject<User>;

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!this.isLoggedIn());
    this.userInformation = new BehaviorSubject<User>(this.isLoggedIn());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    this.user$ = this.userInformation.asObservable();
  }

  hasLoggedInSuccessfully(user: User) {
    this.isLoggedInSubject.next(true);
    this.userInformation.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  hasLoggedOut() {
    this.isLoggedInSubject.next(false);
    this.userInformation.next(null);
    localStorage.removeItem('currentUser');
  }

  private isLoggedIn(): User {
    const currentUser = localStorage.getItem('currentUser');
    return JSON.parse(currentUser);
  }
}
