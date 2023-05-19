import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import {Star} from "src/model/star";


@Injectable()
export class StarService {
  constructor (
    private apiService: ApiService<Star>
  ) {}

  PATH_CONTROLLER = 'star';

  async getStarById(starId): Promise<Star> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/${starId}`);
  }

  async addStar(star): Promise<Star> {
    return await this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { star: { body: star } }
      );
  }

  async addMovieStar(star): Promise<Star> {
    return await this.apiService
      .post(
        `${this.PATH_CONTROLLER}/add`,
        { star: { body: star } }
      );
  }

  async updateStar(personId, updatedStar): Promise<Star> {
    return await this.apiService
      .put(
        `${this.PATH_CONTROLLER}/personId/${personId}`,
        { star: { body: updatedStar } });
  }

  async deleteStar(starId): Promise<Star> {
    return await this.apiService
      .delete(`${this.PATH_CONTROLLER}/personId/${starId}`);
  }

}
