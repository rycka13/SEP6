import { Movie } from "src/model/movie";
import { Observable } from "rxjs";
import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";
import { Director } from "src/model/director";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(
    private apiService: ApiService<Movie[]>
  ) {
  }

  PATH_CONTROLLER = 'movie';
  ID = 'movieId';

  getNMoviesByRating(rating, n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/rating/${rating}/${n}`);
  }

  getNMoviesByVotes(votes, n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/votes/${votes}/${n}`);
  }

  getAllMoviesForDirector(directorId): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/directorId/${directorId}/`);
  }

  getAllMoviesForStar(starId): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/starId/${starId}/`);
  }

  getNMoviesByYear(year, n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/year/${year}/${n}`);
  }

  getNMostPopularMovies(n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/popular/${n}`);
  }

  getMoviesByTitle(title): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/title/${title}`);
  }

  getAll(): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }

  getMoviesPerPage(pageNumber, pageSize): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`);
  }
}
