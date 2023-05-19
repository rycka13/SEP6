
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Movie} from "src/model/movie";
import {ICellRendererParams} from "ag-grid-community";

export interface MoviesCellExtraParams {
}
@Component({
  selector: 'movies-cell',
  //TODO add click event to redirect user to movie-overview when he clicks one span (movie)
  template: `
        <div *ngFor="let movie of movies">
          <span>{{movie?.title}} from {{movie?.year}}</span>
        </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesCell {

  params: ICellRendererParams & MoviesCellExtraParams;
  movies: Movie[];
  async agInit(params: ICellRendererParams & MoviesCellExtraParams) {
    this.params = params;
    console.log(this.params);
    this.movies = params.value;
  }

}
