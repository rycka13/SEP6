import { BmLayoutComponent } from './bm-layout.component';
import {
  NbSidebarService,
} from '@nebular/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory, SpectatorFactory } from '@ngneat/spectator/jest';
import "jest-extended";
import {NEBULAR_MODULES, PROVIDERS, STATES} from "../../../app/app.module";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../../../environments/environment";
import {HttpClientModule} from "@angular/common/http";

describe('components > bm-layout > bm-layout.component.spec.ts', () => {
  let component: BmLayoutComponent;
  let spectator: Spectator<BmLayoutComponent>;
  let createComponent: SpectatorFactory<BmLayoutComponent> = createComponentFactory({
    component: BmLayoutComponent,
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
