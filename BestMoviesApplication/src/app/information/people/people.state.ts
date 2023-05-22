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

  initialPageSize: number = 20;
  currentPageNumberStars: number = 1;
  constructor(
    private toastrService: NbToastrService,
    private starsService: StarsService,
    private directorsService: DirectorsService,
  ) {
  }

  @Action(PeopleFetchInfoFirstPage)
  async peopleFetchInfoFirstPage(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let currentPageNumberStars = getState().pageNumberStars;
    let currentPageNumberDirectors = getState().pageNumberDirectors;

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })

    setState(newState);

    await this.starsService.getStarsPerPage(currentPageNumberStars, this.initialPageSize)
      .then(stars => {
        newState = produce(getState(), draft => {
          draft.stars = stars;
        })
        setState(newState);
      })
      .catch(error => {
        this.toastrService.show(error, 'Fetching stars went wrong.', {status: 'danger'});
      });

    await this.directorsService.getDirectorsPerPage(currentPageNumberDirectors, this.initialPageSize)
      .then(directors => {
        newState = produce(getState(), draft => {
          draft.directors = directors;
        })
        setState(newState);
      })
      .catch(error => {
        this.toastrService.show(error, 'Fetching directors went wrong.', {status: 'danger'});
      });

    newState = produce(getState(), draft => {
      draft.isFetching = false;
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
  peopleSearchStarsByName(
    {getState, setState}: StateContext<PeopleStateModel>,
    action: PeopleSearchStarsByName) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);

    this.starsService.getStarsByName(action.starName)
    .pipe(
      tap((filteredStars: Star[]) => {
        if (!filteredStars || filteredStars.length === 0) {
          this.toastrService.show('', 'There are no people that contain name ' + action.starName, {status: 'danger'});
        }
        newState = produce(getState(), draft => {
          draft.isFetching = false;
          draft.starsAreFiltered = true;
          draft.stars = filteredStars;
        });
        setState(newState);
      }),
      catchError(error => {
        this.toastrService.show(error, 'Fetching stars went wrong.', {status: 'danger'});
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }


  @Action(PeopleSearchDirectorsByName)
  peopleSearchDirectorsByName(
    {getState, setState}: StateContext<PeopleStateModel>,
    action: PeopleSearchDirectorsByName) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    });

    setState(newState);

    this.directorsService.getDirectorsByName(action.directorName)
    .pipe(
      tap((filteredDirectors: Director[]) => {
        if (!filteredDirectors || filteredDirectors.length === 0) {
          this.toastrService.show('', 'There are no people that contain name ' + action.directorName, {status: 'danger'});
        }
        newState = produce(getState(), draft => {
          draft.isFetching = false;
          draft.directorsAreFiltered = true;
          draft.directors = filteredDirectors;
        });
        setState(newState);
      }),
      catchError(error => {
        this.toastrService.show(error, 'Fetching directors went wrong.', {status: 'danger'});
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
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

