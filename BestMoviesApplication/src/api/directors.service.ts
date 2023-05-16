import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map, Observable} from "rxjs";
import {Director} from "src/model/director";


@Injectable()
export class DirectorsService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'director';
  ID = 'directorId';

// All other controllers follow the same pattern. For example: if you want to getAll for starts: {URL}/star/getAll,
//   same for PUT method: {URL}/star/starId/{starId} . It takes 'Star' object instead of 'Movie' object
  getDirector(directorId): Observable<Director> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${directorId}`)
      .pipe(map(data => data.director));
  }

  getAll(): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.directors));
  }

  saveDirector(director): Observable<Director> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { director: { body: director } }
      ).pipe(map(data => data.director));
  }

  updateDirector(directorId, director): Observable<Director> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/${this.ID}/${directorId}`,
        { director: { body: director } }
      ).pipe(map(data => data.director));
  }

  deleteDirector(directorId) {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${directorId}`);
  }

}
