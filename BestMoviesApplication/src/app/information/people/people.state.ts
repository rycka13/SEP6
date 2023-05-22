import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { produce } from "immer";
import {
  PeopleFetchDirectorsNextPage, PeopleFetchInfoFirstPage, PeopleFetchStarsNextPage,
  PeopleReset, PeopleSearchDirectorsByName, PeopleSearchDirectorsReset,
  PeopleSearchStarsByName,
  PeopleSearchStarsReset
} from "src/app/information/people/people.actions";
import { Star } from "src/model/star";
import { Director } from "src/model/director";
import { StarsService } from "src/api/stars.service";
import { DirectorsService } from "src/api/directors.service";
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  currentStars: Star[] = [];
  currentDirectors: Star[] = [];
  initialPageSize: number = 20;

  constructor(
    private toastrService: NbToastrService,
    private starsService: StarsService,
    private directorsService: DirectorsService,
  ) {
  }

  @Action(PeopleFetchInfoFirstPage)
  peopleFetchInfoFirstPage(
    {getState, setState}: StateContext<PeopleStateModel>
  ) {
    let currentPageNumberStars = getState().pageNumberStars;
    let currentPageNumberDirectors = getState().pageNumberDirectors;

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });

    setState(newState);

    console.log(newState.isFetching);

    this.starsService.getStarsPerPage(currentPageNumberStars, this.initialPageSize)
    .pipe(
      tap(stars => {
        newState = produce(getState(), draft => {
          draft.stars = stars;
          this.currentStars = stars;
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

    this.directorsService.getDirectorsPerPage(currentPageNumberDirectors, this.initialPageSize)
    .pipe(
      tap(directors => {
        newState = produce(getState(), draft => {
          draft.directors = directors;
          this.currentDirectors = directors;
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

    newState = produce(getState(), draft => {
      draft.isFetching = false;
    });

    setState(newState);
  }


  @Action(PeopleFetchStarsNextPage)
  async peopleFetchStarsNextPage(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })

    setState(newState);

    let pageNumberStars = getState().pageNumberStars;

    this.starsService.getStarsPerPage(pageNumberStars, this.initialPageSize)
    .pipe(
      tap(stars => {
        newState = produce(getState(), draft => {
          let currentStars = draft.stars;
          draft.stars = [...currentStars, ...stars];
          this.currentStars = draft.stars;
          draft.isFetching = false;
          draft.pageNumberStars++;
        })
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

  @Action(PeopleFetchDirectorsNextPage)
  async peopleFetchDirectorsNextPage(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })

    setState(newState);

    let pageNumberDirectors = getState().pageNumberDirectors;

    this.directorsService.getDirectorsPerPage(pageNumberDirectors, this.initialPageSize)
    .pipe(
      tap(directors => {
        newState = produce(getState(), draft => {
          let currentDirectors = draft.stars;
          draft.directors = [...currentDirectors, ...directors];
          this.currentDirectors = draft.directors;
          draft.isFetching = false;
          draft.pageNumberDirectors++;
        })
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
          newState = produce(getState(), draft => {
            draft.isFetching = false;
          });
          setState(newState);
          this.toastrService.show('', 'There are no people that contain name ' + action.starName, {status: 'info'});
        }
        else {
          newState = produce(getState(), draft => {
            draft.isFetching = false;
            draft.starsAreFiltered = true;
            draft.stars = filteredStars;
          });
          setState(newState);
        }
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
          this.toastrService.show('', 'There are no people that contain name ' + action.directorName, {status: 'info'});
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
      draft.stars = this.currentStars;
    })

    setState(newState);
  }

  @Action(PeopleSearchDirectorsReset)
  async peopleSearchDirectorsReset(
    {getState, setState}: StateContext<PeopleStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    currentState = getState();

    newState = produce(currentState, draft => {
      draft.directorsAreFiltered = false;
      draft.isFetching = false;
      draft.directors = this.currentDirectors;
    })

    setState(newState);
  }

  @Action(PeopleReset)
  async peopleReset(
    {setState}: StateContext<PeopleStateModel>) {
    setState(defaultsState);
  }
}

