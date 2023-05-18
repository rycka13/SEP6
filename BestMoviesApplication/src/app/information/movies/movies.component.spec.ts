import {Spectator} from "@ngneat/spectator";
import {createComponentFactory, SpectatorFactory} from "@ngneat/spectator/jest";
import {NgxsModule, Store} from "@ngxs/store";
import {MoviesComponent} from "./movies.component";
import {RouterTestingModule} from "@angular/router/testing";
import {defaultsState, MoviesState} from "./movies.state";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NEBULAR_MODULES, PROVIDERS, STATES} from "../../app.module";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../../../environments/environment";


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
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot(STATES, {
          developmentMode: !environment.production,
        }),
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
