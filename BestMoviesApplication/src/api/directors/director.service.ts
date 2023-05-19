import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import {Director} from "src/model/director";


@Injectable()
export class DirectorService {

  constructor (
    private apiService: ApiService<Director>
  ) {}

  PATH_CONTROLLER = 'director';

  async getDirectorById(directorId): Promise<Director> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/${directorId}`);
  }

  async addDirector(director): Promise<Director> {
    return await this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { director: { body: director } }
      );
  }

  async updateMovie(updatedDirector, personId): Promise<Director> {
    return await this.apiService
      .put(
        `${this.PATH_CONTROLLER}/personId/${personId}`,
        { director: { body: updatedDirector } }
      );
  }

  async deleteDirector(personId): Promise<Director> {
    return await this.apiService
      .delete(`${this.PATH_CONTROLLER}/personId/${personId}`);
  }

}
