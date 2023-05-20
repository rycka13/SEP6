import {Movie} from "src/model/movie";

export interface Star {
  movies: Movie[];
  id: number;
  name: string;
  birthYear: number;
  posterImage: string;
}
