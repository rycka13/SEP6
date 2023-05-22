import { Injectable } from '@angular/core';
import { ApiService } from "src/core/services/api.service";
import { Observable } from 'rxjs';
import { Director } from "src/model/director";
import { Star } from "src/model/star";
import { Rating } from "src/model/rating";
import { Movie } from "src/model/movie";

@Injectable({
  providedIn: 'root'
})
export class StarService {
  constructor (
    private apiService: ApiService<Star>
  ) {}

  PATH_CONTROLLER = 'star';

  getStarById(starId): Observable<Star> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${starId}`);
  }

  addStar(star): Observable<Star> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/save`,
      { star: { body: star } }
    );
  }

  addMovieStar(star): Observable<Star> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/add`,
      { star: { body: star } }
    );
  }

  updateStar(personId, updatedStar): Observable<Star> {
    return this.apiService
    .put(
      `${this.PATH_CONTROLLER}/personId/${personId}`,
      { star: { body: updatedStar } });
  }

  deleteStar(starId): Observable<Star> {
    return this.apiService
    .delete(`${this.PATH_CONTROLLER}/personId/${starId}`);
  }
}
