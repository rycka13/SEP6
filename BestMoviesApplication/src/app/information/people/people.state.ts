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
  PeopleFetchDirectorsNextPage, PeopleFetchInfoFirstPage, PeopleFetchStarsNextPage,
  PeopleReset, PeopleSearchDirectorsByName, PeopleSearchDirectorsReset,
  PeopleSearchStarsByName,
  PeopleSearchStarsReset
} from "src/app/information/people/people.actions";
import {peopleMock} from "src/util/mocks/people_mock";
import {Star} from "src/model/star";
import {StarsService} from "src/api/stars/stars.service";
import {DirectorService} from "src/api/directors/director.service";
import {Director} from "src/model/director";
import {DirectorsService} from "src/api/directors/directors.service";

export interface PeopleStateModel {
  isFetching: boolean;
  starsAreFiltered: boolean;
  directorsAreFiltered: boolean;
  pageNumberStars: number;
  pageNumberDirectors: number;
  stars: Star[];
  directors: Star[];
}

export const defaultsState: PeopleStateModel = {
  isFetching: false,
  starsAreFiltered: false,
  directorsAreFiltered: false,
  pageNumberStars: 1,
  pageNumberDirectors: 1,
  stars: [],
  directors: [],
}

@State<PeopleStateModel>({
  name: 'peoplePage',
  defaults: defaultsState,
})

@Injectable()
export class PeopleState {
  constructor(
    private toastrService: NbToastrService,
    private starsService: StarsService,
    private directorsService: DirectorsService,
  ) {
  }

  @Action(PeopleFetchInfoFirstPage)
  async peopleFetchInfo(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    let stars: Star[] = [];
    let directors: Star[] = [];
    try {
      //real data
      //TODO - have pagination like in movies page here
      // stars = await this.starsService.getPagination();
      // directors = await this.directorsService.getPagination
    } catch (e) {
      this.toastrService.show('danger', 'Fetching people went wrong.');

    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      draft.stars = stars;
      draft.directors = directors;
    })

    setState(newState);
  }

  @Action(PeopleFetchStarsNextPage)
  async peopleFetchStarsNextPage(
    {getState, setState}: StateContext<PeopleStateModel>) {
  }

  @Action(PeopleFetchDirectorsNextPage)
  async peopleFetchDirectorsNextPage(
    {getState, setState}: StateContext<PeopleStateModel>) {
  }

  @Action(PeopleSearchStarsByName)
  async peopleSearchStarsByName(
    {getState, setState}: StateContext<PeopleStateModel>,
    action: PeopleSearchStarsByName) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    let filteredStars: Star[] = [];

    try {
      filteredStars = await this.starsService.getStarsByName(action.starName);
    } catch (e) {

    }
    newState = produce(currentState, draft => {
      if (filteredStars.length < 0) {
        this.toastrService.show('', 'There are no people that contain name ' + action.starName);
      }
      draft.isFetching = false;
      draft.starsAreFiltered = true;
      draft.stars = filteredStars;
    });

    setState(newState);
  }

  @Action(PeopleSearchDirectorsByName)
  async peopleSearchDirectorsByName(
    {getState, setState}: StateContext<PeopleStateModel>,
    action: PeopleSearchDirectorsByName) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    let filteredDirectors: Director[] = [];

    try {
      // filteredDirectors = await this.directorsService.getDirectorsByName(action.directorName);
    } catch (e) {

    }
    newState = produce(currentState, draft => {
      if (filteredDirectors.length < 0) {
        this.toastrService.show('', 'There are no people that contain name ' + action.directorName);
      }
      draft.isFetching = false;
      draft.directorsAreFiltered = true;
      draft.directors = filteredDirectors;
    });
    setState(newState);
  }

  @Action(PeopleSearchStarsReset)
  async peopleSearchStarsReset(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.starsAreFiltered = false;
      //TODO implement same pagination here
      // draft.stars = this.allPeople;
    })

    setState(newState);
  }

  @Action(PeopleSearchDirectorsReset)
  async peopleSearchDirectorsReset(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.directorsAreFiltered = false;
      //TODO implement same pagination here
      // draft.stars = this.allPeople;
    })

    setState(newState);
  }

  @Action(PeopleReset)
  async peopleReset(
    {setState}: StateContext<PeopleStateModel>) {
    setState(defaultsState);
  }
}

