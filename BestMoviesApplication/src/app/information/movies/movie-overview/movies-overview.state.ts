import {Movie} from "src/model/movie";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {
  MovieOverviewFetchDirectors,
  MovieOverviewFetchInfo, MovieOverviewFetchRatings, MovieOverviewFetchStars,
  MovieOverviewReset
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {produce} from "immer";
import {moviesMock} from "src/util/mocks/movies_mock";
import {MoviesService} from "src/api/movies.service";
import {Star} from "src/model/star";
import {starsMock} from "src/util/mocks/stars_mock";
import {Director} from "src/model/director";
import {Rating} from "src/model/rating";
import {StarsService} from "src/api/stars.service";
import {DirectorsService} from "src/api/directors.service";
import {RatingsService} from "src/api/ratings.service";
import {directorsMock} from "src/util/mocks/directors_mock";
import {ratingsMock} from "src/util/mocks/ratings_mock";

export interface MovieOverviewStateModel {
  isFetching: boolean;
  movie: Movie;
  rating: Rating;
  stars: Star[];
  directors: Director[];
}

export const defaultsState: MovieOverviewStateModel = {
  isFetching: false,
  movie: null,
  rating: null,
  stars: [],
  directors: [],
}

@State<MovieOverviewStateModel>({
  name: 'movieOverviewPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesOverviewState {
  constructor(
    private toastrService: NbToastrService,
    private movieService: MoviesService,
    private starsService: StarsService,
    private directorsService: DirectorsService,
    private ratingsService: RatingsService,
  ) {
  }

  @Action(MovieOverviewFetchInfo)
  async movieOverviewFetchInfo(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchInfo) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let movie: Movie;
    try {
      movie = moviesMock.find((moviePredicate: Movie) => moviePredicate.id == action.movieId);

      // this.movieService.getMovieById(action.movieId)
      //   .subscribe((moviePredicate: Movie) => movie = moviePredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.movie = movie;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(MovieOverviewFetchStars)
  async movieOverviewFetchStars(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchStars) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let stars: Star[];
    try {
      //TODO this one needs to be another action from its page
      stars = starsMock.filter((starPredicate: Star) => {
        let starsForMovie = starPredicate.movies.filter((moviePredicate: Movie) => moviePredicate.id == action.movieId);
        return starsForMovie.length > 0;
      });

      // this.starsService.getStarsByMovieId(action.movieId)
      //   .subscribe((starsPredicate: Star[]) => stars = starsPredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.stars = stars;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(MovieOverviewFetchDirectors)
  async movieOverviewFetchDirectors(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchDirectors) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let directors: Director[];
    try {
      //TODO this one needs to be another action from its page
      directors = directorsMock.filter((directorPredicate: Director) => {
        let directorsForMovie = directorPredicate.movies.filter((moviePredicate: Movie) => moviePredicate.id == action.movieId);
        return directorsForMovie.length > 0;
      });

      // //TODO tell colleagues about this method
      // this.directorsService.getDirectorsByMovieId(action.movieId)
      //   .subscribe((directorsPredicate: Director[]) => directors = directorsPredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.directors = directors;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(MovieOverviewFetchRatings)
  async movieOverviewFetchRatings(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchRatings) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let rating: Rating;
    try {
      rating = ratingsMock.find((ratingPredicate: Rating) => ratingPredicate.movie.id = action.movieId);

      // this.ratingsService.getRatingByMovieId(action.movieId)
      //   .subscribe((ratingPredicate: Rating) => rating = ratingPredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.rating = rating;
      draft.isFetching = false;
    })
    setState(newState);
  }
  @Action(MovieOverviewReset)
  async moviesReset(
    {getState, setState}
      :
      StateContext<MovieOverviewStateModel>
  ) {
    setState(defaultsState);
  }
}
