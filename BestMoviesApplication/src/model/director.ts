import {Movie} from "./movie";

export interface Director {
  movies: Movie[];
  id: number;
  name: string;
  birth: number;
  posterImage: string;
}
