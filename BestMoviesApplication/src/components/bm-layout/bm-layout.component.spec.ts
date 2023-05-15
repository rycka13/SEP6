import { BmLayoutComponent } from './bm-layout.component';
import {
  NbActionsModule, NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule, NbToastrModule, NbToastrService
} from '@nebular/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory, SpectatorFactory } from '@ngneat/spectator/jest';
import "jest-extended";
import {NgxsModule} from "@ngxs/store";
import {OverAllInformationState} from "../../app/overall-information/overall-information.state";

describe('components > bm-layout > bm-layout.component.spec.ts', () => {
  let component: BmLayoutComponent;
  let spectator: Spectator<BmLayoutComponent>;
  let createComponent: SpectatorFactory<BmLayoutComponent> = createComponentFactory({
    component: BmLayoutComponent,
    imports: [
      RouterTestingModule,
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NbThemeModule.forRoot({ name: 'bm-theme' }),
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NgxsModule.forRoot([OverAllInformationState]),
      NbToastrModule.forRoot(),
      NbIconModule,
      NbLayoutModule,
      NbEvaIconsModule,
      NbActionsModule,
    ],
    declarations: [BmLayoutComponent],
    providers: [NbSidebarService],
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
