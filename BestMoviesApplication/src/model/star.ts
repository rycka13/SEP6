import {Movie} from "src/model/movie";
import {Person} from "src/model/person";

export interface Star extends Person {
  movies: Movie[];
  id: number;
  name: string;
  birthYear: number;
  posterImage: string;
}
