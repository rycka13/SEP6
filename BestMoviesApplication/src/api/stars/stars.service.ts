import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import {Star} from "src/model/star";


@Injectable()
export class StarsService {
  constructor (
    private apiService: ApiService<Star[]>
  ) {}

  PATH_CONTROLLER = 'star';

  async getStarsByMovieId(movieId): Promise<Star[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/movieId/${movieId}`);
  }

  async getStarsByBirth(year): Promise<Star[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/year/${year}`);
  }

  async getStarsByName(name): Promise<Star[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/name/${name}`);
  }

  async getStarsPerPage(pageNumber, pageSize): Promise<Star[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`);
  }

  async getAll(): Promise<Star[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
