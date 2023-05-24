import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { NbToastrService } from "@nebular/theme";
import { AuthIsLoggedIn, AuthLogin, AuthRegister } from "src/app/auth/auth.actions";
import { User } from "src/model/user";
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
  repeatPassword: string;

  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

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
      this.password,
      this.repeatPassword));
  }

  getInputType(checkType: CheckType) {
    if(checkType === CheckType.PASSWORD) {
      if(this.showPassword) {
        return 'text';
      }
      return 'password';
    }
    else if(checkType === CheckType.REPEATED_PASSWORD) {
      if(this.showRepeatedPassword) {
        return 'text';
      }
      return 'password';
    }
  }

  toggleShowPassword(checkType: CheckType) {
    if(checkType === CheckType.PASSWORD) {
      this.showPassword = !this.showPassword;
    }
    else if(checkType === CheckType.REPEATED_PASSWORD) {
      this.showRepeatedPassword = !this.showRepeatedPassword;
    }
  }

  redirectToRegisterPage() {
    this.router.navigate([`/auth/register`]);
  }

  changeLoginType() {
    if(this.loginWithEmailActivated) {
      this.loginWithEmailActivated = false;
      this.loginWithUserNameActivated = true;
    }
    else {
      if(this.loginWithUserNameActivated) {
        this.loginWithEmailActivated = true;
        this.loginWithUserNameActivated = false;
      }
    }
  }

  //enums
  getCheckType() : typeof CheckType {
    return CheckType;
  }

}
