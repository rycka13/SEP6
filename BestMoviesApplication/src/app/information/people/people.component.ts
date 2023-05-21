import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {PeopleSelector} from "src/app/information/people/people.selector";
import {
  PeopleFetchInfoFirstPage,
  PeopleReset,
  PeopleSearchDirectorsReset,
  PeopleSearchStarsByName,
  PeopleSearchStarsReset
} from "src/app/information/people/people.actions";
import {Star} from "src/model/star";
import {Director} from "src/model/director";
import {PeoplePlaceHolderEnum} from "src/app/information/people/constants/constants";
import {Router} from "@angular/router";
import {PeopleType} from "src/app/information/people/people-overview/constants/constants";

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

  @Select(PeopleSelector.starsAreFiltered)
  directorsAreFiltered$: Observable<boolean>;

  @Select(PeopleSelector.stars)
  stars$: Observable<Star[]>;

  @Select(PeopleSelector.directors)
  directors$: Observable<Director[]>;

  starsPlaceholder: string;
  directorsPlaceholder: string;
  alive: boolean = true;

  constructor(private store: Store,
              private router: Router,
              private searchService: NbSearchService) {
  }

  async ngOnInit() {
    this.starsPlaceholder = PeoplePlaceHolderEnum.STARS_PLACEHOLDER;
    this.directorsPlaceholder = PeoplePlaceHolderEnum.DIRECTORS_PLACEHOLDER;

    const actionsInParallel = [
      new PeopleFetchInfoFirstPage(),
    ];
    this.store.dispatch([...actionsInParallel]);
  }

  onSearch(peopleType: PeopleType, event) {
    if (peopleType === PeopleType.STAR) {
      this.starsPlaceholder = event;
      this.store.dispatch(new PeopleSearchStarsByName(event))
    } else if (peopleType === PeopleType.DIRECTOR) {
      this.directorsPlaceholder = event;
      this.store.dispatch(new PeopleSearchStarsByName(event))
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

    }
    else if(peopleType === PeopleType.DIRECTOR) {

    }
  }

  redirectToOverviewPageFor(peopleType: PeopleType, starId: number) {
    this.router.navigate([`/information/people/${peopleType}/${starId}`]);
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new PeopleReset());
  }

  getPeopleType(): typeof PeopleType {
    return PeopleType;
  }
}
