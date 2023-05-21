import {Selector} from "@ngxs/store";
import {PeopleState, PeopleStateModel} from "src/app/information/people/people.state";

export class PeopleSelector {
  @Selector([PeopleState])
  static isFetching(state: PeopleStateModel) {
    return state.isFetching;
  }

  @Selector([PeopleState])
  static starsAreFiltered(state: PeopleStateModel) {
    return state.starsAreFiltered;
  }

  @Selector([PeopleState])
  static directorsAreFiltered(state: PeopleStateModel) {
    return state.directorsAreFiltered;
  }

  @Selector([PeopleState])
  static stars(state: PeopleStateModel) {
    return state.stars;
  }

  @Selector([PeopleState])
  static directors(state: PeopleStateModel) {
    return state.directors;
  }
}
