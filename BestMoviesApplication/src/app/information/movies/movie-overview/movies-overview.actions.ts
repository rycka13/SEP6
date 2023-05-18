export class MovieOverviewFetchInfo {
  static readonly type = 'Movie Overview - Fetching info';
  constructor(public movieId: number) {
  }
}

export class MovieOverviewFetchStars {
  static readonly type = 'Movie Overview - Fetching stars';
  constructor(public movieId: number) {
  }
}

export class MovieOverviewFetchDirectors {
  static readonly type = 'Movie Overview - Fetching directors';
  constructor(public movieId: number) {
  }
}

export class MovieOverviewFetchRatings {
  static readonly type = 'Movie Overview - Fetching ratings';
  constructor(public movieId: number) {
  }
}


export class MovieOverviewReset {
  static readonly type = 'Movie Overview - Reset';
  constructor() {
  }
}

