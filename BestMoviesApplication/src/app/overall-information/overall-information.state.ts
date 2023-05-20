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
import {MoviesService} from "src/api/movies/movies.service";

export interface OverAllInformationStateModel {
  isFetching: boolean;
  moviesByYearIsFiltered: boolean;
  movies: Movie[];
  people: Person[];
}

export const defaultsState: OverAllInformationStateModel = {
  isFetching: false,
  moviesByYearIsFiltered: false,
  movies: [],
  people: [],
}

@State<OverAllInformationStateModel>( {
  name: 'overallInformationPage',
  defaults: defaultsState,
})

@Injectable()
export class OverAllInformationState {
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(
    private toastrService: NbToastrService,
    private moviesService: MoviesService,
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
      this.toastrService.show('Error...', 'Fetching overall information went wrong.', { status: 'danger'});
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

  @Action(OverAllInformationReset)
  async overAllInformationReset(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationReset) {
    setState(defaultsState);
  }

}
