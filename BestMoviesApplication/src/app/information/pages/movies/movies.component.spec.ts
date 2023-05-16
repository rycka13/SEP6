import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Spectator} from "@ngneat/spectator";
import {createComponentFactory, SpectatorFactory} from "@ngneat/spectator/jest";
import {
  NbActionsModule, NbButtonModule, NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule, NbSearchModule, NbSearchService,
  NbSidebarModule, NbThemeModule,
  NbToastrModule,
} from "@nebular/theme";
import {NgxsModule, Store} from "@ngxs/store";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {AgGridModule} from "ag-grid-angular";
import {MoviesComponent} from "./movies.component";
import {RouterTestingModule} from "@angular/router/testing";
import {defaultsState, MoviesState} from "./movies.state";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OverAllInformationState} from "../../../overall-information/overall-information.state";
import {FormsModule} from "@angular/forms";
import {PROVIDERS} from "../../../app.module";


describe('app > information > movies > movies.component.spec.ts', () => {
  let store: Store;
  let component: MoviesComponent;
  let spectator: Spectator<MoviesComponent>;
  const createComponent: SpectatorFactory<MoviesComponent> =
    createComponentFactory({
      component: MoviesComponent,
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'bm-theme' }),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NgxsModule.forRoot([
          OverAllInformationState,
          MoviesState
        ]),
        NbToastrModule.forRoot(),
        NbIconModule,
        NbLayoutModule,
        NbEvaIconsModule,
        NbCardModule,
        NbActionsModule,
        NbSearchModule,
        FormsModule,
        AgGridModule,
      ],
      declarations: [],
      providers: [
        ...PROVIDERS,
        Store,
      ],
    });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false,
    });

    store = spectator.inject(Store);

    store.reset({
      moviesPage: defaultsState,
    })
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should match snapshot', async () => {
    spectator.detectChanges();
    await spectator.fixture.whenStable();
    spectator.detectChanges();
    await spectator.fixture.whenRenderingDone();

    // assert
    expect(spectator.fixture).toMatchSnapshot();
  });
});
