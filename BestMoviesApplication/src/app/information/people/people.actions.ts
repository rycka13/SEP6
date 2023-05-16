export class PersonsFetchInfo {
  static readonly type = 'Persons - Fetching info';
  constructor() {
  }
}

export class PersonsReset {
  static readonly type = 'Persons - Reset';
  constructor() {
  }
}

export class PersonsSearchName {
  static readonly type = 'Persons - Search by person name';
  constructor(public movieTitle: string) {
  }
}

export class PersonsSearchReset {
  static readonly type = 'Persons - Search Reset';
  constructor() {
  }
}
