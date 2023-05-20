import {RatingService} from "src/api/ratings/rating.service";
import {RatingsService} from "src/api/ratings/ratings.service";
import {ratingsMock} from "src/util/mocks/ratings_mock";
import Mocked = jest.Mocked;

export function mockRatingServiceCalls(ratingServiceMocked: Mocked<RatingService>,
                                       ratingsServiceMocked: Mocked<RatingsService>) {
  ratingServiceMocked.getRating.mockResolvedValue(ratingsMock[1]);
  ratingServiceMocked.getRatingByMovieId.mockResolvedValue(ratingsMock[1]);
  ratingsServiceMocked.getAll.mockResolvedValue([ratingsMock[1],ratingsMock[2]]);
}
