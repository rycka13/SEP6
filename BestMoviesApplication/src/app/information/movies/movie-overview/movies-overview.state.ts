import {Movie} from "src/model/movie";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {
  MovieOverviewFetchBestMoviesTop,
  MovieOverviewFetchDirectors,
  MovieOverviewFetchInfo,
  MovieOverviewFetchMoviesFromSameYear,
  MovieOverviewFetchRating,
  MovieOverviewFetchSameRatingRange,
  MovieOverviewFetchStars,
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
  topMovies: Movie[];
  topMoviesByRating: Movie[];
  topMoviesByYear: Movie[];
  stars: Star[];
  directors: Director[];
}

export const defaultsState: MovieOverviewStateModel = {
  isFetching: false,
  movie: null,
  rating: null,
  topMovies: [],
  topMoviesByRating: [],
  topMoviesByYear: [],
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

    let stars: Star[] = [];
    try {
      //mock
      stars.push(starsMock[1],starsMock[2],starsMock[3]);

      //real data
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

    let directors: Director[] = [];
    try {
      //mock
      directors.push(directorsMock[1],directorsMock[2]);

      //real data
      //TODO tell colleagues about this method
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

  @Action(MovieOverviewFetchRating)
  async movieOverviewFetchRatings(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchRating) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let rating: Rating;
    try {
      //mock
      rating = ratingsMock[1];

      //real data
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

  @Action(MovieOverviewFetchBestMoviesTop)
  async movieOverviewFetchBestMoviesTop(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchBestMoviesTop) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let topMovies: Movie[] = [];
    try {

      //mock
      topMovies.push(moviesMock[4],moviesMock[5],moviesMock[6], moviesMock[7]);

      //real data
      // this.movieService.getNMostPopularMovies(action.top)
      //   .subscribe((moviesPredicate: Movie[]) => topMovies = moviesPredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.topMovies = topMovies;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(MovieOverviewFetchSameRatingRange)
  async movieOverviewFetchSameRatingRange(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchSameRatingRange) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let topMoviesByRating: Movie[] = [];
    try {

      //mock
      topMoviesByRating.push(moviesMock[1],moviesMock[2], moviesMock[3], moviesMock[9],moviesMock[10]);

      //real data
      // this.movieService.getNMoviesByRating(action.rating, action.listSize)
      //   .subscribe((moviesPredicate: Movie[]) => topMoviesByRating = moviesPredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.topMoviesByRating = topMoviesByRating;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(MovieOverviewFetchMoviesFromSameYear)
  async movieOverviewFetchMoviesFromSameYear(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchMoviesFromSameYear) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let topMoviesByYear: Movie[] = [];
    try {

      //mock
      topMoviesByYear.push(moviesMock[1],moviesMock[2],moviesMock[3],moviesMock[4]);

      //real data
      // this.movieService.getNMoviesByYear(action.year, action.listSize)
      //   .subscribe((moviesPredicate: Movie[]) => topMoviesByYear = moviesPredicate);
    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.topMoviesByYear = topMoviesByYear;
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
