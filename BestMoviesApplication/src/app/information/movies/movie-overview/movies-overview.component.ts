import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  MovieOverviewFetchStars, MovieOverviewReset
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {Rating} from "src/model/rating";
import {Director} from "src/model/director";
import {Star} from "src/model/star";
import {NbToastrService} from "@nebular/theme";
import {switchMap} from "rxjs/operators";
import { AuthService } from "src/core/services/auth.service";
import { User } from "src/model/user";

@Component({
  selector: 'app-movies-overview',
  templateUrl: './movies-overview.component.html',
  styleUrls: ['./movies-overview.component.scss']
})
export class MoviesOverviewComponent implements OnInit, OnDestroy{

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

  TOP_SIZE_LIST: number = 5;

  user: User = null;
  alive: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private nbToastrService: NbToastrService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.route.params
      .pipe(
        switchMap(params => {
          const movieId = params['movieId'];
          const initialActions = [
            new MovieOverviewFetchInfo(movieId, this.user.userName),
            new MovieOverviewFetchRating(movieId),
            new MovieOverviewFetchDirectors(movieId),
            new MovieOverviewFetchStars(movieId),
            new MovieOverviewFetchBestMoviesTop(this.TOP_SIZE_LIST),
          ];
          let actionsInParallel = [];

          return this.store.dispatch([...initialActions]).pipe(
            switchMap(() => {
              let movie = this.store.selectSnapshot(MoviesOverviewSelector.movie);

              if(movie) {
                actionsInParallel = [
                  ...actionsInParallel,
                  new MovieOverviewFetchMoviesFromSameYear(this.TOP_SIZE_LIST, movie.year),
                ];
              }
              let rating = this.store.selectSnapshot(MoviesOverviewSelector.rating);
              if(rating) {
                actionsInParallel = [
                  ...actionsInParallel,
                  new MovieOverviewFetchSameRatingRange(this.TOP_SIZE_LIST, rating.rating),
                ]
              }
              return this.store.dispatch(actionsInParallel);
            })
          );
        })
      )
      .subscribe(() => {
        let stars = this.store.selectSnapshot(MoviesOverviewSelector.stars);
      });
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new MovieOverviewReset());
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  redirectToDirectorOverview(directorId) {
    this.router.navigate([`/information/people/director/${directorId}`]);
  }

  redirectToStarOverview(starId) {
    this.router.navigate([`/information/people/star/${starId}`]);
  }
}
