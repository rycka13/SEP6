import {Movie} from "./movie";

export interface Director {
  movies: Movie[];
  id: number;
  name: string;
  birthYear: number;
  posterImage: string;
}
