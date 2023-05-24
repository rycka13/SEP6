import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { TopListComponent } from "src/app/user-list/top-list/top-list.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path:'top',
    component: TopListComponent,
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
