import {Selector} from "@ngxs/store";
import {MoviesState, MoviesStateModel} from "./movies.state";

export class MoviesSelector {
  @Selector([MoviesState])
  static isFetching(state: MoviesStateModel) {
    return state.isFetching;
  }

  @Selector([MoviesState])
  static isFiltered(state: MoviesStateModel) {
    return state.isFiltered;
  }

  @Selector([MoviesState])
  static moviesDisplayed(state: MoviesStateModel) {
    return state.movies;
  }

  @Selector([MoviesState])
  static pageNumber(state: MoviesStateModel) {
    return state.pageNumber;
  }
}
