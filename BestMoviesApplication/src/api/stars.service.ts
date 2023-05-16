import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map, Observable} from "rxjs";
import {Star} from "src/model/star";


@Injectable()
export class StarsService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'star';
  ID = 'starId';
// All other controllers follow the same pattern. For example: if you want to getAll for starts: {URL}/star/getAll,
//   same for PUT method: {URL}/star/starId/{starId} . It takes 'Star' object instead of 'Movie' object
  getStar(starId): Observable<Star> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${starId}`)
      .pipe(map(data => data.star));
  }

  getAll(): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.stars));
  }

  saveStar(star): Observable<Star> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { star: { body: star } }
      ).pipe(map(data => data.star));
  }

  updateStar(starId, star): Observable<Star> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/${this.ID}/${starId}`,
        { star: { body: star } }
      ).pipe(map(data => data.star));
  }

  deleteStar(starId) {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${starId}`);
  }

}
