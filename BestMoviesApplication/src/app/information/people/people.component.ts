import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {CellClickedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent, ICellRendererParams} from "ag-grid-community";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AgGridAngular} from "ag-grid-angular";
import {PeopleSelector} from "src/app/information/people/people.selector";
import {Person} from "src/model/person";
import {
  PeopleFetchInfo,
  PeopleReset, PeopleSearchDirectorsReset,
  PeopleSearchStarsByName,
  PeopleSearchStarsReset
} from "src/app/information/people/people.actions";
import {MoviesCell} from "src/core/cell-renderers/movies.column.cell";
import {Star} from "src/model/star";
import {Director} from "src/model/director";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  //selectors observable ngxs
  @Select(PeopleSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(PeopleSelector.starsAreFiltered)
  starsAreFiltered$: Observable<boolean>;

  @Select(PeopleSelector.starsAreFiltered)
  directorsAreFiltered$: Observable<boolean>;

  @Select(PeopleSelector.stars)
  stars$: Observable<Star[]>;

  @Select(PeopleSelector.directors)
  directors$: Observable<Director[]>;

  alive: boolean = true;

  constructor(private store: Store,
              private searchService: NbSearchService) {
  }

  async ngOnInit() {
    const actionsInParallel = [
      new PeopleFetchInfo(),
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  onSearchStars(event) {
    this.store.dispatch(new PeopleSearchStarsByName(event))
  }

  onSearchDirectors(event) {
    this.store.dispatch(new PeopleSearchStarsByName(event))
  }

  resetSearchStars() {
    this.store.dispatch(new PeopleSearchStarsReset());
  }

  resetSearchDirectors() {
    this.store.dispatch(new PeopleSearchDirectorsReset());
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new PeopleReset());
  }
}
