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

  async getAll(): Promise<Rating[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
