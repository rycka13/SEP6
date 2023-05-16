import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuModule,
  NbCardModule,
  NbToastrModule,
  NbIconModule,
  NbButtonModule,
  NbSpinnerModule,
  NbListModule,
  NbSearchModule, NbSearchService
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BmLayoutComponent } from '../components/bm-layout/bm-layout.component';
import { OverallInformationComponent } from './overall-information/overall-information.component';
import {OverAllInformationState} from "./overall-information/overall-information.state";
import {NgxsModule} from "@ngxs/store";
import {AgGridModule} from "ag-grid-angular";
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {MoviesComponent} from "src/app/information/movies/movies.component";
import {MoviesState} from "src/app/information/movies/movies.state";
import {PersonsComponent} from "src/app/information/persons/persons.component";


export const states = [
  OverAllInformationState,
  MoviesState,
]

export const COMPONENTS = [
  AppComponent,

  //components
  BmLayoutComponent,

  //overall information page
  OverallInformationComponent,

  //information page
  MoviesComponent,
  PersonsComponent,

  //404 not found page
  NotFoundComponent,
]

export const PROVIDERS = [
  NbSearchService,
]
@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbThemeModule.forRoot({name: 'bm-theme'}),
    NbMenuModule.forRoot(),
    NgxsModule.forRoot(states),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbListModule,
    AgGridModule,
    NbSearchModule,
  ],
  providers: PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
