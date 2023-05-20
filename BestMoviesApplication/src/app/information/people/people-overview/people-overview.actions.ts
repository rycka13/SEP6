export class PeopleOverviewFetchInfo {
  static readonly type = 'People Overview - Fetching info';
  constructor(public peopleType: string,
              public personId: number) {
  }
}

export class PeopleOverviewReset {
  static readonly type = 'People Overview - Reset';
  constructor() {
  }
}
