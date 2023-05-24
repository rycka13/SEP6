export enum AccountType {
  REGISTER = 'register',
  LOGIN = 'login',
  UNKNOWN = 'UNKNOWN'
}

export enum CheckType {
  USERNAME,
  PASSWORD,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  REPEATED_PASSWORD,
}

export function getAccountType(accountType: string) {
  switch(accountType) {
    case "register" : return AccountType.REGISTER;
    case "login" : return AccountType.LOGIN;
    default: return AccountType.UNKNOWN;
  }
}
