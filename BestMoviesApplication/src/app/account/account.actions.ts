import { User } from "src/model/user";

export class AccountRegister {
  static readonly type = 'Account - Register';
  constructor(public user: User) {
  }
}

export class AccountLogin {
  static readonly type = 'Account - Login';
  constructor(public user: User) {
  }
}
