import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { NbToastrService } from "@nebular/theme";
import { AccountType, getAccountType } from "src/app/account/constants/constants";
import { AccountLogin, AccountRegister } from "src/app/account/account.actions";
import { User } from "src/model/user";

@Component({
  selector: 'app-account',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  accountType: AccountType;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private nbToastrService: NbToastrService,
    private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const accountType = params['type'];
      this.accountType = getAccountType(accountType);
    });
  }

  doAction(accountType: AccountType) {
    let user: User;
    if(accountType === AccountType.REGISTER) {
      this.store.dispatch(new AccountRegister(user));
    }
    else if(accountType === AccountType.LOGIN) {
      this.store.dispatch(new AccountLogin(user));
    }
  }

  createUser() {
    return {
      //TODO create user before doing action
    }
  }



}
