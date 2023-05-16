import {NgxsModule, Store} from "@ngxs/store";
import {Spectator} from "@ngneat/spectator";
import {createComponentFactory, SpectatorFactory} from "@ngneat/spectator/jest";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule, NbSearchModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule
} from "@nebular/theme";
import {defaultsState} from "../people/people.state";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {FormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";
import {PROVIDERS, STATES} from "../../app.module";
import {PeopleComponent} from "./people.component";

describe('app > information > people > people.component.spec.ts', () => {
  let store: Store;
  let component: PeopleComponent;
  let spectator: Spectator<PeopleComponent>;
  const createComponent: SpectatorFactory<PeopleComponent> =
    createComponentFactory({
      component: PeopleComponent,
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'bm-theme' }),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NgxsModule.forRoot([
          ...STATES
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
      peoplePage: defaultsState,
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
