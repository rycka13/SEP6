import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {MoviesOverviewSelector} from "src/app/information/movies/movie-overview/movies-overview.selector";
import {Movie} from "src/model/movie";
import {
  MovieOverviewFetchDirectors,
  MovieOverviewFetchInfo, MovieOverviewFetchRatings,
  MovieOverviewFetchStars
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {Rating} from "src/model/rating";
import {Director} from "src/model/director";
import {Star} from "src/model/star";

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

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    let movieId;
    this.route.params.subscribe(params => movieId = params['movieId']);

    let actionsInParallel = [
      new MovieOverviewFetchInfo(movieId),
      new MovieOverviewFetchStars(movieId),
      new MovieOverviewFetchDirectors(movieId),
      new MovieOverviewFetchRatings(movieId),
    ]
    this.store.dispatch([...actionsInParallel]);
  }
}
