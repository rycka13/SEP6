import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbActionsModule, NbSidebarModule, NbSidebarService} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BmLayoutComponent } from '../components/bm-layout/bm-layout.component';
import { OverallInformationComponent } from './overall-information/overall-information.component';

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
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
