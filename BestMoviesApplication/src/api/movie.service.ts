import { Observable } from "rxjs";
import { Movie } from "src/model/movie";
import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private apiService: ApiService<Movie>
  ) {
  }

  PATH_CONTROLLER = 'movie';
  ID = 'movieId';

  getMovieById(movieId): Observable<Movie> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${movieId}`);
  }

  getMovieByIdWithUserRating(movieId, username): Observable<Movie> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${movieId}/${username}`);
  }

  addMovie(movie): Observable<Movie> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/save`,
    movie
    );
  }

  updateMovie(movieId, movie): Observable<Movie> {
    return this.apiService
    .put(
      `${this.PATH_CONTROLLER}/${this.ID}/${movieId}`,
     movie
    );
  }

  deleteMovie(movieId): Observable<Movie> {
    return this.apiService
    .delete(`${this.PATH_CONTROLLER}/${this.ID}/${movieId}`);
  }

}
