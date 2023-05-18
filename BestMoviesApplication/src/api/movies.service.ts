import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map} from "rxjs/operators"
import {Movie} from "src/model/movie";
import {Observable} from "rxjs";


@Injectable()
export class MoviesService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'movie';
  ID = 'movieId';

  getMovieById(movieId): Observable<Movie> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${movieId}`)
      .pipe(map(data => data.movie));
  }

  getNMoviesByRating(rating, n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/rating/${rating}/${n}`)
      .pipe(map(data => data.movies));
  }

  getNMoviesByVotes(votes, n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/votes/${votes}/${n}`)
      .pipe(map(data => data.movies));
  }

  getAllMoviesForDirector(directorId): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/directorId/${directorId}/`)
      .pipe(map(data => data.movies));
  }

  getAllMoviesForStar(starId): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/starId/${starId}/`)
      .pipe(map(data => data.movies));
  }

  getNMoviesByYear(year, n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/year/${year}/${n}`)
      .pipe(map(data => data.movies));
  }

  getNMostPopularMovies(n): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/popular/${n}/`)
      .pipe(map(data => data.movies));
  }

  getMoviesByTitle(title): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/title/${title}/`)
      .pipe(map(data => data.movies));
  }

  getAll(): Observable<Movie[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.movies));
  }

  addMovie(movie): Observable<void> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { movie: { body: movie } }
      ).pipe(map(data => data.movie));
  }

  updateMovie(movieId, movie): Observable<void> {
    return this.apiService
      .put(
        `${this.PATH_CONTROLLER}/${this.ID}/${movieId}`,
        { movie: { body: movie } }
      ).pipe(map(data => data.movie));
  }

  deleteMovie(movieId): Observable<void> {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${movieId}`);
  }

}
