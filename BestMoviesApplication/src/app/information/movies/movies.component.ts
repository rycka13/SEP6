import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/model/movie';
import {
  MoviesAddMovieToFavourites,
  MoviesFetchNextPage,
  MoviesReset,
  MoviesSearchReset,
  MoviesSearchTitle
} from 'src/app/information/movies/movies.actions';
import { MoviesSelector } from 'src/app/information/movies/movies.selector';
import {Select, Store} from '@ngxs/store';
import {Router} from "@angular/router";
import { MoviePlaceHolderEnum } from "src/app/information/movies/constants/constants";
import {AuthService} from "src/core/services/auth.service";
import {User} from "src/model/user";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  @Select(MoviesSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(MoviesSelector.isFiltered)
  isFiltered$: Observable<boolean>;

  @Select(MoviesSelector.movies)
  movies$: Observable<Movie[]>;

  @Select(MoviesSelector.pageNumber)
  pageToLoadNext$: Observable<number>;

  placeHolder = "Search title"

  user: User = null;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.placeHolder = MoviePlaceHolderEnum.MOVIE_PLACEHOLDER;
    this.store.dispatch(new MoviesFetchNextPage());
  }

  loadNext() {
    this.store.dispatch(new MoviesFetchNextPage());
  }

  onSearch(event) {
    this.placeHolder = event;
    this.store.dispatch(new MoviesSearchTitle(event));
  }

  resetSearch() {
    this.placeHolder = MoviePlaceHolderEnum.MOVIE_PLACEHOLDER;
    this.store.dispatch(new MoviesSearchReset());
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  addMovieToFavourites(movieId: number) {
    this.store.dispatch(new MoviesAddMovieToFavourites(this.user?.userName, movieId));
  }

  ngOnDestroy() {
    this.store.dispatch(new MoviesReset());
  }
}
