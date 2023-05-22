import { ApiService } from "src/core/services/api.service";
import { Director } from "src/model/director";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  constructor (
    private apiService: ApiService<Director[]>
  ) {}

  PATH_CONTROLLER = 'director';

  getDirectorsByBirth(birthYear): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/birthYear/${birthYear}`);
  }

  getDirectorsByName(name): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/name/${name}`);
  }

  getDirectorsPerPage(pageNumber, pageSize): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`);
  }

  getAll(): Observable<Director[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
