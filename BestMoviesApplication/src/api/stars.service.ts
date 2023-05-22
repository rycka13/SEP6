import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from "src/core/services/api.service";
import { Star } from "src/model/star";

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  constructor (
    private apiService: ApiService<Star[]>
  ) {}

  PATH_CONTROLLER = 'star';

  getStarsByMovieId(movieId): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/movieId/${movieId}`);
  }

  getStarsByBirth(year): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/year/${year}`);
  }

  getStarsByName(name): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/name/${name}`);
  }

  getStarsPerPage(pageNumber, pageSize): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`);
  }

  getAll(): Observable<Star[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
