import {Selector} from "@ngxs/store";
import {
  MovieOverviewStateModel,
  MoviesOverviewState
} from "src/app/information/movies/movie-overview/movies-overview.state";

export class MoviesOverviewSelector {
  @Selector([MoviesOverviewState])
  static isFetching(state: MovieOverviewStateModel) {
    return state.isFetching;
  }

  @Selector([MoviesOverviewState])
  static movie(state: MovieOverviewStateModel) {
    return state.movie;
  }
}
