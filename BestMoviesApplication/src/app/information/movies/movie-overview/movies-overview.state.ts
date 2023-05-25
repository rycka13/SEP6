import { Movie } from "src/model/movie";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import {
  MovieOverviewAddUserRating,
  MovieOverviewFetchBestMoviesTop,
  MovieOverviewFetchDirectors,
  MovieOverviewFetchInfo,
  MovieOverviewFetchMoviesFromSameYear,
  MovieOverviewFetchRating,
  MovieOverviewFetchSameRatingRange,
  MovieOverviewFetchStars, MovieOverviewRemoveUserRating,
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
import { catchError, tap } from "rxjs/operators";
import { moviesMock } from "src/util/mocks/movies_mock";
import { ratingsMock } from "src/util/mocks/ratings_mock";
import { FavoritesService } from "src/api/favorites.service";
import { throwError } from "rxjs";

export interface MovieOverviewStateModel {
  isFetching: boolean;
  isFetchingUserRatingAction: boolean;
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
  isFetchingUserRatingAction: false,
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
    private favoritesService: FavoritesService,
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
    let newState = produce(getState(), (draft) => {
      //TODO uncomment when the api is working
      // draft.isFetching = true;
      draft.movie = moviesMock[0];
      draft.rating = ratingsMock[0];
    });
    patchState(newState);

    //TODO uncomment when the api is working
   // if(action.userName !== undefined) {
   //   return this.movieService.getMovieByIdWithUserRating(action.movieId, action.userName).pipe(
   //     tap(
   //       (movie) => {
   //         let currentState = getState();
   //         let newState = produce(currentState, (draft) => {
   //           draft.movie = movie;
   //           draft.isFetching = false;
   //         });
   //         patchState(newState);
   //       },
   //       () => {
   //         let newState = produce(getState(), (draft )=> {
   //           //TODO will be removed
   //           draft.movie = moviesMock[0];
   //           draft.isFetching = false;
   //         })
   //         this.nbToastrService.show('API Error', 'Could not fetch movie with user rating', {status: "danger"})
   //       }
   //     )
   //   );
   // }
   // else {
   //   return this.movieService.getMovieById(action.movieId).pipe(
   //     tap(
   //       (movie) => {
   //         let currentState = getState();
   //         let newState = produce(currentState, (draft) => {
   //           draft.movie = movie;
   //           draft.isFetching = false;
   //         });
   //         patchState(newState);
   //       },
   //       () => {
   //         this.nbToastrService.show('API Error', 'Could not fetch movie', {status: "danger"})
   //       }
   //     )
   //   );
   // }
  }

  @Action(MovieOverviewAddUserRating)
  async movieOverviewAddUserRating(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewAddUserRating) {

    let rating = Number(action.rating);
    if(action.rating < 1 || action.rating > 10)
    {
      this.nbToastrService.show("Wrong rating", "Add rating between 0 and 10", { status:'warning'});
      return;
    }
    else if(action.rating === undefined) {
      this.nbToastrService.show("Wrong rating", "You didn't add any rating", { status:'warning'});
      return;
    }
    else if(isNaN(rating)) {
      this.nbToastrService.show("Wrong rating", "Please add a number", { status:'warning'});
      return;
    }
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    return this.favoritesService.addRatingToMovie(action.userName, action.movieId, action.rating).
    pipe(
      tap(
        (stars) => {
          newState = produce(getState, (draft) => {
            draft.isFetching = false;
            draft.movie = { ...draft.movie, userRating: action.rating };
          });
          patchState(newState);
        }),
        catchError(error => {
          this.nbToastrService.show('API Error', 'Could not update user rating for movie', {status: 'danger'})
          newState = produce(getState, (draft) => {
            draft.isFetching = false;
          });
          patchState(newState);
          return throwError(error);
        }
      )
    )
  }

  @Action(MovieOverviewRemoveUserRating)
  async movieOverviewRemoveUserRating(
    {getState, setState, patchState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewAddUserRating) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    return this.favoritesService.removeRatingFromMovie(action.userName, action.movieId).
    pipe(
      tap(
        (stars) => {
          newState = produce(getState, (draft) => {
            draft.isFetching = false;
            draft.movie = { ...draft.movie, userRating: null };
          });
          patchState(newState);
        }),
      catchError(error => {
          this.nbToastrService.show('API Error', 'Could not remove user rating for movie', {status: 'danger'})
          newState = produce(getState, (draft) => {
            draft.isFetching = false;
          });
          patchState(newState);
          return throwError(error);
        }
      )
    )
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
      //TODO un comment when api is working
      // draft.isFetching = true;
      draft.rating = ratingsMock[0];
    });
    patchState(newState);

    //TODO uncomment when api is working
    // return this.ratingService.getRatingByMovieId(action.movieId).pipe(
    //   tap(
    //     (rating) => {
    //       let currentState = getState();
    //       let newState = produce(currentState, (draft) => {
    //         draft.rating = rating;
    //         draft.isFetching = false;
    //       });
    //       patchState(newState);
    //     },
    //     () => {
    //       this.nbToastrService.show('API Error', 'Getting rating for movie could not be fetched', {status: 'danger'})
    //     }
    //   )
    // );
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
