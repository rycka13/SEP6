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
import {Star} from "src/model/star";
import {StarsService} from "src/api/stars/stars.service";
import {DirectorService} from "src/api/directors/director.service";

export interface PeopleStateModel {
  isFetching: boolean;
  isFiltered: boolean;
  stars: Star[];
  directors: Star[];
}

export const defaultsState: PeopleStateModel = {
  isFetching: false,
  isFiltered: false,
  stars: [],
  directors: [],
}

@State<PeopleStateModel>( {
  name: 'peoplePage',
  defaults: defaultsState,
})

@Injectable()
export class PeopleState {
  constructor(
    private toastrService: NbToastrService,
    private starsService: StarsService,
    private directorsService: DirectorService,
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

    let stars: Star[] = [];
    let directors: Star[] = [];
    try {

      //mock
      stars.push(peopleMock[0],peopleMock[1]);
      directors.push(peopleMock[2],peopleMock[2]);

      //real data
      //TODO - have pagination like in movies page here
      // stars = await this.starsService.getPagination();
      // directors = await this.directorsService.getPagination
    }
    catch (e) {
      this.toastrService.show('danger', 'Fetching people went wrong.');

    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      draft.stars = stars;
      draft.directors = directors;
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

    let stars: Star[] = [];

    try {
      stars = await this.starsService.getStarsByName(action.personName);
    }
    catch (e){

    }
    newState = produce(currentState, draft => {
      if(stars.length < 0) {
        this.toastrService.show('', 'There are no people to search');
      }
      else {
        let filteredStars = stars.filter((star: Star) => {
          let value = star.name.toLowerCase().includes(action.personName);
          return value;
        });
        if(filteredStars.length < 0) {
          this.toastrService.show('', 'There are no people that contain name ' + action.personName);
        }
        draft.stars = filteredStars;
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
      //TODO implement same pagination here
      // draft.stars = this.allPeople;
    })

    setState(newState);
  }

  @Action(PeopleReset)
  async peopleReset(
    { getState, setState }: StateContext<PeopleStateModel>) {
    setState(defaultsState);
  }
}

