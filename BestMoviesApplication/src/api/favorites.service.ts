import { Observable } from "rxjs";
import { Movie } from "src/model/movie";
import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  PATH_CONTROLLER = 'favorites';
  ID = 'movieId';

  constructor(
    private apiService: ApiService<Movie>
  ) {
  }

  addMoviesToFavorites(username, movieId): Observable<void> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/add/${username}/${movieId}`,
    );
  }

  addMoviesToFavoritesWithRating(username, movieId, rating): Observable<void> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/add/${username}/${movieId}/${rating}`,
    );
  }

  addRatingToMovie(username, movieId, rating): Observable<void> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/add/rating/${username}/${movieId}/${rating}`,
    );
  }

  removeRatingFromMovie(username, movieId): Observable<void> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/remove/rating/${username}/${movieId}`,
    );
  }

  removeMovieFromFavorites(username, movieId): Observable<void> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/remove/${username}/${movieId}`,
    );
  }

  getFavorites(username): Observable<Movie> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${username}`);
  }
}
