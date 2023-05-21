import {Movie} from "src/model/movie";

export interface Person {
  movies: Movie[];
  id: number;
  name: string;
  birthYear: number;
  posterImage: string;
}
