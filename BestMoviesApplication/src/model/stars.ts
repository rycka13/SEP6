import {Movie} from "./movie";
import {Person} from "./person";

export class Stars {
  movie: Movie;
  person: Person;

  public constructor(movie: Movie, person: Person) {
    this.movie = movie;
    this.person = person;
  }
}
