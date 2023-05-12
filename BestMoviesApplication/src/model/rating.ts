import {Movie} from "./movie";

export class Rating {
  movie: Movie;
  rating: number;
  votes: number;

  public constructor(movie: Movie, rating: number, votes: number) {
    this.movie = movie;
    this.rating = rating;
    this.votes = votes;
  }
}
