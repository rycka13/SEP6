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
import {MoviesService} from "src/api/movies/movies.service";
import {Star} from "src/model/star";
import {Director} from "src/model/director";
import {Rating} from "src/model/rating";
import {StarsService} from "src/api/stars/stars.service";
import {DirectorsService} from "src/api/directors/directors.service";
import {RatingsService} from "src/api/ratings/ratings.service";
import {MovieService} from "src/api/movies/movie.service";
import {StarService} from "src/api/stars/star.service";
import {DirectorService} from "src/api/directors/director.service";
import {RatingService} from "src/api/ratings/rating.service";
import {peopleMock} from "src/util/mocks/people_mock";

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
    private nbToastrService: NbToastrService,
    private moviesService: MoviesService,
    private movieService: MovieService,
    private starsService: StarsService,
    private starService: StarService,
    private directorsService: DirectorsService,
    private directorService: DirectorService,
    private ratingsService: RatingsService,
    private ratingService: RatingService,
  ) {
  }

  @Action(MovieOverviewFetchInfo)
  async movieOverviewFetchInfo(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchInfo
  ) {
    let newState = produce(getState(), (draft) => {
      draft.isFetching = true;
    });
    setState(newState);

    try {
      const movie = await this.movieService.getMovieById(action.movieId);
      let currentState = getState();
      newState = produce(currentState, (draft) => {
        draft.movie = movie;
        draft.isFetching = false;
      });
      setState(newState);
    } catch (e) {
    }
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
      stars.push(peopleMock[1], peopleMock[2], peopleMock[3]);
      //
      //real data
      //TODO - still 500 response
      // stars = await this.starsService.getStarsByMovieId(action.movieId);
    } catch (e) {

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
      directors.push(peopleMock[1], peopleMock[2]);

      //real data
      //TODO tell colleagues about this method - not implemented
      // this.directorsService.getDirectorsByMovieId(action.movieId)
      //   .subscribe((directorsPredicate: Director[]) => directors = directorsPredicate);
    } catch (e) {

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
      // rating = ratingsMock[1];

      //real data
      rating = await this.ratingService.getRatingByMovieId(action.movieId);
    } catch (e) {

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
      // topMovies.push(moviesMock[4],moviesMock[5],moviesMock[6], moviesMock[7]);

      //real data
      let movies = await this.moviesService.getNMostPopularMovies(action.top);
      topMovies.push(...movies);
    } catch (e) {

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
      // topMoviesByRating.push(moviesMock[1],moviesMock[2], moviesMock[3], moviesMock[9],moviesMock[10]);

      //real data
      console.log(action.rating);
      if (!action.rating) {
        newState = produce(getState, draft => {
          draft.isFetching = false;
        })

        setState(newState);
        return this.nbToastrService.show(
          "Rating is not found",
          "Couldn't fetch information about movies from same rating",
          {
            status: "warning"
          }
        );
      }
      let movies = await this.moviesService.getNMoviesByRating(action.rating, action.listSize);
      topMoviesByRating.push(...movies);
    } catch (e) {

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
      // topMoviesByYear.push(moviesMock[1], moviesMock[2], moviesMock[3], moviesMock[4]);

      //real data
      if (!action.year) {
        newState = produce(getState, draft => {
          draft.isFetching = false;
        })
        return this.nbToastrService.show(
          "Movie is not found",
          "Couldn't fetch information about movies from same year",
          {
            status: "warning"
          }
        );
      }
      let movies = await this.moviesService.getNMoviesByYear(action.year, action.listSize);
      topMoviesByYear.push(...movies);
    } catch (e) {

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
