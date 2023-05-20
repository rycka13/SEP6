import {peopleMock} from "./people_mock";
import {moviesMock} from "./movies_mock";
import {Star} from "../../model/star";

export const starsMock: Star[] = [
  {
    movies: [
      moviesMock[0],
      moviesMock[1],
    ],
    id: peopleMock[6].id,
    name: peopleMock[6].name,
    birthYear: peopleMock[6].birthYear,
    posterImage: peopleMock[6].posterImage,
  },
  {
    movies: [
      moviesMock[1],
      moviesMock[2],
    ],
    id: peopleMock[5].id,
    name: peopleMock[5].name,
    birthYear: peopleMock[5].birthYear,
    posterImage: peopleMock[5].posterImage,
  },
  {
    movies: [
      moviesMock[3],
      moviesMock[4],
    ],
    id: peopleMock[4].id,
    name: peopleMock[4].name,
    birthYear: peopleMock[4].birthYear,
    posterImage: peopleMock[4].posterImage,
  },
]
