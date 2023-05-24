import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from "src/app/auth/login/login.component";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { AppModule } from "src/app/app.module";
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule } from "@nebular/theme";
import { FormsModule } from "@angular/forms";


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
  ]
})
export class AuthModule { }
