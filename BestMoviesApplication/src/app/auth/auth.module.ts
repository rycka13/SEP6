import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from "src/app/auth/login/login.component";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule } from "@nebular/theme";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { AuthState } from "src/app/auth/auth.state";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbButtonModule,

    NgxsModule.forRoot([
      AuthState
    ], {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
  ]
})
export class AuthModule { }
