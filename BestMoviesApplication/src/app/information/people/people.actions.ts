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

export class PeopleSearchName {
  static readonly type = 'People - Search by person name';
  constructor(public personName: string) {
  }
}

export class PeopleSearchReset {
  static readonly type = 'People - Search Reset';
  constructor() {
  }
}
