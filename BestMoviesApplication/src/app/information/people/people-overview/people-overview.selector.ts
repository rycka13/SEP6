import {Selector} from "@ngxs/store";
import {
  PeopleOverviewState,
  PeopleOverviewStateModel
} from "src/app/information/people/people-overview/people-overview.state";

export class PeopleOverviewSelector {
  @Selector([PeopleOverviewState])
  static isFetching(state: PeopleOverviewStateModel) {
    return state.isFetching;
  }

  @Selector([PeopleOverviewState])
  static person(state: PeopleOverviewStateModel) {
    return state.person;
  }

  @Selector([PeopleOverviewState])
  static movies(state: PeopleOverviewStateModel) {
    return state.person.movies;
  }
}
