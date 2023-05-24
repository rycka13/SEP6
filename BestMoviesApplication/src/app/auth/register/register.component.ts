import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { NbToastrService } from "@nebular/theme";
import { AccountType, getAccountType } from "src/app/auth/constants/constants";
import { AuthLogin, AuthRegister } from "src/app/auth/auth.actions";
import { User } from "src/model/user";

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
  showPassword: boolean = false;

  constructor(
    private store: Store,
    private router: Router) {

  }

  ngOnInit() {
  }

  register() {
    let user: User = {
      email: this.email,
    userName: this.userName,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName,
    };
      this.store.dispatch(new AuthRegister(user));
  }

  getInputType() {
    if(this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  createUser() {
    return {
      //TODO create user before doing action
    }
  }



}
