import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Movie } from "src/model/movie";
import { Router } from "@angular/router";
import {
  UserFavouriteListMoviesFetch,
  UserFavouriteListMoviesReset,
  UserFavouriteListMoviesResetFiltering
} from "src/app/user-list/favourite-list/favourite-list.actions";
import { UserFavouriteListMoviesSelector } from "src/app/user-list/favourite-list/favourite-list.selector";
import { AuthService } from "src/core/services/auth.service";
import { User } from "src/model/user";

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteListComponent implements OnInit, OnDestroy {
  alive = true;

  @Select(UserFavouriteListMoviesSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(UserFavouriteListMoviesSelector.isFiltered)
  isFiltered$: Observable<boolean>;

  @Select(UserFavouriteListMoviesSelector.movies)
  movies$: Observable<Movie[]>;

  user: User = null;

  usersFavouriteMoviesPlaceholder: string = "user's favourite movies";

  constructor(private store: Store,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    if(this.user !== null) {
      this.store.dispatch(new UserFavouriteListMoviesFetch(this.user.userName, false));
    }
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  onSearch(event) {
    this.usersFavouriteMoviesPlaceholder = `You searched for ${event}'s favourite list`;

    const isFilteringAction = event !== this.user.userName;
    this.store.dispatch(new UserFavouriteListMoviesFetch(event, isFilteringAction))
  }

  resetSearch() {
    this.usersFavouriteMoviesPlaceholder = `user's favourite movies`;
    this.store.dispatch(new UserFavouriteListMoviesResetFiltering());
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new UserFavouriteListMoviesReset());
  }
}
