import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Spectator} from "@ngneat/spectator";
import {createComponentFactory, SpectatorFactory} from "@ngneat/spectator/jest";
import {
  NbActionsModule, NbButtonModule, NbCardModule,
  NbIconModule,
  NbLayoutModule, NbListModule,
  NbMenuModule, NbSearchModule,
  NbSidebarModule, NbSidebarService, NbSpinnerModule,
  NbToastrModule
} from "@nebular/theme";
import {NgxsModule} from "@ngxs/store";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {AgGridModule} from "ag-grid-angular";
import {MoviesComponent} from "./movies.component";
import {CommonModule} from "@angular/common";
import {InformationRoutingModule} from "../information-routing.module";
import {states} from "../information.module";

describe('app > information > movies > movies.component.spec.ts', () => {
  let component: MoviesComponent;
  let spectator: Spectator<MoviesComponent>;
  let createComponent: SpectatorFactory<MoviesComponent> = createComponentFactory({
    component: MoviesComponent,
    imports: [
      CommonModule,
      InformationRoutingModule,
      NbMenuModule,
      NgxsModule.forFeature(states),
      NbSidebarModule,
      NbToastrModule,
      NbLayoutModule,
      NbButtonModule,
      NbEvaIconsModule,
      NbActionsModule,
      NbCardModule,
      NbIconModule,
      NbSpinnerModule,
      NbListModule,
      AgGridModule,
      NbSearchModule,
    ],
    declarations: [],
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
