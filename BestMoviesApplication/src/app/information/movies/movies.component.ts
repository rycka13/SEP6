import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbSearchService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Movie } from 'src/model/movie';
import { MoviesFetchInfo, MoviesReset, MoviesSearchReset, MoviesSearchTitle } from 'src/app/information/movies/movies.actions';
import { MoviesSelector } from 'src/app/information/movies/movies.selector';
import { Select, Store } from '@ngxs/store';
import { paginate } from 'src/app/constants';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  @Select(MoviesSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(MoviesSelector.movies)
  movies$: Observable<Movie[]>;

  moviesDisplayed: Movie[] = [];
  pageSize = 5;
  pageToLoadNext = 1;
  loading = false;

  constructor(
    private store: Store,
    private searchService: NbSearchService,
    private nbToastrService: NbToastrService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.store.dispatch(new MoviesSearchTitle(data.term));
    });
  }

  ngOnInit() {
    this.store.dispatch(new MoviesFetchInfo()).pipe(take(1)).subscribe(() => {
      this.movies$.subscribe((movies) => {
        this.moviesDisplayed = paginate(movies, this.pageSize, this.pageToLoadNext);
      });
    });
  }

  loadNext() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.pageToLoadNext++;
    this.movies$.pipe(take(1)).subscribe((movies) => {
      const nextMoviesToDisplay = paginate(movies, this.pageSize, this.pageToLoadNext);
      this.moviesDisplayed.push(...nextMoviesToDisplay);
      this.loading = false;
    });
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
