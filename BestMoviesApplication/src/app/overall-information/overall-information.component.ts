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

@Component({
  selector: 'app-overall-information',
  templateUrl: './overall-information.component.html',
  styleUrls: ['./overall-information.component.scss']
})
export class OverallInformationComponent implements OnInit, OnDestroy{

  alive = true;

  @Select(OverallInformationSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(OverallInformationSelector.movies)
  movies$: Observable<Movie[]>;

  @Select(OverallInformationSelector.people)
  people$: Observable<Person[]>;

  @Select(MoviesOverviewSelector.topMovies)
  bestMovies$: Observable<Movie[]>;

  @Select(MoviesOverviewSelector.topMoviesByYear)
  bestMoviesByYear$: Observable<Movie[]>;

  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  @ViewChild('agGridAngular') agGrid!: AgGridAngular;

  TOP: number = 5;
  YEAR: number;


  constructor(private store: Store,
              private router: Router) {
  }

  async ngOnInit() {
    let date = new Date();
    this.YEAR = date.getUTCFullYear();

    const actionsInParallel = [
      new OverAllInformationFetchInfo(),
      new OverAllInformationBestMoviesFetch(),
      new MovieOverviewFetchBestMoviesTop(this.TOP),
      new MovieOverviewFetchMoviesFromSameYear(this.TOP, this.YEAR),
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new OverAllInformationReset());
  }
}
