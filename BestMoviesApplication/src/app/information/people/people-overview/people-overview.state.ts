import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { produce } from "immer";
import {
  PeopleOverviewFetchInfo,
  PeopleOverviewReset
} from "src/app/information/people/people-overview/people-overview.actions";
import { PeopleType } from "src/app/information/people/people-overview/constants/constants";
import { Person } from "src/model/person";
import { DirectorService } from "src/api/director.service";
import { StarService } from "src/api/star.service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { MoviesService } from "src/api/movies.service";
import { Movie } from "src/model/movie";
import {RatingService} from "src/api/rating.service";

export interface PeopleOverviewStateModel {
  isFetching: boolean;
  averageRatingOfMovies: number;
  person: Person;
}

export const defaultsState: PeopleOverviewStateModel = {
  isFetching: false,
  averageRatingOfMovies: -1,
  person: null,
}

@State<PeopleOverviewStateModel>({
  name: 'peopleOverviewPage',
  defaults: defaultsState,
})

@Injectable()
export class PeopleOverviewState {
  constructor(
    private toastrService: NbToastrService,
    private directorService: DirectorService,
    private starService: StarService,
    private moviesService: MoviesService,
    private ratingService: RatingService,
  ) {
  }

  @Action(PeopleOverviewFetchInfo)
  async peopleOverviewFetchInfo(
    {getState, setState}: StateContext<PeopleOverviewStateModel>,
    action: PeopleOverviewFetchInfo
  ) {
    let newState = produce(getState(), (draft) => {
      draft.isFetching = false;
    });
    setState(newState);

    let person$: Observable<Person>;
    let movies$: Observable<Movie[]>;

    if (action.peopleType === PeopleType.STAR) {
      person$ = this.starService.getStarById(action.personId);
      movies$ = this.moviesService.getAllMoviesForStar(action.personId);
    } else if (action.peopleType === PeopleType.DIRECTOR) {
      person$ = this.directorService.getDirectorById(action.personId);
      movies$ = this.moviesService.getAllMoviesForDirector(action.personId);
    }

    person$
    .pipe(
      tap((person: Person) => {
        movies$
        .pipe(
          tap((movies: Movie[]) => {
            const updatedPerson: Person = {...person, movies};
            newState = produce(getState(), (draft) => {
              draft.isFetching = false;
              draft.person = updatedPerson;
            });
            setState(newState);
          }),
          catchError((error) => {
            this.toastrService.show('danger', 'Fetching person movies went wrong.');
            newState = produce(getState(), (draft) => {
              draft.isFetching = false;
            });
            setState(newState);
            return throwError(error);
          })
        )
        .subscribe();
      }),
      catchError((error) => {
        this.toastrService.show('danger', 'Fetching person information went wrong.');
        newState = produce(getState(), (draft) => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }

  @Action(PeopleOverviewReset)
  async peopleReset(
    {getState, setState}: StateContext<PeopleOverviewStateModel>) {
    setState(defaultsState);
  }
}
