import { OverallInformationComponent } from './overall-information.component';
import {BmLayoutComponent} from "../../core/components/bm-layout/bm-layout.component";
import {Spectator} from "@ngneat/spectator";
import {createComponentFactory, SpectatorFactory} from "@ngneat/spectator/jest";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  NbSidebarService,
} from "@nebular/theme";
import {NEBULAR_MODULES, PROVIDERS, STATES} from "../app.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../../environments/environment";

describe('app > overall-information > overall-information.component.spec.ts', () => {
  let component: OverallInformationComponent;
  let spectator: Spectator<OverallInformationComponent>;
  let createComponent: SpectatorFactory<OverallInformationComponent> = createComponentFactory({
    component: OverallInformationComponent,
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
    declarations: [BmLayoutComponent],
    providers: PROVIDERS,
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
