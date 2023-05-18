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

  @Selector([MoviesOverviewState])
  static rating(state: MovieOverviewStateModel) {
    return state.rating;
  }

  @Selector([MoviesOverviewState])
  static directors(state: MovieOverviewStateModel) {
    return state.directors;
  }

  @Selector([MoviesOverviewState])
  static stars(state: MovieOverviewStateModel) {
    return state.stars;
  }
}
