import {Selector} from "@ngxs/store";
import {MoviesState, MoviesStateModel} from "./movies.state";
import {Movie} from "src/model/movie";

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
  static allMovies(state: MoviesStateModel) {
    return state.allMovies;
  }

  @Selector([MoviesState])
  static moviesDisplayed(state: MoviesStateModel) {
    return state.moviesDisplayed;
  }

  @Selector([MoviesState])
  static pageSize(state: MoviesStateModel) {
    return state.pageSize;
  }

  @Selector([MoviesState])
  static pageToLoadNext(state: MoviesStateModel) {
    return state.pageToLoadNext;
  }
}
