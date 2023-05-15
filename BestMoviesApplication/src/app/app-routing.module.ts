import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverallInformationComponent} from "./overall-information/overall-information.component";
import {NotFoundComponent} from "src/app/not-found/not-found.component";

const routes: Routes = [
  {
    path: 'overall-information',
    component: OverallInformationComponent
  },
  { path: '',
    redirectTo: '/overall-information',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
