import {Movie} from "../../../model/movie";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  MoviesFetchInfo,
  MoviesReset, MoviesSearchReset, MoviesSearchTitle
} from "./movies.actions";
import {produce} from "immer";
import {moviesMock} from "../../../util/mocks/movies_mock";
import {NbToastrService} from "@nebular/theme";

export interface MoviesStateModel {
  isFetching: boolean;
  isFiltered: boolean;
  movies: Movie[];
}

export const defaultsState: MoviesStateModel = {
  isFetching: false,
  isFiltered: false,
  movies: [],
}

@State<MoviesStateModel>( {
  name: 'moviesPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesState {
  allMovies: Movie[] = [];

  constructor(
    private toastrService: NbToastrService
    //here the services used for getting date from backend are imported
  ) {
  }

  @Action(MoviesFetchInfo)
  async moviesFetchInfo(
    { getState, setState }: StateContext<MoviesStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    // here we will call the API, but for now we have the mocks
    //TODO implement api call
    try {
      this.allMovies = moviesMock;
    }
    catch (e) {
      this.toastrService.show('danger', 'Fetching movies went wrong.');
      console.log(e);
    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.movies = this.allMovies;
    })

    setState(newState);
    currentState = newState;
  }

  @Action(MoviesSearchTitle)
  async moviesSearchTitle(
    { getState, setState }: StateContext<MoviesStateModel>,
    action: MoviesSearchTitle) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    //TODO implement api call or can be done also from frontend
    newState = produce(currentState, draft => {
      let movies = this.allMovies;
      if(movies.length < 0) {
        this.toastrService.show('', 'There are no movies to search');
      }
      else {
        let filteredMovies = movies.filter((movie: Movie) => {
          let value = movie.title.toLowerCase().includes(action.movieTitle);
          return value;
        });
        if(filteredMovies.length < 0) {
          this.toastrService.show('', 'There are no movies that contain ' + action.movieTitle);
        }
        draft.movies = filteredMovies;
      }
      draft.isFetching = false;
      draft.isFiltered = true;
    })

    setState(newState);
  }

  @Action(MoviesSearchReset)
  async moviesSearchReset(
    { getState, setState }: StateContext<MoviesStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFiltered = false;
      draft.movies = this.allMovies;
    })

    setState(newState);
  }

  @Action(MoviesReset)
  async moviesReset(
    { getState, setState }: StateContext<MoviesStateModel>) {
    setState(defaultsState);
  }
}
