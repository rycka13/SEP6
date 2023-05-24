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
import { UserTopListMoviesState } from "src/app/user-list/top-list/top-list.state";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "src/core/services/auth.service";
import { ApiService } from "src/core/services/api.service";
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { UserFavouriteListMoviesState } from "src/app/user-list/favourite-list/favourite-list.state";


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
  UserFavouriteListMoviesState,
]

export const TOP_LIST_NGXS_CONFIG = [
  NgxsModule.forFeature(TOP_LIST_STATES),
]
@NgModule({
  declarations: [
    TOP_LIST_COMPONENTS,
    FavouriteListComponent
  ],
  imports: [
    CommonModule,

    HttpClientModule,
    TOP_LIST_NEBULAR_COMPONENTS,
    TOP_LIST_NGXS_CONFIG,
  ],
  providers: [
    TOP_LIST_PROVIDERS
  ]
})
export class UserListModule { }
