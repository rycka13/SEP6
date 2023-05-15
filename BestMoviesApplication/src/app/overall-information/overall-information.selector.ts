import {Selector} from "@ngxs/store";
import {OverAllInformationState, OverAllInformationStateModel} from "./overall-information.state";

export class OverallInformationSelector {
  @Selector([OverAllInformationState])
  static isFetching(state: OverAllInformationStateModel) {
    return state.isFetching;
  }

  @Selector([OverAllInformationState])
  static movies(state: OverAllInformationStateModel) {
    return state.movies;
  }

  @Selector([OverAllInformationState])
  static people(state: OverAllInformationStateModel) {
    return state.people;
  }

  @Selector([OverAllInformationState])
  static bestMovies(state: OverAllInformationStateModel) {
    return state.bestMovies;
  }
}
