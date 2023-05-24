import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UserTopListMoviesFetch, UserTopListMoviesReset } from "src/app/user-list/top-list/top-list.actions";
import { UserTopListMoviesSelector } from "src/app/user-list/top-list/top-list.selector";
import { Movie } from "src/model/movie";
import { Router } from "@angular/router";

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss']
})
export class TopListComponent implements OnInit, OnDestroy{
  alive = true;

  @Select(UserTopListMoviesSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(UserTopListMoviesSelector.isFetching)
  movies$: Observable<Movie[]>;

  constructor(private store: Store,
              private router: Router) {
  }
  ngOnInit() {
    this.store.dispatch(new UserTopListMoviesFetch());
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new UserTopListMoviesReset());
  }
}
