import {Director} from "../../model/director";
import {peopleMock} from "./people_mock";
import {moviesMock} from "./movies_mock";

export const directorsMock: Director[] = [
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: peopleMock[0].id,
    name: peopleMock[0].name,
    birthYear: peopleMock[0].birthYear,
    posterImage: peopleMock[0].posterImage,
  },
  {
    movies: [
      moviesMock[2],
      moviesMock[3],
    ],
    id: peopleMock[1].id,
    name: peopleMock[1].name,
    birthYear: peopleMock[1].birthYear,
    posterImage: peopleMock[1].posterImage,
  },
  {
    movies: [
      moviesMock[5],
      moviesMock[3],
    ],
    id: peopleMock[2].id,
    name: peopleMock[2].name,
    birthYear: peopleMock[2].birthYear,
    posterImage: peopleMock[2].posterImage,
  },
]
