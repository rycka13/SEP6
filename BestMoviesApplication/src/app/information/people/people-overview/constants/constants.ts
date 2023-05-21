export enum PeopleType {
  STAR = 'star',
  DIRECTOR = 'director',
  UNKNOWN = "UNKNOWN"
}

export function getPeopleType(peopleType: string) {
  switch(peopleType) {
    case "star" : return PeopleType.STAR;
    case "director" : return PeopleType.DIRECTOR;
    default: return PeopleType.UNKNOWN;
  }
}
