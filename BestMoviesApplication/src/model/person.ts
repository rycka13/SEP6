import {Movie} from "src/model/movie";

export interface Person {

  addMovie: Movie;
  movies: Movie[];
  id: number;
  name: string;
  birthYear: number;
  profilePicture: string;
}
