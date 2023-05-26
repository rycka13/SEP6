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
import { AuthIsLoggedIn, AuthLogin, AuthRegister } from "src/app/auth/auth.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "src/model/user";
import { AuthService } from "src/core/services/auth.service";
import { Router } from "@angular/router";
import {validatePassword} from "src/app/auth/constants/constants";

export interface AuthStateModel {
  isFetching: boolean;
}

export const defaultsState: AuthStateModel = {
  isFetching: false,
}

@State<AuthStateModel>({
  name: 'authPage',
  defaults: defaultsState,
})

@Injectable()
export class AuthState {
  constructor(
    private toastrService: NbToastrService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  @Action(AuthIsLoggedIn)
  authIsLoggedIn(
    {getState, setState, patchState}: StateContext<AuthStateModel>) {
    if (this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['overall-information']);
      }
    }))
      return patchState(getState());
  }

  @Action(AuthRegister)
  authRegister(
    {getState, setState, patchState}: StateContext<AuthStateModel>,
    action: AuthRegister) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    });

    setState(newState);

    //checking credentials
    let errorState = produce(currentState, draft => {
      draft.isFetching = false;
    });

    if (action.userName === undefined) {
      this.toastrService.show("Please insert an username", "Username is empty", {status: "warning"});
      return setState(errorState);
    }
    else if(action.email === undefined) {
      this.toastrService.show("Please insert an email", "Email is empty", {status: "warning"});
      return setState(errorState);
    }
    else if(!validatePassword(action.password)) {
      this.toastrService.show("It should include minimum one uppercase, lowercase letter, one number and one special character", "Password does not meet criteria", {status: "warning"});
      return setState(errorState);
    }
    else if (action.repeatedPassword !== action.password) {
      this.toastrService.show("Password does not match", "Repeated password and password do not match", {status: "warning"});
      return setState(errorState);
    }

    const user: User = this.createRegisterUser(action.email, action.userName, action.password, action.firstName, action.lastName);
    this.userService.register(user)
    .pipe(
      tap((response) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        this.router.navigate(['auth/login']);
        this.toastrService.show('Account has been registered!', 'Welcome!', { status: "success"});
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401)
          this.toastrService.show("Password does not match", "Cannot register user", {status: 'warning'});
        else {
          this.toastrService.show("Internal server error", "Something went wrong", {status: 'danger'});
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
    {getState, setState, patchState}: StateContext<AuthStateModel>,
    action: AuthLogin) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });

    setState(newState);

    const user: User = this.createLoginUser(action.userName, action.email, action.password);
    this.userService.login(user)
    .pipe(
      tap((response) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
          this.authService.hasLoggedInSuccessfully(user);
        });
        setState(newState);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (action.userName === undefined) {
            this.toastrService.show("Wrong password or email", "Cannot login", {status: 'warning'});
          } else if (action.email === undefined) {
            this.toastrService.show("Wrong password or username", "Cannot login", {status: 'warning'});
          }
        }
        else {
          this.toastrService.show("Internal server error", "Something went wrong", {status: 'danger'});
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

  createRegisterUser(email: string, userName: string, password: string, firstName: string, lastName: string) {
    return {
      email: email,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
    } as User;
  }

  createLoginUser(userName: string, email: string, password: string) {
    if(userName !== null && email === undefined) {
      return {
        userName: userName,
        password: password,
      } as User;
    }
    else if(email !== null && userName === undefined) {
      return {
        email: email,
        password: password,
      } as User;
    }

  }


}
