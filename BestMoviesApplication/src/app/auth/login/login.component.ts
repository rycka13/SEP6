import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { AuthIsLoggedIn, AuthLogin } from "src/app/auth/auth.actions";
import { CheckType } from "src/app/auth/constants/constants";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userName: string;
  email: string;
  password: string;

  showPassword: boolean = false;

  loginWithEmailActivated: boolean = false;
  loginWithUserNameActivated: boolean = true;

  constructor(
    private store: Store,
    private router: Router) {

  }

  ngOnInit() {
    this.store.dispatch(new AuthIsLoggedIn())
  }

  login() {
    this.store.dispatch(new AuthLogin(
      this.userName,
      this.email,
      this.password));
  }

  getInputType(checkType: CheckType) {
    return this.showPassword ? 'text' : 'password';
  }

  toggleShowPassword(checkType: CheckType) {
      this.showPassword = !this.showPassword;
  }

  redirectToRegisterPage() {
    this.router.navigate([`/auth/register`]);
  }

  changeLoginType() {
    if(this.loginWithEmailActivated) {
      this.email = undefined;
      this.loginWithEmailActivated = false;
      this.loginWithUserNameActivated = true;
    }
    else if(this.loginWithUserNameActivated) {
        this.userName = undefined;
        this.loginWithEmailActivated = true;
        this.loginWithUserNameActivated = false;
    }
  }

  //enums
  getCheckType() : typeof CheckType {
    return CheckType;
  }

}
