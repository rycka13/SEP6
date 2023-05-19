import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import {Rating} from "src/model/rating";


@Injectable()
export class RatingsService {
  constructor (
    private apiService: ApiService<Rating[]>
  ) {}

  PATH_CONTROLLER = 'rating';
  ID = 'ratingId';

  async getRatingByMovieId(movieId): Promise<Rating[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/byMovieId/${movieId}`);
  }

  async getAll(): Promise<Rating[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
