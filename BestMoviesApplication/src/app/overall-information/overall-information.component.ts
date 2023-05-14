import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {ColDef} from "ag-grid-community";

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

  @Select(OverallInformationSelector.bestMovies)
  bestMovies$: Observable<Movie[]>;

  constructor(private store: Store) {
  }

  columnDefs: ColDef[] = [
    {
      field: 'name',
    },
    {
      field: 'year'
    }
  ]
  async ngOnInit() {
    const actionsInParallel = [
      new OverAllInformationFetchInfo(),
      new OverAllInformationBestMoviesFetch(),
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new OverAllInformationReset());
  }
}
