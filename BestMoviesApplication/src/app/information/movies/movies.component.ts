import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {
  OverAllInformationBestMoviesFetch,
  OverAllInformationFetchInfo, OverAllInformationReset
} from "src/app/overall-information/overall-information.actions";
import {CellClickedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {Select, Store} from "@ngxs/store";
import {OverallInformationSelector} from "src/app/overall-information/overall-information.selector";
import {Observable} from "rxjs";
import {MoviesState} from "src/app/information/movies/movies.state";
import {MoviesSelector} from "src/app/information/movies/movies.selector";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy{
  @Select(MoviesSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(MoviesSelector.movies)
  movies$: Observable<boolean>;

  value = '';

  gridApi: GridApi;
  gridColumnApi: ColumnApi;

  alive: boolean = true;
  constructor(private store: Store,
              private searchService: NbSearchService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })

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
      valueFormatter: params => {
        console.log(params.value)
        return params.value;
      }
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
