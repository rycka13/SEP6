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
import { AccountLogin, AccountRegister } from "src/app/account/account.actions";
import { HttpErrorResponse } from "@angular/common/http";

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
export class MoviesState {
  constructor(
    private toastrService: NbToastrService,
    private userService: UserService,
  ) {
  }

  @Action(AccountRegister)
  accountRegister(
    {getState, setState, patchState}: StateContext<AccountStateModel>,
    action: AccountRegister) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    });

    setState(newState);

    this.userService.register(action.user)
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

  @Action(AccountLogin)
  accountLogin(
    {getState, setState, patchState}: StateContext<AccountStateModel>,
    action: AccountLogin) {

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

}
