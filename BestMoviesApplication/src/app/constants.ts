//global constants for the app

import {NbMenuItem} from "@nebular/theme";

//this const will contain all icons used, so another developer doesn't need to search on the internet, if there is something already used

export const PARENT_IDS = {
  OVERALL_INFORMATION_ID: 'overall-information',
  USER_LIST_ID: 'user-list',
  INFORMATION_ID: 'information',
}
export const PAGE_GENERAL_TITLES = {
  //GENERAL MENU
  OVERALL: 'Overall',
  INFORMATION: 'Information'
}

export const PAGE_USER_LIST_TITLES = {
  //GENERAL MENU
  TOP: 'Top movies',
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

export const USER_LIST_MENU_ITEMS: NbMenuItem[] = [
  {
    title: PAGE_USER_LIST_TITLES.TOP,
    link: 'user-list/top',
    icon: '',
    data: {
      id: 'user-top-list'
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
    title: 'My list of movies ',
    children: USER_LIST_MENU_ITEMS,
    expanded: true,
    data: {
      id: PARENT_IDS.USER_LIST_ID,
    },
  },
  {
    title: PAGE_GENERAL_TITLES.INFORMATION,
    icon: 'info-outline',
    children: INFORMATION_MENU_ITEMS,
    expanded: true,
    data: {
      id: PARENT_IDS.INFORMATION_ID,
    }
  }
]
