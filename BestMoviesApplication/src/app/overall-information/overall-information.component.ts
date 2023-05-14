import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Selector, Store} from "@ngxs/store";
import {OverallInformationSelector} from "./overall-information.selector";
import {Observable} from "rxjs";
import {Movie} from "../../model/movie";
import {Person} from "../../model/person";
import {OverAllInformationFetchInfo, OverAllInformationReset} from "./overall-information.actions";

@Component({
  selector: 'app-overall-information',
  templateUrl: './overall-information.component.html',
  styleUrls: ['./overall-information.component.scss']
})
export class OverallInformationComponent implements OnInit, OnDestroy{

  alive = true;

  @Select(OverallInformationSelector.isFetching)
  isFetching$: Observable<boolean> | undefined;

  @Select(OverallInformationSelector.movies)
  movies$: Observable<Movie[]> | undefined;

  @Select(OverallInformationSelector.people)
  people$: Observable<Person[]> | undefined;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new OverAllInformationFetchInfo());
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new OverAllInformationReset());
  }
}
