import {Movie} from "../../../model/movie";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  MoviesFetchInfo, MoviesFetchNextPage,
  MoviesReset, MoviesSearchReset, MoviesSearchTitle
} from "./movies.actions";
import {produce} from "immer";
import {NbToastrService} from "@nebular/theme";
import { MoviesService } from "src/api/movies.service";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

export interface MoviesStateModel {
  isFetching: boolean;
  isFiltered: boolean;
  movies: Movie[];
  pageNumber: number;
}

export const defaultsState: MoviesStateModel = {
  isFetching: false,
  isFiltered: false,
  movies: [],
  pageNumber: 1,
}

@State<MoviesStateModel>({
  name: 'moviesPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesState {
  currentMovies: Movie[] = [];
  initialPageSize: number = 10;

  constructor(
    private toastrService: NbToastrService,
    private moviesService: MoviesService,
  ) {
  }

  @Action(MoviesFetchInfo)
  async moviesFetchInfo(
    {getState, setState}: StateContext<MoviesStateModel>) {

    let pageNumber = getState().pageNumber;

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });

    setState(newState);

    this.moviesService.getMoviesPerPage(pageNumber, this.initialPageSize)
    .pipe(
      tap(movies => {
        newState = produce(getState(), draft => {
          draft.movies = movies;
          this.currentMovies = movies;
        });
        setState(newState);
      }),
      catchError(error => {
        this.toastrService.show(error, 'Fetching movies went wrong.', {status: 'danger'});
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();

    newState = produce(getState(), draft => {
      draft.isFetching = false;
    });
  }

  @Action(MoviesFetchNextPage)
  async moviesFetchNextPage(
    {getState, setState}: StateContext<MoviesStateModel>,
    action: MoviesFetchNextPage) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })

    setState(newState);

    let pageNumber = getState().pageNumber;

    this.moviesService.getMoviesPerPage(pageNumber, this.initialPageSize)
    .pipe(
      tap(movies => {
        newState = produce(getState(), draft => {
          let currentMovies = draft.movies;
          draft.movies = [...currentMovies, ...movies];
          this.currentMovies = draft.movies;
          draft.isFetching = false;
          draft.pageNumber++;
        })
        setState(newState);
      }),
      catchError(error => {
        this.toastrService.show(error, 'Fetching movies went wrong.', {status: 'danger'});
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }

  @Action(MoviesSearchTitle)
  async moviesSearchTitle(
    {getState, setState}: StateContext<MoviesStateModel>,
    action: MoviesSearchTitle) {
    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);

    this.moviesService.getMoviesByTitle(action.movieTitle)
    .pipe(
      tap((filteredMovies: Movie[]) => {
        if (!filteredMovies || filteredMovies.length === 0) {
          newState = produce(getState(), draft => {
            draft.isFetching = false;
          });
          setState(newState);
          this.toastrService.show('', 'There are no movies that contain title ' + action.movieTitle, {status: 'info'});
        }
        else {
          newState = produce(getState(), draft => {
            draft.isFetching = false;
            draft.isFiltered = true;
            draft.movies = filteredMovies;
          });
          setState(newState);
        }
      }),
      catchError(error => {
        this.toastrService.show(error, 'Fetching movies went wrong.', {status: 'danger'});
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }

  @Action(MoviesSearchReset)
  async moviesSearchReset(
    {getState, setState}: StateContext<MoviesStateModel>) {
    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      draft.isFiltered = false;
      draft.movies = this.currentMovies;
    })

    setState(newState);
  }

  @Action(MoviesReset)
  async moviesReset(
    {getState, setState}
      :
      StateContext<MoviesStateModel>
  ) {
    setState(defaultsState);
  }
}
