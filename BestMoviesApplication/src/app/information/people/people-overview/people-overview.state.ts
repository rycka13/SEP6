import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {Director} from "src/model/director";
import {Star} from "src/model/star";
import {DirectorService} from "src/api/directors/director.service";
import {StarService} from "src/api/stars/star.service";
import {produce} from "immer";
import {
  PeopleOverviewFetchInfo,
  PeopleOverviewReset
} from "src/app/information/people/people-overview/people-overview.actions";
import {PeopleType} from "src/app/information/people/people-overview/constants/constants";
import {starsMock} from "src/util/mocks/stars_mock";
import {directorsMock} from "src/util/mocks/directors_mock";

export interface PeopleOverviewStateModel {
  isFetching: boolean;
  person: Star | Director;
}

export const defaultsState: PeopleOverviewStateModel = {
  isFetching: false,
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
  async peopleOverviewFetchInfo(
    {getState, setState}: StateContext<PeopleOverviewStateModel>,
    action: PeopleOverviewFetchInfo) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    let person: Star | Director;
    let peopleType = this.getPeopleType(action.peopleType);
    try {
      if (peopleType === PeopleType.STAR) {
        //mock
        // person = starsMock[0] as Star;

        //real data
        person = await this.starService.getStarById(action.personId) as Star;
      } else if(peopleType === PeopleType.DIRECTOR) {
        //mock
        // person = directorsMock[0] as Director;

        //real data
        person = await this.directorService.getDirectorById(action.personId) as Director;
      }

      //TODO ERROR PosterImage is not mapped when calling one of the api above
      //todo this will be removed
      person.posterImage = null;
    } catch (e) {
      this.toastrService.show('danger', 'Fetching people went wrong.');

    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      draft.person = person;
    })

    setState(newState);
  }

  @Action(PeopleOverviewReset)
  async peopleReset(
    { getState, setState }: StateContext<PeopleOverviewStateModel>) {
    setState(defaultsState);
  }

  getPeopleType(peopleType: string) {
    switch(peopleType) {
      case "star" : return PeopleType.STAR;
      case "director" : return PeopleType.DIRECTOR;
      default: return PeopleType.UNKNOWN;
    }
  }

}
