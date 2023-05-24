import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { TopListComponent } from './top-list/top-list.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbOptionModule, NbSelectModule } from "@nebular/theme";


@NgModule({
  declarations: [
    UserListComponent,
    TopListComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbOptionModule,
    NbSelectModule
  ]
})
export class UserListModule { }
