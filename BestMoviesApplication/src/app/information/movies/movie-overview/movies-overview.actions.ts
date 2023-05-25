import {Rating} from "src/model/rating";

export class MovieOverviewFetchInfo {
  static readonly type = 'Movie Overview - Fetching info';
  constructor(public movieId: number,
              public userName?: string) {
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

export class MovieOverviewFetchRating {
  static readonly type = 'Movie Overview - Fetching ratings';
  constructor(public movieId: number) {
  }
}

export class MovieOverviewFetchBestMoviesTop {
  static readonly type = 'Movie Overview - Fetching best movies in top';
  constructor(public top: number) {
  }
}

export class MovieOverviewFetchMoviesFromSameYear{
  static readonly type = 'Movie Overview - Fetching movies from the same year';
  constructor(public listSize: number,
              public year: number) {
  }
}

export class MovieOverviewFetchSameRatingRange {
  static readonly type = 'Movie Overview - Fetching movies with same rating range';
  constructor(public listSize: number,
              public rating: number) {
  }
}

export class MovieOverviewReset {
  static readonly type = 'Movie Overview - Reset';
  constructor() {
  }
}

