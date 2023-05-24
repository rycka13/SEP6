import {Selector} from "@ngxs/store";
import {OverAllInformationState, OverAllInformationStateModel} from "./overall-information.state";
export class OverallInformationSelector {
  @Selector([OverAllInformationState])
  static isFetching(state: OverAllInformationStateModel) {
    return state.isFetching;
  }

  @Selector([OverAllInformationState])
  static moviesByYearIsFiltered(state: OverAllInformationStateModel) {
    return state.moviesByYearIsFiltered;
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
  static topMovies(state: OverAllInformationStateModel) {
    return state.topMovies;
  }

  @Selector([OverAllInformationState])
  static topMoviesByRating(state: OverAllInformationStateModel) {
    return state.topMoviesByRating;
  }

  @Selector([OverAllInformationState])
  static topMoviesByYear(state: OverAllInformationStateModel) {
    return state.topMoviesByYear;
  }
}
