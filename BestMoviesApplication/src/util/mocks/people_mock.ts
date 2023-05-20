import {Person} from "../../model/person";
import {moviesMock} from "src/util/mocks/movies_mock";

export const peopleMock: Person[] = [
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: 1,
    name: 'Fred Astaire',
    birthYear: 1899,
    posterImage: null,
  },
  {
    movies: [
      moviesMock[1],
      moviesMock[2],
    ],
    id: 2,
    name: 'Lauren Bacall',
    birthYear: 1924,
    posterImage: null,
  },
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: 3,
    name: 'Brigitte Bardot',
    birthYear: 1934,
    posterImage: null,
  },
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: 4,
    name: 'John Belushi',
    birthYear: 1949,
    posterImage: null,
  },
  {
    movies: [
      moviesMock[4],
      moviesMock[5],
    ],
    id: 5,
    name: 'Ingmar Bergman',
    birthYear: 1918,
    posterImage: null,
  },
  {
    movies: [
      moviesMock[6],
      moviesMock[5],
    ],
    id: 6,
    name: 'Ingrid Bergman',
    birthYear: 1915,
    posterImage: null,
  },
  {
    movies: [
      moviesMock[4],
      moviesMock[3],
    ],
    id: 7,
    name: 'Humphrey Bogart',
    birthYear: 1899,
    posterImage: null,
  }
]
