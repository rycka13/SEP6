import {Movie} from "src/model/movie";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {
  MovieOverviewFetchInfo,
  MovieOverviewReset
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {produce} from "immer";
import {moviesMock} from "src/util/mocks/movies_mock";
import {MoviesService} from "src/api/movies.service";
import {Star} from "src/model/star";
import {starsMock} from "src/util/mocks/stars_mock";
import {Director} from "src/model/director";
import {Rating} from "src/model/rating";

export interface MovieOverviewStateModel {
  isFetching: boolean;
  movie: Movie;
  stars: Star[];
  directors: Director[];
  ratings: Rating[];
}

export const defaultsState: MovieOverviewStateModel = {
  isFetching: false,
  movie: null,
  stars: [],
  directors: [],
  ratings: [],
}

@State<MovieOverviewStateModel>({
  name: 'movieOverviewPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesOverviewState {
  constructor(
    private toastrService: NbToastrService,
    private movieService: MoviesService,
  ) {
  }

  @Action(MovieOverviewFetchInfo)
  async movieOverviewFetchInfo(
    {getState, setState}: StateContext<MovieOverviewStateModel>,
    action: MovieOverviewFetchInfo) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let movie: Movie;
    let stars: Star[];
    try {
      //TODO calling api instead of mocks
      movie = moviesMock.find((moviePredicate: Movie) => moviePredicate.id == action.movieId);

      //TODO this one needs to be another action from its page
      stars = starsMock.filter((starPredicate: Star) => {
        let starsForMovie = starPredicate.movies.filter((moviePredicate: Movie) => moviePredicate.id == movie.id);
        return starsForMovie.length > 0;
      });

    }
    catch (e) {
      console.log(e);
    }

    newState = produce(getState(), draft => {
      draft.movie = movie;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(MovieOverviewReset)
  async moviesReset(
    {getState, setState}
      :
      StateContext<MovieOverviewStateModel>
  ) {
    setState(defaultsState);
  }
}
