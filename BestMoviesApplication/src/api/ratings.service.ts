import { ApiService } from "src/core/services/api.service";
import { Rating } from "src/model/rating";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  constructor (
    private apiService: ApiService<Rating[]>
  ) {}

  PATH_CONTROLLER = 'rating';
  ID = 'ratingId';

  getAll(): Observable<Rating[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
