import {Selector} from "@ngxs/store";
import {MoviesState, MoviesStateModel} from "./movies.state";

export class MoviesSelector {
  @Selector([MoviesState])
  static isFetching(state: MoviesStateModel) {
    return state.isFetching;
  }

  @Selector([MoviesState])
  static movies(state: MoviesStateModel) {
    return state.movies;
  }
}
