import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map} from "rxjs/operators"
import {Observable} from "rxjs";
import {Director} from "src/model/director";


@Injectable()
export class DirectorsService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'director';
  ID = 'directorId';

  getDirectorById(directorId): Observable<Director> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${directorId}`)
      .pipe(map(data => data.director));
  }

  getDirectorsByBirth(birthYear): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/birthYear/${birthYear}`)
      .pipe(map(data => data.directors));
  }

  getDirectorsByName(name): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}//name/${name}`)
      .pipe(map(data => data.directors));
  }

  getAll(): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.directors));
  }

  addDirector(director): Observable<void> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { director: { body: director } }
      ).pipe(map(data => data.director));
  }

  updateMovie(updatedDirector, personId): Observable<void> {
    return this.apiService
      .put(
        `${this.PATH_CONTROLLER}/personId/${personId}`,
        { director: { body: updatedDirector } }
      ).pipe(map(data => data.director));
  }

  deleteDirector(personId) {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/personId/${personId}`);
  }

}
