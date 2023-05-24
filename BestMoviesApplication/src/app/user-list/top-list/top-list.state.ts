import { Movie } from "src/model/movie";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { MoviesService } from "src/api/movies.service";
import { produce } from "immer";
import { UserTopListMoviesFetch, UserTopListMoviesReset } from "src/app/user-list/top-list/top-list.actions";
import { AuthService } from "src/core/services/auth.service";
import { User } from "src/model/user";
import { moviesMock } from "src/util/mocks/movies_mock";

export interface UserTopListMoviesStateModel {
  isFetching: boolean;
  movies: Movie[];
}

export const defaultsState: UserTopListMoviesStateModel = {
  isFetching: false,
  movies: [],
}

@State<UserTopListMoviesStateModel>( {
  name: 'userTopListMoviesPage',
  defaults: defaultsState,
})

@Injectable()
export class UserTopListMoviesState {
  user: User = null;

  constructor(
    private nbToastrService: NbToastrService,
    private moviesService: MoviesService,
    private authService: AuthService
    //here the services used for getting date from backend are imported
  ) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  @Action(UserTopListMoviesFetch)
  async userTopListMoviesFetch(
    {getState, setState}: StateContext<UserTopListMoviesStateModel>) {

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

  @Action(UserTopListMoviesReset)
  async userTopListMoviesReset(
    {getState, setState}: StateContext<UserTopListMoviesStateModel>) {
    setState(defaultsState);
  }
}
