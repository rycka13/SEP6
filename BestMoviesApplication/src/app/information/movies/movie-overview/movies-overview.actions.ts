export class MovieOverviewFetchInfo {
  static readonly type = 'Movie Overview - Fetching info';
  constructor(public movieId: number) {
  }
}

export class MovieOverviewFetchStars {
  static readonly type = 'Movie Overview - Fetching stars';
  constructor() {
  }
}

export class MovieOverviewFetch {
  static readonly type = 'Movie Overview - Fetching stars';
  constructor() {
  }
}


export class MovieOverviewReset {
  static readonly type = 'Movie Overview - Reset';
  constructor() {
  }
}

