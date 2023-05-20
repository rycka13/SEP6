import {PeopleType} from "src/app/information/people/people-overview/constants/constants";
import {Injectable} from "@angular/core";
import {
  getPositionOfLineAndCharacter
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {PeopleOverviewFetchInfo} from "src/app/information/people/people-overview/people-overview.actions";

@Injectable()
export class PeopleAdapter {


  peopleType: PeopleType;

  constructor(private store: Store) {
  }
  initPeopleType(peopleType: string, personId: number): Observable<any> {
    this.peopleType = this.getPeopleType(peopleType);

    return this.store.dispatch(new PeopleOverviewFetchInfo(this.peopleType, personId));
  }

  getPeopleType(peopleType: string) {
    switch(peopleType) {
      case "star" : return PeopleType.STAR;
      case "director" : return PeopleType.DIRECTOR;
      default: return PeopleType.UNKNOWN;
    }
  }

}
