import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map, Observable} from "rxjs";
import {Rating} from "src/model/rating";


@Injectable()
export class RatingsService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'rating';
  ID = 'ratingId';

// All other controllers follow the same pattern. For example: if you want to getAll for starts: {URL}/star/getAll,
//   same for PUT method: {URL}/star/starId/{starId} . It takes 'Star' object instead of 'Movie' object
  getRating(ratingId): Observable<Rating> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${ratingId}`)
      .pipe(map(data => data.rating));
  }

  getAll(): Observable<Rating[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.ratings));
  }

  saveRating(rating): Observable<Rating> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { rating: { body: rating } }
      ).pipe(map(data => data.rating));
  }

  updateRating(ratingId, rating): Observable<Rating> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/${this.ID}/${ratingId}`,
        { rating: { body: rating } }
      ).pipe(map(data => data.rating));
  }

  deleteRating(ratingId) {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${ratingId}`);
  }

}
