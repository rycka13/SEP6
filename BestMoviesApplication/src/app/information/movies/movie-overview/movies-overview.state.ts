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

export interface MovieOverviewStateModel {
  isFetching: boolean;
  movie: Movie;
}

export const defaultsState: MovieOverviewStateModel = {
  isFetching: false,
  movie: null,
}

@State<MovieOverviewStateModel>({
  name: 'movieOverviewPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesState {
  constructor(
    private toastrService: NbToastrService,
    private movieService: MoviesService,
  ) {
  }

  @Action(MovieOverviewFetchInfo)
  async moviesFetchInfo(
    {getState, setState}: StateContext<MovieOverviewStateModel>) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let movie: Movie;
    try {
      //TODO calling api instead of mocks
      movie = moviesMock.find((moviePredicate: Movie) => {
        return moviePredicate;
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
