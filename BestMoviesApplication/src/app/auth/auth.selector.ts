import {Selector} from "@ngxs/store";
import {AuthState, AuthStateModel} from "src/app/auth/auth.state";

export class AuthSelector {
  @Selector([AuthState])
  static isFetching(state: AuthStateModel) {
    return state.isFetching;
  }
}
