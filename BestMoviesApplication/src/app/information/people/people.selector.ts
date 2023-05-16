import {Selector} from "@ngxs/store";
import {PeopleState, PeopleStateModel} from "src/app/information/people/people.state";

export class PeopleSelector {
  @Selector([PeopleState])
  static isFetching(state: PeopleStateModel) {
    return state.isFetching;
  }

  @Selector([PeopleState])
  static isFiltered(state: PeopleStateModel) {
    return state.isFiltered;
  }

  @Selector([PeopleState])
  static people(state: PeopleStateModel) {
    return state.people;
  }
}
