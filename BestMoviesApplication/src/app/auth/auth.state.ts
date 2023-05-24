import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { UserService } from "src/api/user.service";
import { PeopleSearchDirectorsByName } from "src/app/information/people/people.actions";
import { produce } from "immer";
import { catchError, tap } from "rxjs/operators";
import { Director } from "src/model/director";
import { throwError } from "rxjs";
import { PeopleStateModel } from "src/app/information/people/people.state";
import { AuthLogin, AuthRegister } from "src/app/auth/auth.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "src/model/user";

export interface AccountStateModel {
  isFetching: boolean;
}

export const defaultsState: AccountStateModel = {
  isFetching: false,
}

@State<AccountStateModel>({
  name: 'accountPage',
  defaults: defaultsState,
})

@Injectable()
export class AuthState {
  constructor(
    private toastrService: NbToastrService,
    private userService: UserService,
  ) {
  }

  @Action(AuthRegister)
  authRegister(
    {getState, setState, patchState}: StateContext<AccountStateModel>,
    action: AuthRegister) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    });

    setState(newState);

    if(action.repeatedPassword !== action.password) {
      this.toastrService.show("Password does not match", "Repeaed password and password do not match", {status: "warning"});
      let newState = produce(currentState, draft => {
        draft.isFetching = true;
      });

      return setState(newState);
    }

    const user: User = this.createUser(action.email, action.userName, action.firstName, action.lastName, action.password);
    this.userService.register(user)
    .pipe(
      tap((response) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401)
          this.toastrService.show("Password does not match","Cannot register user", {status: 'warning'});
        else {
          this.toastrService.show("Internal server error","Something went wrong", {status: 'danger'});
        }
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }

  @Action(AuthLogin)
  authLogin(
    {getState, setState, patchState}: StateContext<AccountStateModel>,
    action: AuthLogin) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    });

    setState(newState);

    this.userService.login(action.user)
    .pipe(
      tap((response) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401)
          this.toastrService.show("Wrong password or email","Cannot login", {status: 'warning'});
        else {
          this.toastrService.show("Internal server error","Something went wrong", {status: 'danger'});
        }
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }

  createUser(email: string, userName: string, password: string, firstName: string, lastName: string) {
    return {
      email: email,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
    } as User;
  }

}
