import { Injectable } from '@angular/core';
import { ApiService } from "src/core/services/api.service";
import { Observable } from 'rxjs';
import { Director } from "src/model/director";

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  constructor (
    private apiService: ApiService<Director>
  ) {}

  PATH_CONTROLLER = 'director';

  getDirectorById(directorId): Observable<Director> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${directorId}`);
  }

  addDirector(director): Observable<Director> {
    return this.apiService
    .post(
      `${this.PATH_CONTROLLER}/save`,
      director
    );
  }

  updateMovie(updatedDirector, personId): Observable<Director> {
    return this.apiService
    .put(
      `${this.PATH_CONTROLLER}/personId/${personId}`,
      updatedDirector
    );
  }

  deleteDirector(personId): Observable<Director> {
    return this.apiService
    .delete(`${this.PATH_CONTROLLER}/personId/${personId}`);
  }
}
