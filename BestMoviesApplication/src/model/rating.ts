import {Movie} from "./movie";

export interface Rating {
  movie: Movie;
  rating: number;
  votes: number;
}
