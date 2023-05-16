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
    birth: 1899,
  },
  {
    movies: [
      moviesMock[1],
      moviesMock[2],
    ],
    id: 2,
    name: 'Lauren Bacall',
    birth: 1924,
  },
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: 3,
    name: 'Brigitte Bardot',
    birth: 1934,
  },
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: 4,
    name: 'John Belushi',
    birth: 1949,
  },
  {
    movies: [
      moviesMock[4],
      moviesMock[5],
    ],
    id: 5,
    name: 'Ingmar Bergman',
    birth: 1918,
  },
  {
    movies: [
      moviesMock[6],
      moviesMock[5],
    ],
    id: 6,
    name: 'Ingrid Bergman',
    birth: 1915,
  },
  {
    movies: [
      moviesMock[4],
      moviesMock[3],
    ],
    id: 7,
    name: 'Humphrey Bogart',
    birth: 1899,
  }
]
