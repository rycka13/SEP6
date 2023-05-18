import {MoviesOverviewComponent} from "./movies-overview.component";
import {createComponentFactory, Spectator, SpectatorFactory} from "@ngneat/spectator/jest";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NbSidebarModule, NbThemeModule} from "@nebular/theme";
import {APP_PRINCIPAL_IMPORTS, NEBULAR_MODULES, PROVIDERS} from "../../../app.module";
import {Store} from "@ngxs/store";
import {defaultsState} from "./movies-overview.state";

describe('app > information > movies > movies-overview > movies-overview.component.spec.ts', () => {
  let store: Store;
  let component: MoviesOverviewComponent;
  let spectator: Spectator<MoviesOverviewComponent>;
  const createComponent: SpectatorFactory<MoviesOverviewComponent> =
    createComponentFactory({
      component: MoviesOverviewComponent,
      imports: [
        RouterTestingModule,
        APP_PRINCIPAL_IMPORTS,
        ...NEBULAR_MODULES,
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
      movieOverviewPage: defaultsState,
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
