import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { NbToastrService } from "@nebular/theme";
import { AuthLogin, AuthRegister } from "src/app/auth/auth.actions";
import { User } from "src/model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  showPassword: boolean = false;

  constructor(
    private store: Store,
    private nbToastrService: NbToastrService) {
  }

  ngOnInit() {
  }

  login() {
    let user: User;
    this.store.dispatch(new AuthLogin(user));
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
