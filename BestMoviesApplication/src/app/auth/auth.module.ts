import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from "src/app/auth/login/login.component";
import { RegisterComponent } from "src/app/auth/register/register.component";
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule, NbLayoutModule,
  NbOverlayModule,
  NbToastrModule
} from "@nebular/theme";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { AuthState } from "src/app/auth/auth.state";


export const AUTH_COMPONENTS = [
  AuthComponent,
  LoginComponent,
  RegisterComponent,
]

export const AUTH_NEBULAR_COMPONENTS = [
  CommonModule,
  AuthRoutingModule,
  NbCardModule,
  NbIconModule,
  FormsModule,
  NbInputModule,
  NbFormFieldModule,
  NbButtonModule,
  NbOverlayModule.forRoot(),
  NbLayoutModule,
]

export const AUTH_NGXS_CONFIG = [
  NgxsModule.forRoot([
    AuthState
  ], {
    developmentMode: !environment.production,
  }),
  NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
]
@NgModule({
  declarations: [
    AUTH_COMPONENTS
  ],
  imports: [
    AUTH_NEBULAR_COMPONENTS,
    AUTH_NGXS_CONFIG,
  ]
})
export class AuthModule { }
