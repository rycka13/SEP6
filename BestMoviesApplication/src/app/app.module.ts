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
    NbSearchModule, NbInputModule, NbFormFieldModule, NbTooltipModule, NbSelectModule, NbTabsetModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
import { BmSearchComponent } from '../core/components/bm-search/bm-search.component';
import { MoviesOverviewComponent } from './information/movies/movie-overview/movies-overview.component';
import {MoviesOverviewState} from "src/app/information/movies/movie-overview/movies-overview.state";
import { PeopleOverviewComponent } from './information/people/people-overview/people-overview.component';
import {PeopleOverviewState} from "src/app/information/people/people-overview/people-overview.state";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import { ApiService } from "src/core/services/api.service";
import { DirectorService } from "src/api/director.service";
import { DirectorsService } from "src/api/directors.service";
import { MovieService } from "src/api/movie.service";
import { MoviesService } from "src/api/movies.service";
import { RatingService } from "src/api/rating.service";
import { RatingsService } from "src/api/ratings.service";
import { StarService } from "src/api/star.service";
import { StarsService } from "src/api/stars.service";
import { AccountComponent } from './account/account.component';
import { UserService } from "src/api/user.service";
import { AccountService } from "src/core/services/account.service";


export const STATES = [
  OverAllInformationState,
  MoviesState,
  PeopleState,
  MoviesOverviewState,
  PeopleOverviewState,
]

export const CELL_RENDERERS = [
]

export const COMPONENTS = [
  AppComponent,

  //components
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
  ApiService,
  DirectorService,
  DirectorsService,
  MovieService,
  MoviesService,
  RatingService,
  RatingsService,
  StarService,
  StarsService,
  UserService,
  AccountService
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
  NbTabsetModule,
]

@NgModule({
  declarations: [
    COMPONENTS,
    ...CELL_RENDERERS,
    AccountComponent,
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
