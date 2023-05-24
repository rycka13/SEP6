import { createComponentFactory, Spectator, SpectatorFactory } from "@ngneat/spectator/jest";
import { CommonModule } from "@angular/common";
import { TOP_LIST_COMPONENTS, TOP_LIST_NEBULAR_COMPONENTS, TOP_LIST_PROVIDERS, TOP_LIST_STATES } from "../user-list.module";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { InjectionToken } from "@angular/core";
import { NbToastrService, NbStatusService } from "@nebular/theme";
import { ApiService } from "../../../core/services/api.service";
import { FavouriteListComponent } from "./favourite-list.component";

describe('app > user-list > favourite-list > favourite-list.component.spec.ts', () => {
  let spectator: Spectator<FavouriteListComponent>;
  let createComponent: SpectatorFactory<FavouriteListComponent> = createComponentFactory({
    component: FavouriteListComponent,
    imports: [
      CommonModule,
      HttpClientModule,
      RouterTestingModule.withRoutes([]),
      NgxsModule.forRoot(TOP_LIST_STATES),
      ...TOP_LIST_NEBULAR_COMPONENTS,
    ],
    declarations: [TOP_LIST_COMPONENTS],
    providers: [
      TOP_LIST_PROVIDERS,
      {
        provide: Store,
        useValue: {
          dispatch: jest.fn(),
          selectSnapshot: jest.fn(),
          select: jest.fn(() => of()),
        },
      },
      {
        provide: NbToastrService,
        useValue: {
          show: jest.fn(),
        },
      },
      {
        provide: NbStatusService,
        useValue: {
          show: jest.fn(),
          isCustomStatus: jest.fn(),
        },
      },
      {
        provide: ApiService,
        useValue: {
          show: jest.fn(),
        },
      },
      {
        provide: new InjectionToken('Default toastr options'),
        useValue: {},
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should match snapshot', () => {
    spectator.detectChanges();

    // assert
    expect(spectator.fixture).toMatchSnapshot();
  });
});
