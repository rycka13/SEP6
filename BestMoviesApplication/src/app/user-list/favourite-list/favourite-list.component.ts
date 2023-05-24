import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Movie } from "src/model/movie";
import { Router } from "@angular/router";
import { UserFavouriteListMoviesFetch, UserFavouriteListMoviesReset } from "src/app/user-list/favourite-list/favourite-list.actions";
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

  @Select(UserFavouriteListMoviesSelector.movies)
  movies$: Observable<Movie[]>;

  user: User = null;

  constructor(private store: Store,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    if(this.user !== null) {
      this.store.dispatch(new UserFavouriteListMoviesFetch(this.user.userName));
    }
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new UserFavouriteListMoviesReset());
  }
}
