export class UserFavouriteListMoviesFetch {
  static readonly type = 'Favourite list - Fetching info';
  constructor(public userName: string) {
  }
}
export class UserFavouriteListMoviesReset {
  static readonly type = 'Favourite list - reset';
  constructor() {
  }
}
