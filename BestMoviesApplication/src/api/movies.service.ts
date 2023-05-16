import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map, Observable} from "rxjs";
import {Movie} from "src/model/movie";


@Injectable()
export class MoviesService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'movie';
  ID = 'movieId';

// All other controllers follow the same pattern. For example: if you want to getAll for starts: {URL}/star/getAll,
//   same for PUT method: {URL}/star/starId/{starId} . It takes 'Star' object instead of 'Movie' object
  getMovie(movieId): Observable<Movie> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${movieId}`)
      .pipe(map(data => data.movie));
  }

  getAll(): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.movies));
  }

  saveMovie(movie): Observable<Movie> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { movie: { body: movie } }
      ).pipe(map(data => data.movie));
  }

  updateMovie(movieId, movie): Observable<Movie> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/${this.ID}/${movieId}`,
        { movie: { body: movie } }
      ).pipe(map(data => data.movie));
  }

  deleteMovie(movieId) {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${movieId}`);
  }

}
