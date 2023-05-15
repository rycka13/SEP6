import {peopleMock} from "./people_mock";
import {moviesMock} from "./movies_mock";
import {Rating} from "../../model/rating";

export const ratingsMock: Rating[] = [
  {
    movieID: moviesMock[0].id,
    rating: 5.4,
    votes: 12,
  },
  {
    movieID: moviesMock[1].id,
    rating: 6.2,
    votes: 20,
  },
  {
    movieID: moviesMock[2].id,
    rating: 5.6,
    votes: 15,
  },
  {
    movieID: moviesMock[3].id,
    rating: 7.1,
    votes: 8,
  },
  {
    movieID: moviesMock[4].id,
    rating: 6.4,
    votes: 78118,
  },
  {
    movieID: moviesMock[5].id,
    rating: 6.5,
    votes: 258,
  },
  {
    movieID: moviesMock[6].id,
    rating: 7.4,
    votes: 1566
  },
]
