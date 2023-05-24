import { Movie } from "src/model/movie";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
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
import { produce } from "immer";
import { Star } from "src/model/star";
import { Director } from "src/model/director";
import { Rating } from "src/model/rating";
import { peopleMock } from "src/util/mocks/people_mock";
import { MoviesService } from "src/api/movies.service";
import { MovieService } from "src/api/movie.service";
import { StarsService } from "src/api/stars.service";
import { StarService } from "src/api/star.service";
import { DirectorsService } from "src/api/directors.service";
import { DirectorService } from "src/api/director.service";
import { RatingsService } from "src/api/ratings.service";
import { RatingService } from "src/api/rating.service";
import { tap } from "rxjs/operators";

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
  movieOverviewFetchInfo(
    {getState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchInfo
  ) {
    const newState = produce(getState(), (draft) => {
      draft.isFetching = true;
    });
    patchState(newState);

    return this.movieService.getMovieById(action.movieId).pipe(
      tap(
        (movie) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.movie = movie;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          // handle error here if you need to
        }
      )
    );
  }


  @Action(MovieOverviewFetchStars)
  async movieOverviewFetchStars(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchStars) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);
    //mock
    // stars.push(peopleMock[1], peopleMock[2], peopleMock[3]);
    //
    //real data
    return this.starsService.getStarsByMovieId(action.movieId).pipe(
      tap(
        (stars) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.stars = stars;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          this.nbToastrService.show('API Error', 'Stars for movie could not be fetched', {status: 'danger'})
        }
      )
    );
  }

  @Action(MovieOverviewFetchDirectors)
  async movieOverviewFetchDirectors(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchDirectors) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);
    // mock
    // directors.push(peopleMock[1], peopleMock[2]);

    // real data
    return this.directorsService.getDirectorsByMovieId(action.movieId).pipe(
      tap(
        (directors) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.directors = directors;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          this.nbToastrService.show('API Error', 'Stars for movie could not be fetched', {status: 'danger'})
        }
      )
    );
  }

  @Action(MovieOverviewFetchRating)
  async movieOverviewFetchRating(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchRating) {

    const newState = produce(getState(), (draft) => {
      draft.isFetching = true;
    });
    patchState(newState);

    return this.ratingService.getRatingByMovieId(action.movieId).pipe(
      tap(
        (rating) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.rating = rating;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          this.nbToastrService.show('API Error', 'Getting rating for movie could not be fetched', {status: 'danger'})
        }
      )
    );
  }

  @Action(MovieOverviewFetchBestMoviesTop)
  async movieOverviewFetchBestMoviesTop(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchBestMoviesTop) {

    const newState = produce(getState(), (draft) => {
      draft.isFetching = true;
    });
    patchState(newState);

    return this.moviesService.getNMostPopularMovies(action.top).pipe(
      tap(
        (topMovies) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.topMovies = topMovies;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          this.nbToastrService.show('API Error', 'Popular movies could not be fetched', {status: 'danger'})
        }
      )
    );
  }

  @Action(MovieOverviewFetchSameRatingRange)
  async movieOverviewFetchSameRatingRange(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchSameRatingRange) {

    const newState = produce(getState(), (draft) => {
      draft.isFetching = true;
    });
    patchState(newState);

    return this.moviesService.getNMoviesByRating(action.rating, action.listSize).pipe(
      tap(
        (topMoviesByRating) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.topMoviesByRating = topMoviesByRating;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          this.nbToastrService.show('API Error', `Movies with rating ${action.rating} could not be fetched`, {status: 'danger'})
        }
      )
    );
  }

  @Action(MovieOverviewFetchMoviesFromSameYear)
  async movieOverviewFetchMoviesFromSameYear(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchMoviesFromSameYear) {

    const newState = produce(getState(), (draft) => {
      draft.isFetching = true;
    });
    patchState(newState);

    return this.moviesService.getNMoviesByYear(action.year, action.listSize).pipe(
      tap(
        (topMoviesByYear) => {
          let currentState = getState();
          let newState = produce(currentState, (draft) => {
            draft.topMoviesByYear = topMoviesByYear;
            draft.isFetching = false;
          });
          patchState(newState);
        },
        () => {
          this.nbToastrService.show('API Error', `Movies for year ${action.year} could not be fetched`, {status: 'danger'})
        }
      )
    );
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
