export class MoviesFetchInfo {
  static readonly type = 'Movies - Fetching info';
  constructor() {
  }
}

export class MoviesFetchNextPage {
  static readonly type = 'Movies - Fetch next page';
  constructor() {
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

