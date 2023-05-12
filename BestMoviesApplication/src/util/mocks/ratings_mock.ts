import {peopleMock} from "./people_mock";
import {moviesMock} from "./movies_mock";
import {Rating} from "../../model/rating";

export const ratingsMock: Rating[] = [
  {
    movie: moviesMock[0],
    rating: 5.4,
    votes: 12,
  },
  {
    movie: moviesMock[1],
    rating: 6.2,
    votes: 20,
  },
  {
    movie: moviesMock[2],
    rating: 5.6,
    votes: 15,
  },
  {
    movie: moviesMock[3],
    rating: 7.1,
    votes: 8,
  },
  {
    movie: moviesMock[4],
    rating: 6.4,
    votes: 78118,
  },
  {
    movie: moviesMock[5],
    rating: 6.5,
    votes: 258,
  },
  {
    movie: moviesMock[6],
    rating: 7.4,
    votes: 1566
  },
]
