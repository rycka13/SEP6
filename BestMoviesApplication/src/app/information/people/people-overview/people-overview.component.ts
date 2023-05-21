import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {NbToastrService} from "@nebular/theme";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {PeopleOverviewSelector} from "src/app/information/people/people-overview/people-overview.selector";
import {Star} from "src/model/star";
import {Director} from "src/model/director";
import {Movie} from "src/model/movie";
import {
  PeopleOverviewFetchInfo,
  PeopleOverviewReset
} from "src/app/information/people/people-overview/people-overview.actions";
import {getPeopleType, PeopleType} from "src/app/information/people/people-overview/constants/constants";
import {Person} from "src/model/person";

@Component({
  selector: 'app-people-overview',
  templateUrl: './people-overview.component.html',
  styleUrls: ['./people-overview.component.scss']
})
export class PeopleOverviewComponent implements OnInit, OnDestroy{

  //selectors observable ngxs
  @Select(PeopleOverviewSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(PeopleOverviewSelector.person)
  person$: Observable<Person>;


  alive: boolean = true;
  peopleType: PeopleType;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private nbToastrService: NbToastrService,
    private router: Router) {

  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const peopleType = params['peopleType'];
      const personId = params['personId'];
      this.peopleType = getPeopleType(peopleType);
      this.store.dispatch(new PeopleOverviewFetchInfo(this.peopleType, Number(personId)));
    });
  }


  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  getPeopleTypeEnum() : typeof PeopleType {
    return PeopleType;
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new PeopleOverviewReset());
  }
}
