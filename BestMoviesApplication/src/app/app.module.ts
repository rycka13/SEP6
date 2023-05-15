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
  NbMenuModule, NbCardModule, NbToastrModule, NbIconModule, NbButtonModule, NbSpinnerModule, NbListModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BmLayoutComponent } from '../components/bm-layout/bm-layout.component';
import { OverallInformationComponent } from './overall-information/overall-information.component';
import {OverAllInformationState} from "./overall-information/overall-information.state";
import {NgxsModule} from "@ngxs/store";
import {AgGridModule} from "ag-grid-angular";


export const states = [
  OverAllInformationState
]
@NgModule({
  declarations: [
    AppComponent,
    BmLayoutComponent,
    OverallInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
