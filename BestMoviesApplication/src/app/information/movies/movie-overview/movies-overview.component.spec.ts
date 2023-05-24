import {MoviesOverviewComponent} from "./movies-overview.component";
import {createComponentFactory, Spectator, SpectatorFactory} from "@ngneat/spectator/jest";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NEBULAR_MODULES, PROVIDERS, STATES} from "../../../app.module";
import {defaultsState} from "./movies-overview.state";
import {NgxsModule, Store} from "@ngxs/store";
import {environment} from "../../../../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import { of } from "rxjs";
import { MovieService } from "../../../../api/movie.service";

const movieServiceMock = {
  getMovieById: jest.fn().mockReturnValue(of([])),
};

describe('app > information > movies > movies-overview > movies-overview.component.spec.ts', () => {
  let store: Store;
  let component: MoviesOverviewComponent;
  let spectator: Spectator<MoviesOverviewComponent>;
  const createComponent: SpectatorFactory<MoviesOverviewComponent> =
    createComponentFactory({
      component: MoviesOverviewComponent,
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
        {
          provide: MovieService,
          useValue: movieServiceMock
        },
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

  it('should create', async () => {
    spectator.detectChanges();
    await spectator.fixture.whenStable();
    spectator.detectChanges();
    await spectator.fixture.whenRenderingDone();

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
