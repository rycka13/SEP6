import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {MoviesOverviewSelector} from "src/app/information/movies/movie-overview/movies-overview.selector";
import {Movie} from "src/model/movie";
import {MovieOverviewFetchInfo} from "src/app/information/movies/movie-overview/movies-overview.actions";

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

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    let movieId;
    this.route.params.subscribe(params => movieId = params['movieId']);

    this.store.dispatch(new MovieOverviewFetchInfo(movieId));
  }
}
