import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleAdapter} from "src/app/information/people/people-overview/adapter/PeopleAdapter";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {NbToastrService} from "@nebular/theme";
import {switchMap} from "rxjs/operators";
import {
  MovieOverviewFetchBestMoviesTop, MovieOverviewFetchDirectors,
  MovieOverviewFetchInfo, MovieOverviewFetchMoviesFromSameYear,
  MovieOverviewFetchRating, MovieOverviewFetchSameRatingRange, MovieOverviewFetchStars
} from "src/app/information/movies/movie-overview/movies-overview.actions";
import {MoviesOverviewSelector} from "src/app/information/movies/movie-overview/movies-overview.selector";
import {PeopleSelector} from "src/app/information/people/people.selector";
import {Observable} from "rxjs";
import {PeopleOverviewSelector} from "src/app/information/people/people-overview/people-overview.selector";
import {Star} from "src/model/star";
import {Director} from "src/model/director";

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


  alive: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private nbToastrService: NbToastrService,
    private router: Router,
    private peopleAdapter: PeopleAdapter) {

  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          const peopleType = params['peopleType'];
          const personId = params['personId'];

          return this.peopleAdapter.initPeopleType(peopleType, personId)
        })
      );
  }

  ngOnDestroy() {
  }
}
