import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbLayoutModule,
  NbActionsModule,
  NbSidebarModule,
  NbMenuModule,
  NbCardModule,
  NbToastrModule,
  NbIconModule,
  NbButtonModule,
  NbSpinnerModule,
  NbListModule,
  NbSearchModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxsModule } from "@ngxs/store";
import { AgGridModule } from "ag-grid-angular";
import {MoviesState} from "src/app/information/movies/movies.state";
import {MoviesComponent} from "src/app/information/movies/movies.component";
import {InformationRoutingModule} from "src/app/information/information-routing.module";

export const states = [
  MoviesState,
];

@NgModule({
  declarations: [
    MoviesComponent
  ],
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
})
export class InformationModule { }
