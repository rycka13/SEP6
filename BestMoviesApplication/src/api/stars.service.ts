import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map} from "rxjs/operators"
import {Star} from "src/model/star";
import {Observable} from "rxjs";


@Injectable()
export class StarsService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'star';

  getStarById(starId): Observable<Star> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${starId}`)
      .pipe(map(data => data.star));
  }

  getStarsByMovieId(movieId): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/movieId/${movieId}`)
      .pipe(map(data => data.stars));
  }

  getStarsByBirth(year): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/year/${year}`)
      .pipe(map(data => data.stars));
  }

  getStarsByName(name): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/name/${name}`)
      .pipe(map(data => data.stars));
  }

  getAll(): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.stars));
  }

  addStar(star): Observable<void> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { star: { body: star } }
      ).pipe(map(data => data.star));
  }

  addMovieStar(star): Observable<void> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/add`,
        { star: { body: star } }
      ).pipe(map(data => data.star));
  }

  updateStar(personId, updatedStar): Observable<void> {
    return this.apiService
      .put(
        `${this.PATH_CONTROLLER}/personId/${personId}`,
        { star: { body: updatedStar } }
      ).pipe(map(data => data.star));
  }

  deleteStar(starId): Observable<void> {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/personId/${starId}`);
  }

}
