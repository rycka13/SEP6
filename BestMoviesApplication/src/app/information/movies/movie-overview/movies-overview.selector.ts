import {Selector} from "@ngxs/store";
import {
  MovieOverviewStateModel,
  MoviesOverviewState
} from "src/app/information/movies/movie-overview/movies-overview.state";
import {Movie} from "src/model/movie";

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

  @Selector([MoviesOverviewState])
  static topMovies(state: MovieOverviewStateModel) {
    return state.topMovies;
  }

  @Selector([MoviesOverviewState])
  static topMoviesByRating(state: MovieOverviewStateModel) {
    return state.topMoviesByRating;
  }

  @Selector([MoviesOverviewState])
  static topMoviesByYear(state: MovieOverviewStateModel) {
    return state.topMoviesByYear;
  }
}
