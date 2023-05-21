export class PeopleFetchInfo {
  static readonly type = 'People - Fetching info';
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
