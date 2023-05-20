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
  person$: Observable<Star | Director>;

  @Select(PeopleOverviewSelector.movies)
  movies$: Observable<Movie[]>;


  alive: boolean = true;
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

      this.store.dispatch(new PeopleOverviewFetchInfo(peopleType, Number(personId)));
    });
  }


  redirectToMovieOverviewPage(movieId: number) {
    this.router.navigate([`/information/movies/${movieId}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new PeopleOverviewReset());
  }
}
