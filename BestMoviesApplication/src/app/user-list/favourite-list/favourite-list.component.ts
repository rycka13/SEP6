import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Movie } from "src/model/movie";
import { Router } from "@angular/router";
import { UserFavouriteListMoviesFetch, UserFavouriteListMoviesReset } from "src/app/user-list/favourite-list/favourite-list.actions";
import { UserFavouriteListMoviesSelector } from "src/app/user-list/favourite-list/favourite-list.selector";

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteListComponent implements OnInit, OnDestroy {
  alive = true;

  @Select(UserFavouriteListMoviesSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(UserFavouriteListMoviesSelector.movies)
  movies$: Observable<Movie[]>;

  constructor(private store: Store,
              private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new UserFavouriteListMoviesFetch());
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new UserFavouriteListMoviesReset());
  }
}
