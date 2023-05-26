import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {OverallInformationSelector} from "./overall-information.selector";
import {Observable} from "rxjs";
import {Movie} from "../../model/movie";
import {Person} from "../../model/person";
import {ColumnApi, GridApi} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {randomNumberFromInterval} from "src/util/utils_functions";
import {LoadEnum, SearchByEnum} from "src/app/overall-information/constants";
import {
  OverAllInformationAddMovieToFavourites,
  OverAllInformationFetchBestMoviesTop,
  OverAllInformationFetchMoviesFromSameYear,
  OverAllInformationFetchSameRatingRange,
  OverAllInformationReset
} from "src/app/overall-information/overall-information.actions";
import { AuthService } from "src/core/services/auth.service";
import {User} from "src/model/user";

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

  @Select(OverallInformationSelector.topMovies)
  bestMovies$: Observable<Movie[]>;

  @Select(OverallInformationSelector.topMoviesByYear)
  bestMoviesByYear$: Observable<Movie[]>;

  @Select(OverallInformationSelector.topMoviesByRating)
  bestMoviesByRating$: Observable<Movie[]>;

  TOP_BEST_MOVIES: string = '5';

  //movies by year
  LIST_MOVIES_YEAR: string = '5';
  YEAR_NOW: number;
  YEAR_SEARCHED: number;
  moviesByYearIsFiltered: boolean = false;
  moviesByYearPlaceHolder: string;

  //movies by rating
  LIST_MOVIES_RATING: string = '5';
  RANDOMLY_RATING: number;
  RATING_SEARCHED: number;
  moviesByRatingIsFiltered: boolean = false;
  moviesByRatingPlaceHolder: string;

  user: User = null;

  constructor(private store: Store,
              private router: Router,
              private nbToastrService: NbToastrService,
              private authService: AuthService) {
  }

  async ngOnInit() {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

   //movies by year
    let date = new Date();
    this.YEAR_NOW = date.getUTCFullYear();
    this.YEAR_SEARCHED = this.YEAR_NOW;
    this.moviesByYearPlaceHolder = `Year searched ${this.YEAR_SEARCHED}`;

    //movies by rating
    this.RANDOMLY_RATING = randomNumberFromInterval(0,10, 1);
    this.RATING_SEARCHED = this.RANDOMLY_RATING;
    this.moviesByRatingPlaceHolder = `Rating searched ${this.RATING_SEARCHED}`;
    const actionsInParallel = [
      new OverAllInformationFetchBestMoviesTop(Number(this.TOP_BEST_MOVIES)),
      new OverAllInformationFetchMoviesFromSameYear(Number(this.LIST_MOVIES_YEAR), this.YEAR_NOW),
      new OverAllInformationFetchSameRatingRange(Number(this.LIST_MOVIES_RATING), this.RATING_SEARCHED)
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  onSearch(searchBy: SearchByEnum, event) {
    if(searchBy == SearchByEnum.YEAR) {
      this.YEAR_SEARCHED = Number(event);
      if (isNaN(this.YEAR_SEARCHED)) {
        this.YEAR_SEARCHED = this.YEAR_NOW;
        return this.nbToastrService.show(`Searched for ${event}'`, `You only need to include numbers in search`, {
          status: 'warning'
        })
      }
      else {
        this.moviesByYearIsFiltered = true;
        this.moviesByYearPlaceHolder = `Year searched ${this.YEAR_SEARCHED}`;
        this.store.dispatch(new OverAllInformationFetchMoviesFromSameYear(Number(this.LIST_MOVIES_YEAR), this.YEAR_SEARCHED));
      }
    }
    else if(searchBy == SearchByEnum.RATING) {
      this.RATING_SEARCHED = Number(event);
      if (isNaN(this.RATING_SEARCHED)) {
        this.RATING_SEARCHED = this.RANDOMLY_RATING;
        return this.nbToastrService.show(`Searched for ${event}'`, `You only need to include numbers in search`, {
          status: 'warning'
        })
      }
      else {
        this.moviesByRatingIsFiltered = true;
        this.moviesByRatingPlaceHolder = `Rating searched ${this.RATING_SEARCHED}`;
        this.store.dispatch(new OverAllInformationFetchSameRatingRange(Number(this.LIST_MOVIES_RATING), this.RATING_SEARCHED));
      }
    }
  }

  resetSearch(searchBy: SearchByEnum) {
    if(searchBy == SearchByEnum.YEAR) {
      this.moviesByYearIsFiltered = false;
      this.YEAR_SEARCHED = this.YEAR_NOW;
      this.moviesByYearPlaceHolder = `Year searched ${this.YEAR_SEARCHED}`;
      this.store.dispatch(new OverAllInformationFetchMoviesFromSameYear(Number(this.LIST_MOVIES_YEAR), this.YEAR_NOW));
    }
    else if(searchBy == SearchByEnum.RATING) {
      this.moviesByRatingIsFiltered = false;
      this.RATING_SEARCHED = this.RANDOMLY_RATING;
      this.moviesByRatingPlaceHolder = `Rating searched ${this.RANDOMLY_RATING}`;
      this.store.dispatch(new OverAllInformationFetchSameRatingRange(Number(this.LIST_MOVIES_RATING), this.RANDOMLY_RATING));
    }
  }

  addMovieToFavourites(movieId: number) {
    this.store.dispatch(new OverAllInformationAddMovieToFavourites(this.user?.userName, movieId))
  }

  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  loadMovies(loadBy: LoadEnum) {
    switch (loadBy) {
      case LoadEnum.BEST_MOVIES: {
        this.store.dispatch(new OverAllInformationFetchBestMoviesTop(Number(this.TOP_BEST_MOVIES)));
        break;
      }
      case LoadEnum.MOVIES_BY_YEAR: {
        this.store.dispatch(new OverAllInformationFetchMoviesFromSameYear(Number(this.LIST_MOVIES_YEAR), this.YEAR_NOW));
        break;
      }
      case LoadEnum.MOVIES_BY_RATING: {
        this.store.dispatch(new OverAllInformationFetchSameRatingRange(Number(this.LIST_MOVIES_YEAR), this.RANDOMLY_RATING));
        break;
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new OverAllInformationReset());
  }

  //enums
  getSearchByEnum() : typeof SearchByEnum {
    return SearchByEnum;
  }

  getLoadEnum() : typeof LoadEnum {
    return LoadEnum;
  }
}
