import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Person} from "src/model/person";
import {Movie} from "src/model/movie";
import {NbToastrService} from "@nebular/theme";
import {
  MoviesFetchInfo,
  MoviesReset,
  MoviesSearchReset,
  MoviesSearchTitle
} from "src/app/information/movies/movies.actions";
import {produce} from "immer";
import {moviesMock} from "src/util/mocks/movies_mock";
import {MoviesStateModel} from "src/app/information/movies/movies.state";
import {
  PeopleFetchInfo,
  PeopleReset,
  PeopleSearchName,
  PeopleSearchReset
} from "src/app/information/people/people.actions";
import {peopleMock} from "src/util/mocks/people_mock";

export interface PeopleStateModel {
  isFetching: boolean;
  isFiltered: boolean;
  people: Person[];
}

export const defaultsState: PeopleStateModel = {
  isFetching: false,
  isFiltered: false,
  people: [],
}

@State<PeopleStateModel>( {
  name: 'peoplePage',
  defaults: defaultsState,
})

@Injectable()
export class PeopleState {
  allPeople: Person[] = [];

  constructor(
    private toastrService: NbToastrService
    //here the services used for getting date from backend are imported
  ) {
  }

  @Action(PeopleFetchInfo)
  async peopleFetchInfo(
    { getState, setState }: StateContext<PeopleStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    // here we will call the API, but for now we have the mocks
    //TODO implement api call
    try {
      this.allPeople = peopleMock;
    }
    catch (e) {
      this.toastrService.show('danger', 'Fetching people went wrong.');
      console.log(e);
    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.people = this.allPeople;
    })

    setState(newState);
  }

  @Action(PeopleSearchName)
  async peopleSearchName(
    { getState, setState }: StateContext<PeopleStateModel>,
    action: PeopleSearchName) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    //TODO implement api call or can be done also from frontend
    newState = produce(currentState, draft => {
      let people = this.allPeople;
      if(people.length < 0) {
        this.toastrService.show('', 'There are no people to search');
      }
      else {
        let filteredPeople = people.filter((person: Person) => {
          let value = person.name.toLowerCase().includes(action.personName);
          return value;
        });
        if(filteredPeople.length < 0) {
          this.toastrService.show('', 'There are no people that contain name ' + action.personName);
        }
        draft.people = filteredPeople;
      }
      draft.isFetching = false;
      draft.isFiltered = true;
    })

    setState(newState);
  }

  @Action(PeopleSearchReset)
  async peopleSearchReset(
    { getState, setState }: StateContext<PeopleStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFiltered = false;
      draft.people = this.allPeople;
    })

    setState(newState);
  }

  @Action(PeopleReset)
  async peopleReset(
    { getState, setState }: StateContext<PeopleStateModel>) {
    setState(defaultsState);
  }
}
