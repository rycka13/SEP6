export class PeopleFetchInfoFirstPage {
  static readonly type = 'People - Fetching info for first page';
  constructor() {
  }
}

export class PeopleFetchStarsNextPage {
  static readonly type = 'People - Fetching stars for next page';
  constructor() {
  }
}

export class PeopleFetchAverageRatingMovies {
  static readonly type = "People - Fetching average ratings on person's movies";
  constructor() {
  }
}

export class PeopleFetchDirectorsNextPage {
  static readonly type = 'People - Fetching directors for next page';
  constructor() {
  }
}

export class PeopleReset {
  static readonly type = 'People - Reset';
  constructor() {
  }
}

export class PeopleSearchStarsByName {
  static readonly type = 'People - Search by stars by name';
  constructor(public starName: string) {
  }
}

export class PeopleSearchDirectorsByName {
  static readonly type = 'People - Search by directors by name';
  constructor(public directorName: string) {
  }
}

export class PeopleSearchStarsReset {
  static readonly type = 'People - Search stars reset';
  constructor() {
  }
}

export class PeopleSearchDirectorsReset {
  static readonly type = 'People - Search directors reset';
  constructor() {
  }
}
