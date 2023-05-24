import { User } from "src/model/user";

export class AuthRegister {
  static readonly type = 'Account - Register';
  constructor(public user: User) {
  }
}

export class AuthLogin {
  static readonly type = 'Account - Login';
  constructor(public user: User) {
  }
}
