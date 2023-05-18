import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movies-overview',
  templateUrl: './movies-overview.component.html',
  styleUrls: ['./movies-overview.component.scss']
})
export class MoviesOverviewComponent {

  constructor(
    private route: ActivatedRoute
  ) {
    let movieId;
    this.route.params.subscribe(params => movieId = params['movieId']);
  }
}
