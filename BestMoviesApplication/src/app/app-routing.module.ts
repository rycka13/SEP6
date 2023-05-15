import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverallInformationComponent} from "./overall-information/overall-information.component";

const routes: Routes = [
  {
    path: '',
    component: OverallInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
