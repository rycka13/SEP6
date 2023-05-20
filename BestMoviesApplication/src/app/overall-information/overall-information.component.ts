import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Select, Selector, Store} from "@ngxs/store";
import {OverallInformationSelector} from "./overall-information.selector";
import {Observable} from "rxjs";
import {Movie} from "../../model/movie";
import {Person} from "../../model/person";
import {
  OverAllInformationBestMoviesFetch,
  OverAllInformationFetchInfo,
  OverAllInformationReset
} from "./overall-information.actions";
import {CellClickedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import {
  MovieOverviewFetchBestMoviesTop,
  MovieOverviewFetchMoviesFromSameYear
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {MoviesOverviewSelector} from "src/app/information/movies/movie-overview/movies-overview.selector";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-overall-information',
  templateUrl: './overall-information.component.html',
  styleUrls: ['./overall-information.component.scss']
})
export class OverallInformationComponent implements OnInit, OnDestroy {

  alive = true;

  @Select(OverallInformationSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(OverallInformationSelector.movies)
  movies$: Observable<Movie[]>;

  @Select(OverallInformationSelector.people)
  people$: Observable<Person[]>;

  @Select(MoviesOverviewSelector.isFetching)
  isFetchingBestMovies$: Observable<boolean>;

  @Select(MoviesOverviewSelector.topMovies)
  bestMovies$: Observable<Movie[]>;

  @Select(MoviesOverviewSelector.topMoviesByYear)
  bestMoviesByYear$: Observable<Movie[]>;

  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  @ViewChild('agGridAngular') agGrid!: AgGridAngular;

  TOP_BEST_MOVIES: string = '5';
  TOP_BEST_MOVIES_YEAR: string = '5';
  YEAR_NOW: number;
  YEAR_SEARCHED: number;
  moviesByYearIsFiltered: boolean = false;
  placeHolder: string;


  constructor(private store: Store,
              private router: Router,
              private nbToastrService: NbToastrService) {
  }

  async ngOnInit() {
    let date = new Date();
    this.YEAR_NOW = date.getUTCFullYear();
    this.YEAR_SEARCHED = this.YEAR_NOW;
    this.placeHolder = `Year searched ${this.YEAR_SEARCHED}`;
    const actionsInParallel = [
      new OverAllInformationFetchInfo(),
      new OverAllInformationBestMoviesFetch(),
      new MovieOverviewFetchBestMoviesTop(Number(this.TOP_BEST_MOVIES)),
      new MovieOverviewFetchMoviesFromSameYear(Number(this.TOP_BEST_MOVIES_YEAR), this.YEAR_NOW),
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  onSearchMoviesByYear(event) {
    this.YEAR_SEARCHED = Number(event);
    if (isNaN(this.YEAR_SEARCHED)) {
      return this.nbToastrService.show(`Searched for ${event}'`, `You only need to include numbers in search`, {
        status: 'warning'
      })
    }
    else {
      this.moviesByYearIsFiltered = true;
      this.placeHolder = `Year searched ${this.YEAR_SEARCHED}`;
      this.store.dispatch(new MovieOverviewFetchMoviesFromSameYear(Number(this.TOP_BEST_MOVIES_YEAR), this.YEAR_SEARCHED));
    }
  }

  resetSearchMoviesByYear() {
    this.moviesByYearIsFiltered = false;
    this.YEAR_SEARCHED = this.YEAR_NOW;
    this.placeHolder = `Year searched ${this.YEAR_SEARCHED}`;
    this.store.dispatch(new MovieOverviewFetchMoviesFromSameYear(Number(this.TOP_BEST_MOVIES_YEAR), this.YEAR_NOW));
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  loadBestMovies() {
    this.store.dispatch(new MovieOverviewFetchBestMoviesTop(Number(this.TOP_BEST_MOVIES)));
  }

  loadBestMoviesByYear() {
    this.store.dispatch(new MovieOverviewFetchMoviesFromSameYear(Number(this.TOP_BEST_MOVIES_YEAR), this.YEAR_NOW));
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new OverAllInformationReset());
  }
}
