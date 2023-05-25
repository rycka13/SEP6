import { Injectable } from "@angular/core";
import { ApiService } from "src/core/services/api.service";
import { Rating } from "src/model/rating";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor (
    private apiService: ApiService<Rating>,
    private apiServiceWithNumbers: ApiService<number>
  ) {}

  PATH_CONTROLLER = 'rating';
  ID = 'ratingId';

  getRating(ratingId): Observable<Rating> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${ratingId}`);
  }

  getRatingByMovieId(movieId): Observable<Rating> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/byMovieId/${movieId}`);
  }

  addRating(rating): Observable<Rating> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/save`,
      rating
    );
  }

  updateRating(movieId, updatedRating): Observable<Rating> {
    return this.apiService
    .put(
      `${this.PATH_CONTROLLER}/movieId/${movieId}`,
      updatedRating
    );
  }

  deleteRating(ratingId): Observable<Rating>{
    return this.apiService
    .delete(`${this.PATH_CONTROLLER}/${ratingId}`);
  }

  avgRatingOfStarMovies(starId): Observable<number> {
    return this.apiServiceWithNumbers.get(`${this.PATH_CONTROLLER}/star/avg/${starId}`);
  }

  avgRatingOfDirectorMovies(starId): Observable<number> {
    return this.apiServiceWithNumbers.get(`${this.PATH_CONTROLLER}/director/avg/${starId}`);
  }
}
