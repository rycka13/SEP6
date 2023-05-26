import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { CheckType } from "src/app/auth/constants/constants";
import { AuthIsLoggedIn, AuthRegister } from "src/app/auth/auth.actions";

@Component({
  selector: 'app-account',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;

  password: string;
  repeatPassword: string;

  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

  constructor(
    private store: Store,
    private router: Router) {

  }

  ngOnInit() {
    this.store.dispatch(new AuthIsLoggedIn())
  }

  register() {
    this.store.dispatch(new AuthRegister(
      this.userName,
      this.email,
      this.firstName,
      this.lastName,
      this.password,
      this.repeatPassword));
  }

  getInputType(checkType: CheckType) {
    if(checkType === CheckType.PASSWORD) {
      return this.showPassword ? 'text' : 'password';
    }

    else if(checkType === CheckType.REPEATED_PASSWORD) {
     return this.showRepeatedPassword ? 'text': 'password';
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

  redirectToLoginPage() {
    this.router.navigate([`/auth/login`]);
  }

  //enums
  getCheckType() : typeof CheckType {
    return CheckType;
  }

}
