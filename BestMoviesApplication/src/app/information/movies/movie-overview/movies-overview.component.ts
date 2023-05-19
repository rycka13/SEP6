import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {MoviesOverviewSelector} from "src/app/information/movies/movie-overview/movies-overview.selector";
import {Movie} from "src/model/movie";
import {
  MovieOverviewFetchBestMoviesTop,
  MovieOverviewFetchDirectors,
  MovieOverviewFetchInfo,
  MovieOverviewFetchMoviesFromSameYear,
  MovieOverviewFetchRating,
  MovieOverviewFetchSameRatingRange,
  MovieOverviewFetchStars
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {Rating} from "src/model/rating";
import {Director} from "src/model/director";
import {Star} from "src/model/star";
import {MoviesFetchInfo} from "src/app/information/movies/movies.actions";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-movies-overview',
  templateUrl: './movies-overview.component.html',
  styleUrls: ['./movies-overview.component.scss']
})
export class MoviesOverviewComponent {

  @Select(MoviesOverviewSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(MoviesOverviewSelector.movie)
  movie$: Observable<Movie>;

  @Select(MoviesOverviewSelector.rating)
  rating$: Observable<Rating>;

  @Select(MoviesOverviewSelector.directors)
  directors$: Observable<Director[]>;

  @Select(MoviesOverviewSelector.stars)
  stars$: Observable<Star[]>;

  @Select(MoviesOverviewSelector.topMovies)
  topMovies$: Observable<Movie[]>;

  @Select(MoviesOverviewSelector.topMoviesByRating)
  topMoviesByRating$: Observable<Movie[]>;

  @Select(MoviesOverviewSelector.topMoviesByYear)
  topMoviesByYear$: Observable<Movie[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private nbToastrService: NbToastrService,
  ) {
    let movieId;
    this.route.params.subscribe(params => (movieId = params['movieId']));

    console.log(movieId);
    const initialActions = [
      new MovieOverviewFetchInfo(movieId),
      new MovieOverviewFetchRating(movieId)
    ];

    let actionsInParallel = [];

// Fetch movie first
    this.store.dispatch([...initialActions]).subscribe(() => {
      let movie = this.store.selectSnapshot(MoviesOverviewSelector.movie);
      let rating = this.store.selectSnapshot(MoviesOverviewSelector.rating);

      if (movie && rating) {
        actionsInParallel = [
          ...actionsInParallel,
          new MovieOverviewFetchBestMoviesTop(5),
          new MovieOverviewFetchMoviesFromSameYear(5, movie.year),
          new MovieOverviewFetchSameRatingRange(5, rating.rating)
        ];
      } else {
        this.nbToastrService.show(
          "Movies or rating is null",
          "Couldn't fetch information about top lists",
          {
            status: "danger"
          }
        );
      }

      actionsInParallel = [
        ...actionsInParallel,
        new MovieOverviewFetchStars(movieId),
        new MovieOverviewFetchDirectors(movieId)
      ];

      this.store.dispatch(actionsInParallel);
    });
  }
}
