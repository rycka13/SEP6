import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { TopListComponent } from './top-list/top-list.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbOptionModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToastrService
} from "@nebular/theme";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { UserTopListMoviesState } from "src/app/user-list/top-list/top-list.state";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AuthService } from "src/core/services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ApiService } from "src/core/services/api.service";


export const TOP_LIST_COMPONENTS = [
  UserListComponent,
  TopListComponent
]

export const TOP_LIST_NEBULAR_COMPONENTS = [
  CommonModule,
  UserListRoutingModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbOptionModule,
  NbSelectModule,
  NbSpinnerModule
]

export const TOP_LIST_PROVIDERS = [
  AuthService,
  ApiService,
  NbToastrService
]

export const TOP_LIST_STATES = [
  UserTopListMoviesState,
]

export const TOP_LIST_NGXS_CONFIG = [
  NgxsModule.forFeature(TOP_LIST_STATES),
]
@NgModule({
  declarations: [
    TOP_LIST_COMPONENTS
  ],
  imports: [
    CommonModule,

    HttpClientModule,
    RouterTestingModule.withRoutes([]),
    TOP_LIST_NEBULAR_COMPONENTS,
    TOP_LIST_NGXS_CONFIG,
  ],
  providers: [
    TOP_LIST_PROVIDERS
  ]
})
export class UserListModule { }
