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
  NbMenuModule,
  NbCardModule,
  NbToastrModule,
  NbIconModule,
  NbButtonModule,
  NbSpinnerModule,
  NbListModule,
  NbSearchModule, NbSearchService, NbInputModule, NbFormFieldModule, NbTooltipModule, NbSelectModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BmLayoutComponent } from '../core/components/bm-layout/bm-layout.component';
import { OverallInformationComponent } from './overall-information/overall-information.component';
import {OverAllInformationState} from "./overall-information/overall-information.state";
import {NgxsModule} from "@ngxs/store";
import {AgGridModule} from "ag-grid-angular";
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {MoviesComponent} from "src/app/information/movies/movies.component";
import {MoviesState} from "src/app/information/movies/movies.state";
import {PeopleComponent} from "src/app/information/people/people.component";
import {PeopleState} from "src/app/information/people/people.state";
import {environment} from "src/environments/environment";
import {ApiService} from "src/core/services/api.service";
import {DirectorsService} from "src/api/directors/directors.service";
import {MoviesService} from "src/api/movies/movies.service";
import {RatingsService} from "src/api/ratings/ratings.service";
import {StarsService} from "src/api/stars/stars.service";
import {MoviesCell} from "src/core/cell-renderers/movies.column.cell";
import { BmSearchComponent } from '../core/components/bm-search/bm-search.component';
import { MoviesOverviewComponent } from './information/movies/movie-overview/movies-overview.component';
import {MoviesOverviewState} from "src/app/information/movies/movie-overview/movies-overview.state";
import {DirectorService} from "src/api/directors/director.service";
import {MovieService} from "src/api/movies/movie.service";
import {RatingService} from "src/api/ratings/rating.service";
import {StarService} from "src/api/stars/star.service";
import { PeopleOverviewComponent } from './information/people/people-overview/people-overview.component';
import {PeopleOverviewState} from "src/app/information/people/people-overview/people-overview.state";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";


export const STATES = [
  OverAllInformationState,
  MoviesState,
  PeopleState,
  MoviesOverviewState,
  PeopleOverviewState,
]

export const CELL_RENDERERS = [
  MoviesCell,
]

export const COMPONENTS = [
  AppComponent,

  //components
  BmLayoutComponent,
  BmSearchComponent,

  //overall information page
  OverallInformationComponent,

  //information pages
  MoviesComponent,
  PeopleComponent,

  //overview pages
  MoviesOverviewComponent,
  PeopleOverviewComponent,

  //404 not found page
  NotFoundComponent,
]

export const PROVIDERS = [
  NbSearchService,

  //Api services
  ApiService,
  DirectorService,
  DirectorsService,
  MovieService,
  MoviesService,

  // PeopleService,
  RatingService,
  RatingsService,
  StarService,
  StarsService
]

export const NEBULAR_MODULES = [
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
  NbThemeModule.forRoot({name: 'bm-theme'}),
  NbMenuModule.forRoot(),
  NbInputModule,
  NbFormFieldModule,
  NbTooltipModule,
  NbSelectModule,
]

@NgModule({
  declarations: [
    COMPONENTS,
    ...CELL_RENDERERS,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot(STATES, {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NEBULAR_MODULES,
  ],
  providers: PROVIDERS,
  exports: [
    ...CELL_RENDERERS,
    NEBULAR_MODULES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
