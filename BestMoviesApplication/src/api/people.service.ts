import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import {map} from "rxjs/operators"
import {Person} from "src/model/person";
import {Observable} from "rxjs";


@Injectable()
export class PeopleService {
  constructor (
    private apiService: ApiService
  ) {}

  PATH_CONTROLLER = 'person';
  ID = 'personId';

// All other controllers follow the same pattern. For example: if you want to getAll for starts: {URL}/star/getAll,
//   same for PUT method: {URL}/star/starId/{starId} . It takes 'Star' object instead of 'Movie' object
  getPerson(personId): Observable<Person> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/${this.ID}/${personId}`)
      .pipe(map(data => data.person));
  }

  getAll(): Observable<Person[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/getAll`)
      .pipe(map(data => data.persons));
  }

  savePerson(person): Observable<Person> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/save`,
        { person: { body: person } }
      ).pipe(map(data => data.person));
  }

  updatePerson(personId, person): Observable<Person> {
    return this.apiService
      .post(
        `${this.PATH_CONTROLLER}/${this.ID}/${personId}`,
        { person: { body: person } }
      ).pipe(map(data => data.person));
  }

  deletePerson(personId) {
    return this.apiService
      .delete(`${this.PATH_CONTROLLER}/${this.ID}/${personId}`);
  }

}
