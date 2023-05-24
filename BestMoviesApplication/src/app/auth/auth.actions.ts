import { User } from "src/model/user";

export class AuthRegister {
  static readonly type = 'Account - Register';
  constructor(public email: string,
              public userName: string,
              public lastName: string,
              public firstName: string,
              public password: string,
              public repeatedPassword: string) {
  }
}

export class AuthLogin {
  static readonly type = 'Account - Login';
  constructor(public user: User) {
  }
}
