import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map} from "rxjs/operators"
import {Rating} from "src/model/rating";
import {Observable} from "rxjs";


@Injectable()
export class RatingsService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'rating';
  ID = 'ratingId';
  
  getRating(ratingId): Observable<Rating> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${ratingId}`)
      .pipe(map(data => data.rating));
  }

  getRatingByMovieId(movieId): Observable<Rating> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/byMovieId/${movieId}`)
      .pipe(map(data => data.rating));
  }

  getAll(): Observable<Rating[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.ratings));
  }

  addRating(rating): Observable<void> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { rating: { body: rating } }
      ).pipe(map(data => data.rating));
  }

  updateRating(movieId, updatedRating): Observable<void> {
    return this.apiService
      .put(
        `${this.PATH_CONTROLLER}/movieId/${movieId}`,
        { rating: { body: updatedRating } }
      ).pipe(map(data => data.rating));
  }

  deleteRating(ratingId): Observable<void>{
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${ratingId}`);
  }

}
