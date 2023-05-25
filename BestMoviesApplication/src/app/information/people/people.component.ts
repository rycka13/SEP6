import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbSearchService, NbTabComponent } from "@nebular/theme";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { PeopleSelector } from "src/app/information/people/people.selector";
import {
  PeopleFetchDirectorsNextPage,
  PeopleFetchStarsNextPage,
  PeopleReset, PeopleSearchDirectorsByName,
  PeopleSearchDirectorsReset,
  PeopleSearchStarsByName,
  PeopleSearchStarsReset
} from "src/app/information/people/people.actions";
import { Star } from "src/model/star";
import { Director } from "src/model/director";
import { PeoplePlaceHolderEnum } from "src/app/information/people/constants/constants";
import { Router } from "@angular/router";
import { PeopleType } from "src/app/information/people/people-overview/constants/constants";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  //selectors observable ngxs
  @Select(PeopleSelector.isFetching)
  isFetching$: Observable<boolean>;

  @Select(PeopleSelector.starsAreFiltered)
  starsAreFiltered$: Observable<boolean>;

  @Select(PeopleSelector.directorsAreFiltered)
  directorsAreFiltered$: Observable<boolean>;

  @Select(PeopleSelector.starsSize)
  starsSize$: Observable<string>;

  @Select(PeopleSelector.directorsSize)
  directorsSize$: Observable<string>;

  @Select(PeopleSelector.stars)
  stars$: Observable<Star[]>;

  @Select(PeopleSelector.directors)
  directors$: Observable<Director[]>;

  starsPlaceholder: string;
  directorsPlaceholder: string;

  currentTabSelected: NbTabComponent = null;

  alive: boolean = true;

  constructor(private store: Store,
              private router: Router,
              private searchService: NbSearchService) {
  }

  ngOnInit() {
    this.starsPlaceholder = PeoplePlaceHolderEnum.STARS_PLACEHOLDER;
    this.directorsPlaceholder = PeoplePlaceHolderEnum.DIRECTORS_PLACEHOLDER;

    let actionsInParallel = [
      new PeopleFetchStarsNextPage(),
      new PeopleFetchDirectorsNextPage(),
    ]
    this.store.dispatch([...actionsInParallel]);
  }

  onSearch(peopleType: PeopleType, event) {
    if (peopleType === PeopleType.STAR) {
      this.starsPlaceholder = event;
      this.store.dispatch(new PeopleSearchStarsByName(event))
    } else if (peopleType === PeopleType.DIRECTOR) {
      this.directorsPlaceholder = event;
      this.store.dispatch(new PeopleSearchDirectorsByName(event))
    }
  }

  resetSearch(peopleType: PeopleType) {
    if (peopleType === PeopleType.STAR) {
      this.starsPlaceholder = PeoplePlaceHolderEnum.STARS_PLACEHOLDER;
      this.store.dispatch(new PeopleSearchStarsReset());
    } else if (peopleType === PeopleType.DIRECTOR) {
      this.directorsPlaceholder = PeoplePlaceHolderEnum.DIRECTORS_PLACEHOLDER;
      this.store.dispatch(new PeopleSearchDirectorsReset());
    }
  }

  loadNext(peopleType: PeopleType) {
    if (peopleType === PeopleType.STAR) {
      this.store.dispatch(new PeopleFetchStarsNextPage());
    }
    else if(peopleType === PeopleType.DIRECTOR) {
      this.store.dispatch(new PeopleFetchDirectorsNextPage());
    }
  }

  changeCurrentTab(nbTabComponent: NbTabComponent) {
    this.currentTabSelected = nbTabComponent;
  }

  isTabActive(peopleType: PeopleType) {
    return peopleType === PeopleType.DIRECTOR || peopleType === PeopleType.STAR;
  }

  redirectToOverviewPageFor(peopleType: PeopleType, id: number) {
    this.router.navigate([`/information/people/${peopleType}/${id}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new PeopleReset());
  }

  getPeopleType(): typeof PeopleType {
    return PeopleType;
  }
}
