import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverallInformationComponent} from "./overall-information/overall-information.component";
import {NotFoundComponent} from "src/app/not-found/not-found.component";
import {MoviesComponent} from "src/app/information/movies/movies.component";
import {PeopleComponent} from "src/app/information/people/people.component";

const routes: Routes = [
  {
    path: 'overall-information',
    title: 'Overall Information',
    component: OverallInformationComponent,
  },
  {
    path: 'information',
    children: [
      {
        path:'movies',
        title: 'Information Movies',
        component: MoviesComponent,
      },
      {
        path:'people',
        title: 'Information People',
        component: PeopleComponent,
      }
    ]
  },
  { path: '',
    redirectTo: '/overall-information',
    pathMatch: 'full'
  },
  {
    path: '**',
    title: '404 Page not found',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
