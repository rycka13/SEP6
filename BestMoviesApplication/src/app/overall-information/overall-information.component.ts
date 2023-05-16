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

  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  @ViewChild('agGridAngular') agGrid!: AgGridAngular;


  constructor(private store: Store) {
  }

  async ngOnInit() {
    const actionsInParallel = [
      new OverAllInformationFetchInfo(),
      new OverAllInformationBestMoviesFetch(),
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    //TODO adjust autosize
    this.gridApi.sizeColumnsToFit();
  }

  onCellClicked( e: CellClickedEvent): void {
    // TODO redirect to the movie overview
  }

  columnDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id',
    },
    {
      headerName: 'Title',
      field: 'title',
    },
    {
      headerName: 'Year',
      field: 'year'
    }
  ]

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new OverAllInformationReset());
  }
}
