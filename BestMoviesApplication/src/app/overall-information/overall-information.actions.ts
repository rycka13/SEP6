import {MovieOverviewFetchBestMoviesTop} from "src/app/information/movies/movie-overview/movies-overview.actions";

export class OverAllInformationFetchInfo {
  static readonly type = 'Overall Information - Fetching info';
  constructor() {
  }
}
export class OverAllInformationFetchBestMoviesTop{
  static readonly type = 'Overall information - Fetching best movies in top';
  constructor(public top: number) {
  }
}

export class OverAllInformationFetchMoviesFromSameYear{
  static readonly type = 'Overall information - Fetching movies from the same year';
  constructor(public listSize: number,
              public year: number) {
  }
}

export class OverAllInformationFetchSameRatingRange{
  static readonly type = 'Overall information - Fetching movies with same rating range';
  constructor(public listSize: number,
              public rating: number) {
  }
}

export class OverAllInformationReset {
  static readonly type = 'Overall Information - Reset';
  constructor() {
  }
}

