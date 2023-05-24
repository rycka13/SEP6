import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { NgxsModule, Store } from "@ngxs/store";
import { MoviesComponent } from "./movies.component";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../../app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NEBULAR_MODULES, PROVIDERS, STATES } from "../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";
import { MovieService } from "../../../api/movie.service";
import { MoviesService } from "../../../api/movies.service";

const movieServiceMock = {
  getMoviesPerPage: jest.fn().mockReturnValue(of([])),
};

describe('app > information > movies > movies.component.spec.ts', () => {
  let spectator: Spectator<MoviesComponent>;

  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [
      RouterTestingModule,
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NgxsModule.forRoot(STATES),
      ...NEBULAR_MODULES,
    ],
    providers: [
      ...PROVIDERS,
      Store,
      {
        provide: MoviesService,
        useValue: movieServiceMock
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
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
