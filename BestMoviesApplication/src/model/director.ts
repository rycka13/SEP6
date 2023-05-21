import {Movie} from "./movie";
import {Person} from "src/model/person";

export interface Director extends Person {
  movies: Movie[];
  id: number;
  name: string;
  birthYear: number;
  posterImage: string;
}
