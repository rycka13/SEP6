export class Rating {
  movieId: number;
  rating: number;
  votes: number;

  public constructor(movieId: number, rating: number, votes: number) {
    this.movieId = movieId;
    this.rating = rating;
    this.votes = votes;
  }
}
