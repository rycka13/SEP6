import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { TopListComponent } from './top-list/top-list.component';


@NgModule({
  declarations: [
    UserListComponent,
    TopListComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule
  ]
})
export class UserListModule { }
