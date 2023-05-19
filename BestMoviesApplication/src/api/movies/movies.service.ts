import {Injectable} from '@angular/core';

import {ApiService} from '../../core/services/api.service';
import {Movie} from "src/model/movie";


@Injectable()
export class MoviesService {
  constructor(
    private apiService: ApiService<Movie[]>
  ) {
  }

  PATH_CONTROLLER = 'movie';
  ID = 'movieId';

  async getNMoviesByRating(rating, n): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/rating/${rating}/${n}`);
  }

  async getNMoviesByVotes(votes, n): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/votes/${votes}/${n}`);
  }

  async getAllMoviesForDirector(directorId): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/directorId/${directorId}/`);
  }

  async getAllMoviesForStar(starId): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/starId/${starId}/`);
  }

  async getNMoviesByYear(year, n): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/year/${year}/${n}`);
  }

  async getNMostPopularMovies(n): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/popular/${n}`);
  }

  async getMoviesByTitle(title): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/title/${title}`);
  }

  async getAll(): Promise<Movie[]> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/getAll`);
  }
}
