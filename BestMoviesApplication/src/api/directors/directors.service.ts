import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import {Director} from "src/model/director";


@Injectable()
export class DirectorsService {

  constructor (
    private apiService: ApiService<Director[]>
  ) {}

  PATH_CONTROLLER = 'director';

  async getDirectorsByBirth(birthYear): Promise<Director[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/birthYear/${birthYear}`);
  }

  async getDirectorsByName(name): Promise<Director[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}//name/${name}`);
  }

  async getAll(): Promise<Director[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }

}
