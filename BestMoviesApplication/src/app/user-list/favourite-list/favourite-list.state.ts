import { Movie } from "src/model/movie";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { MoviesService } from "src/api/movies.service";
import { produce } from "immer";
import { AuthService } from "src/core/services/auth.service";
import { User } from "src/model/user";
import { moviesMock } from "src/util/mocks/movies_mock";
import { UserFavouriteListMoviesFetch, UserFavouriteListMoviesReset } from "src/app/user-list/favourite-list/favourite-list.actions";

export interface UserFavouriteListMoviesStateModel {
  isFetching: boolean;
  movies: Movie[];
}

export const defaultsState: UserFavouriteListMoviesStateModel = {
  isFetching: false,
  movies: [],
}

@State<UserFavouriteListMoviesStateModel>( {
  name: 'userFavouriteListMoviesPage',
  defaults: defaultsState,
})

@Injectable()
export class UserFavouriteListMoviesState {
  user: User = null;

  constructor(
    private nbToastrService: NbToastrService,
    private moviesService: MoviesService,
    private authService: AuthService
    //here the services used for getting date from backend are imported
  ) {
    this.user = this.authService.user;
  }

  @Action(UserFavouriteListMoviesFetch)
  async userFavouriteListMoviesFetch(
    {getState, setState}: StateContext<UserFavouriteListMoviesStateModel>) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    newState = produce(getState(), draft => {
      draft.isFetching = false;
      draft.movies = [
        moviesMock[0], moviesMock[0], moviesMock[0],
        moviesMock[0], moviesMock[0], moviesMock[0],
        moviesMock[0], moviesMock[0], moviesMock[0]];
      console.log(draft.movies);
    })
    return setState(newState);


    //TODO api still not implemented
    // this.moviesService.getNMostPopularMovies(this.user.userName)
    // .pipe(
    //   tap((movies: Movie[]) => {
    //     newState = produce(getState(), draft => {
    //       draft.movies = movies;
    //       draft.isFetching = false;
    //     });
    //     setState(newState);
    //   }),
    //   catchError((error) => {
    //     newState = produce(getState(), draft => {
    //       draft.isFetching = false;
    //     });
    //     this.nbToastrService.show("API error", "Could not fetch top list of movies for you", { status: "danger"})
    //     setState(newState);
    //     return throwError(error);
    //   })
    // )
    // .subscribe();
  }

  @Action(UserFavouriteListMoviesReset)
  async userFavouriteListMoviesReset(
    {getState, setState}: StateContext<UserFavouriteListMoviesStateModel>) {
    setState(defaultsState);
  }
}
