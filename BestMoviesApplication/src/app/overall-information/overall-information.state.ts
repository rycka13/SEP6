import {Movie} from "../../model/movie";
import {Person} from "../../model/person";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  OverAllInformationBestMoviesFetch,
  OverAllInformationFetchInfo,
  OverAllInformationReset
} from "./overall-information.actions";
import {current, produce} from "immer";
import {moviesMock} from "../../util/mocks/movies_mock";
import {peopleMock} from "../../util/mocks/people_mock";
import {NbToastrService} from "@nebular/theme";

export interface OverAllInformationStateModel {
  isFetching: boolean;
  movies: Movie[];
  people: Person[];
  bestMovies: Movie[];
}

export const defaultsState: OverAllInformationStateModel = {
  isFetching: false,
  movies: [],
  people: [],
  bestMovies: [],
}

@State<OverAllInformationStateModel>( {
  name: 'overallInformationPage',
  defaults: defaultsState,
})

@Injectable()
export class OverAllInformationState {
  movies: Movie[] = [];
  people: Person[] = [];
  bestMovies: Movie[] = [];

  constructor(
    private toastrService: NbToastrService
    //here the services used for getting date from backend are imported
  ) {
  }

  @Action(OverAllInformationFetchInfo)
  async overAllInformationFetchInfo(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchInfo) {

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
      this.people = peopleMock;
    }
    catch (e) {
      this.toastrService.show('danger', 'Fetching overall information went wrong.');
      console.log(e);
    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.movies = this.movies;
      draft.people = this.people;
    })

    setState(newState);
    currentState = newState;
  }

  @Action(OverAllInformationBestMoviesFetch)
  async overAllInformationBestMoviesFetch(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationBestMoviesFetch) {

    let currentState = getState();

    //setting state for isFetching to let application know that date is fetching, so later we can add visual information with this variable
    //TODO add visual information using isFetching
    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    // here we will call the API, but for now we have the mocks
    //TODO implement api call
    try {
      this.bestMovies.push(this.movies[1], this.movies[2], this.movies[3]);
    }
    catch (e) {
      this.toastrService.show('danger', 'Fetching best movies went wrong.');
      console.log(e);
    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.bestMovies = this.bestMovies;
    })

    setState(newState);
    currentState = newState;
  }

  @Action(OverAllInformationReset)
  async overAllInformationReset(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationReset) {
    setState(defaultsState);
  }

}
