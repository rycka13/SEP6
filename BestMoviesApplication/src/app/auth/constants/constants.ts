export enum AccountType {
  REGISTER = 'register',
  LOGIN = 'login',
  UNKNOWN = 'UNKNOWN'
}

export function getAccountType(accountType: string) {
  switch(accountType) {
    case "register" : return AccountType.REGISTER;
    case "login" : return AccountType.LOGIN;
    default: return AccountType.UNKNOWN;
  }
}
