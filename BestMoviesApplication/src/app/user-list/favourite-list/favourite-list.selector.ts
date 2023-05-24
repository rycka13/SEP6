import { Selector } from "@ngxs/store";
import { UserFavouriteListMoviesState, UserFavouriteListMoviesStateModel } from "src/app/user-list/favourite-list/favourite-list.state";

export class UserFavouriteListMoviesSelector {
  @Selector([UserFavouriteListMoviesState])
  static isFetching(state: UserFavouriteListMoviesStateModel) {
    return state.isFetching;
  }

  @Selector([UserFavouriteListMoviesState])
  static movies(state: UserFavouriteListMoviesStateModel) {
    return state.movies;
  }
}
