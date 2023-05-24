import { Selector } from "@ngxs/store";
import { UserTopListMoviesState, UserTopListMoviesStateModel } from "src/app/user-list/top-list/top-list.state";

export class UserTopListMoviesSelector {
  @Selector([UserTopListMoviesState])
  static isFetching(state: UserTopListMoviesStateModel) {
    return state.isFetching;
  }

  @Selector([UserTopListMoviesState])
  static movies(state: UserTopListMoviesStateModel) {
    return state.movies;
  }
}
