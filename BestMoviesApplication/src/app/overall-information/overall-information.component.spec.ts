import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallInformationComponent } from './overall-information.component';
import {BmLayoutComponent} from "../../components/bm-layout/bm-layout.component";
import {Spectator} from "@ngneat/spectator";
import {createComponentFactory, SpectatorFactory} from "@ngneat/spectator/jest";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  NbActionsModule, NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule, NbSidebarService,
  NbThemeModule,
  NbToastrModule
} from "@nebular/theme";
import {NgxsModule} from "@ngxs/store";
import {OverAllInformationState} from "./overall-information.state";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {FormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";

describe('app > overall-information > overall-information.component.spec.ts', () => {
  let component: OverallInformationComponent;
  let spectator: Spectator<OverallInformationComponent>;
  let createComponent: SpectatorFactory<OverallInformationComponent> = createComponentFactory({
    component: OverallInformationComponent,
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
      NbCardModule,
      NbActionsModule,
      FormsModule,
      AgGridModule,
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
