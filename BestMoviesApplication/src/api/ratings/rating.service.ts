import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import {map} from "rxjs/operators"
import {Rating} from "src/model/rating";


@Injectable()
export class RatingService {
  constructor (
    private apiService: ApiService<Rating>
  ) {}

  PATH_CONTROLLER = 'rating';
  ID = 'ratingId';

  async getRating(ratingId): Promise<Rating> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${ratingId}`);
  }

  async getRatingByMovieId(movieId): Promise<Rating> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/byMovieId/${movieId}`);
  }

  async addRating(rating): Promise<Rating> {
    return await this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { rating: { body: rating } });
  }

  async updateRating(movieId, updatedRating): Promise<Rating> {
    return await this.apiService
      .put(
        `${this.PATH_CONTROLLER}/movieId/${movieId}`,
        { rating: { body: updatedRating } });
  }

  async deleteRating(ratingId): Promise<Rating>{
    return await this.apiService
      .delete(`${this.PATH_CONTROLLER}/${ratingId}`);
  }

}
