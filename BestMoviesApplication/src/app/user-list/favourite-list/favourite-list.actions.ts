export class UserFavouriteListMoviesFetch {
  static readonly type = 'Favourite list - Fetching info';
  constructor(public userName: string,
              public isFilteringAction: boolean) {
  }
}

export class UserFavouriteListMoviesResetFiltering {
  static readonly type = 'Favourite list - search by username';
  constructor() {
  }
}

export class UserFavouriteListMoviesReset {
  static readonly type = 'Favourite list - reset';
  constructor() {
  }
}
