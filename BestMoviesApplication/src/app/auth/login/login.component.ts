import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { NbToastrService } from "@nebular/theme";
import { AccountType, getAccountType } from "src/app/auth/constants/constants";
import { AccountLogin, AccountRegister } from "src/app/auth/account.actions";
import { User } from "src/model/user";
import { NbLoginComponent } from "@nebular/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  accountType: AccountType;
  // constructor(
  //   private route: ActivatedRoute,
  //   private store: Store,
  //   private nbToastrService: NbToastrService,
  //   private router: Router) {
  // super()
  // }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   const accountType = params['type'];
    //   this.accountType = getAccountType(accountType);
    // });
  }

  doAction(accountType: AccountType) {
    // let user: User;
    // if(accountType === AccountType.REGISTER) {
    //   this.store.dispatch(new AccountRegister(user));
    // }
    // else if(accountType === AccountType.LOGIN) {
    //   this.store.dispatch(new AccountLogin(user));
    // }
  }

  createUser() {
    return {
      //TODO create user before doing action
    }
  }



}
