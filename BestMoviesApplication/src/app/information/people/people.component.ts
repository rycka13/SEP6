import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {CellClickedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AgGridAngular} from "ag-grid-angular";
import {PeopleSelector} from "src/app/information/people/people.selector";
import {Person} from "src/model/person";
import {
  PeopleFetchInfo,
  PeopleReset,
  PeopleSearchName,
  PeopleSearchReset
} from "src/app/information/people/people.actions";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy{
  //selectors observable ngxs
  @Select(PeopleSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(PeopleSelector.isFiltered)
  isFiltered$: Observable<boolean>;

  @Select(PeopleSelector.people)
  people$: Observable<Person[]>;

  //ag grid
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  @ViewChild('agGridAngular') agGrid!: AgGridAngular;

  alive: boolean = true;
  constructor(private store: Store,
              private searchService: NbSearchService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.store.dispatch(new PeopleSearchName(data.term));
      })

  }

  async ngOnInit() {
    const actionsInParallel = [
      new PeopleFetchInfo(),
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
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Birth',
      field: 'birth'
    }
  ]

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  resetSearch() {
    this.store.dispatch(new PeopleSearchReset());
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new PeopleReset());
  }
}
