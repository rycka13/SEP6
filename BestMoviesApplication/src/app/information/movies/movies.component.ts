import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbSearchService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Movie } from 'src/model/movie';
import {
  MoviesFetchInfo,
  MoviesFetchNextPage,
  MoviesReset,
  MoviesSearchReset,
  MoviesSearchTitle
} from 'src/app/information/movies/movies.actions';
import { MoviesSelector } from 'src/app/information/movies/movies.selector';
import {Select, Store} from '@ngxs/store';

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

  @Select(MoviesSelector.allMovies)
  allMovies$: Observable<Movie[]>;

  @Select(MoviesSelector.moviesDisplayed)
  moviesDisplayed$: Observable<Movie[]>;

  @Select(MoviesSelector.pageSize)
  pageSize$: Observable<number>;

  @Select(MoviesSelector.pageToLoadNext)
  pageToLoadNext$: Observable<number>;

  constructor(
    private store: Store,
    private nbToastrService: NbToastrService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new MoviesFetchInfo());
  }

  loadNext() {
    this.store.dispatch(new MoviesFetchNextPage());
  }

  onSearch($event) {
    this.store.dispatch(new MoviesSearchTitle($event));
  }
  resetSearch() {
    this.store.dispatch(new MoviesSearchReset());
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.nbToastrService.show('Page not implemented yet', 'The page is not implemented yet...', { status: 'primary' });
    // TODO: Implement movie overview page
  }

  ngOnDestroy() {
    this.store.dispatch(new MoviesReset());
  }
}
