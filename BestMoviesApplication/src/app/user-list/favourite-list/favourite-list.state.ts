import { Movie } from "src/model/movie";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { produce } from "immer";
import {
  UserFavouriteListMoviesRemoveMovieFromFavourites,
  UserFavouriteListMoviesFetch,
  UserFavouriteListMoviesReset, UserFavouriteListMoviesResetFiltering
} from "src/app/user-list/favourite-list/favourite-list.actions";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { FavoritesService } from "src/api/favorites.service";
import {HttpErrorResponse} from "@angular/common/http";

export interface UserFavouriteListMoviesStateModel {
  isFetching: boolean;
  isFiltered: boolean;
  movies: Movie[];
}

export const defaultsState: UserFavouriteListMoviesStateModel = {
  isFetching: false,
  isFiltered: false,
  movies: [],
}

@State<UserFavouriteListMoviesStateModel>({
  name: 'userFavouriteListMoviesPage',
  defaults: defaultsState,
})

@Injectable()
export class UserFavouriteListMoviesState {

  movies: Movie[] = [];
  constructor(
    private nbToastrService: NbToastrService,
    private favoritesService: FavoritesService,
  ) {
  }

  @Action(UserFavouriteListMoviesFetch)
  async userFavouriteListMoviesFetch(
    {getState, setState}: StateContext<UserFavouriteListMoviesStateModel>,
    action: UserFavouriteListMoviesFetch) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    return this.favoritesService.getFavorites(action.userName)
    .pipe(
      tap((movies: Movie[]) => {
        newState = produce(getState(), draft => {
          draft.movies = movies;
          if(action.isFilteringAction) {
            draft.isFiltered = true;
            console.log("xd")
          }
          else {
            this.movies = movies;
          }
          draft.isFetching = false;
        });
        setState(newState);
      }),
      catchError((error) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        this.nbToastrService.show("API error", "Could not fetch top list of movies for you", {status: "danger"})
        setState(newState);
        return throwError(error);
      })
    );
  }

  @Action(UserFavouriteListMoviesRemoveMovieFromFavourites)
  userFavouriteListMoviesAddMovieToFavourites(
    {getState, setState}: StateContext<UserFavouriteListMoviesStateModel>,
    action: UserFavouriteListMoviesRemoveMovieFromFavourites) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    this.favoritesService.removeMovieFromFavorites(action.userName, action.movieId)
      .pipe(
        tap(() => {
          newState = produce(getState(), draft => {
            draft.isFetching = false;
          });
          setState(newState);
          window.location.reload();
        }),
        catchError((error: HttpErrorResponse) => {
          newState = produce(getState(), draft => {
            draft.isFetching = false;
          });
          setState(newState);
          return throwError(error);
        })
      )
      .subscribe();
  }

  @Action(UserFavouriteListMoviesResetFiltering)
  async userFavouriteListMoviesResetFiltering(
    {getState, setState}: StateContext<UserFavouriteListMoviesStateModel>) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    newState = produce(getState(), draft => {
      draft.isFetching = false;
      draft.isFiltered = false;
      draft.movies = this.movies;
    });
    setState(newState);
  }


  @Action(UserFavouriteListMoviesReset)
  async userFavouriteListMoviesReset(
    {getState, setState}: StateContext<UserFavouriteListMoviesStateModel>) {
    setState(defaultsState);
  }
}
