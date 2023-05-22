import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {Director} from "src/model/director";
import {Star} from "src/model/star";
import {produce} from "immer";
import {
  PeopleOverviewFetchInfo,
  PeopleOverviewReset
} from "src/app/information/people/people-overview/people-overview.actions";
import {PeopleType} from "src/app/information/people/people-overview/constants/constants";
import {Person} from "src/model/person";
import { DirectorService } from "src/api/director.service";
import { StarService } from "src/api/star.service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface PeopleOverviewStateModel {
  isFetching: boolean;
  star: Star;
  person: Director;
}

export const defaultsState: PeopleOverviewStateModel = {
  isFetching: false,
  star: null,
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
  ) {
  }

  @Action(PeopleOverviewFetchInfo)
  peopleOverviewFetchInfo(
    {getState, setState}: StateContext<PeopleOverviewStateModel>,
    action: PeopleOverviewFetchInfo) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);

    let person$: Observable<Person>;

    if (action.peopleType === PeopleType.STAR) {
      person$ = this.starService.getStarById(action.personId);
    } else if(action.peopleType === PeopleType.DIRECTOR) {
      person$ = this.directorService.getDirectorById(action.personId);
    }

    person$
    .pipe(
      tap((person: Person) => {
        person.profilePicture = null; // TODO: This will be removed
        newState = produce(getState(), draft => {
          draft.isFetching = false;
          draft.person = person;
        })
        setState(newState);
      }),
      catchError((error) => {
        this.toastrService.show('danger', 'Fetching people went wrong.');
        newState = produce(getState(), draft => {
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
    { getState, setState }: StateContext<PeopleOverviewStateModel>) {
    setState(defaultsState);
  }
}
