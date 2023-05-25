export class MoviesFetchNextPage {
  static readonly type = 'Movies - Fetch next page';
  constructor() {
  }
}

export class MoviesAddMovieToFavourites {
  static readonly type = 'Movies - Add movie to favourites';

  constructor(public userName: string,
              public movieId: number) {
  }
}

export class MoviesReset {
  static readonly type = 'Movies - Reset';
  constructor() {
  }
}

export class MoviesSearchTitle {
  static readonly type = 'Movies - Search by movie title';
  constructor(public movieTitle: string) {
  }
}

export class MoviesSearchReset {
  static readonly type = 'Movies - Search Reset';
  constructor() {
  }
}

