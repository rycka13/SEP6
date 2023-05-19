import {Injectable} from '@angular/core';

import {ApiService} from '../../core/services/api.service';
import {Movie} from "src/model/movie";


@Injectable()
export class MovieService {
  constructor(
    private apiService: ApiService<Movie>
  ) {
  }

  PATH_CONTROLLER = 'movie';
  ID = 'movieId';

  async getMovieById(movieId): Promise<Movie> {
    return await this.apiService.get(`${this.PATH_CONTROLLER}/${movieId}`);
  }

  async addMovie(movie): Promise<Movie> {
    return await this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        {movie: {body: movie}}
      );
  }

  async updateMovie(movieId, movie): Promise<Movie> {
    return await this.apiService
      .put(
        `${this.PATH_CONTROLLER}/${this.ID}/${movieId}`,
        {movie: {body: movie}}
      );
  }

  async deleteMovie(movieId): Promise<Movie> {
    return await this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${movieId}`);
  }

}
