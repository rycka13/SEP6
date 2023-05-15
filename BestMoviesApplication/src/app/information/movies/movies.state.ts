import {Movie} from "../../../model/movie";
import {Person} from "../../../model/person";
import {Stars} from "../../../model/stars";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  MoviesFetchInfo,
  MoviesReset
} from "./movies.actions";
import {current, produce} from "immer";
import {moviesMock} from "../../../util/mocks/movies_mock";
import {peopleMock} from "../../../util/mocks/people_mock";
import {NbToastrService} from "@nebular/theme";

export interface MoviesStateModel {
  isFetching: boolean;
  movies: Movie[];
}

export const defaultsState: MoviesStateModel = {
  isFetching: false,
  movies: [],
}

@State<MoviesStateModel>( {
  name: 'moviesPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesState {
  movies: Movie[] = [];

  constructor(
    private toastrService: NbToastrService
    //here the services used for getting date from backend are imported
  ) {
  }

  @Action(MoviesFetchInfo)
  async moviesFetchInfo(
    { getState, setState }: StateContext<MoviesStateModel>,
    action: MoviesFetchInfo) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    // here we will call the API, but for now we have the mocks
    //TODO implement api call
    try {
      this.movies = moviesMock;
    }
    catch (e) {
      this.toastrService.show('danger', 'Fetching movies went wrong.');
      console.log(e);
    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.movies = this.movies;
    })

    setState(newState);
    currentState = newState;
  }

  @Action(MoviesReset)
  async moviesReset(
    { getState, setState }: StateContext<MoviesStateModel>,
    action: MoviesReset) {
    setState(defaultsState);
  }
}
