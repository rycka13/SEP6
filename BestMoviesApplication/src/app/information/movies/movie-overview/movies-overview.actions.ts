export class MovieOverviewFetchInfo {
  static readonly type = 'Movie Overview - Fetching info';
  constructor(movieId: number) {
  }
}

export class MovieOverviewReset {
  static readonly type = 'Movie Overview - Reset';
  constructor() {
  }
}

