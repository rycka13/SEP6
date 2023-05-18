//global constants for the app

import {NbMenuItem} from "@nebular/theme";

//this const will contain all icons used, so another developer doesn't need to search on the internet, if there is something already used

export const PARENT_IDS = {
  OVERALL_INFORMATION_ID: 'overall-information',
  INFORMATION_ID: 'information',
}
export const PAGE_GENERAL_TITLES = {
  //GENERAL MENU
  OVERALL: 'Overall',
  INFORMATION: 'Information'
}

export const PAGE_INFORMATION_TITLES = {
  //INFORMATION MENU
  MOVIES: 'Movies',
  PEOPLE: 'People',
}


export const INFORMATION_MENU_ITEMS: NbMenuItem[] = [
  {
    title: PAGE_INFORMATION_TITLES.MOVIES,
    link: 'information/movies',
    icon: 'film-outline',
    data: {
      id: 'movies'
    }
  },
  {
    title: PAGE_INFORMATION_TITLES.PEOPLE,
    link: 'information/people',
    icon: 'people-outline',
    data: {
      id: 'people'
    }
  }
];

export const GENERAL_MENU_ITEMS: NbMenuItem[] = [
  {
    title: PAGE_GENERAL_TITLES.OVERALL,
    link: '/overall-information',
    icon: 'map-outline',
    data: {
      id: PARENT_IDS.OVERALL_INFORMATION_ID
    }
  },
  {
    title: PAGE_GENERAL_TITLES.INFORMATION,
    icon: 'info-outline',
    children: INFORMATION_MENU_ITEMS,
    data: {
      id: PARENT_IDS.INFORMATION_ID,
    }
  }
]
