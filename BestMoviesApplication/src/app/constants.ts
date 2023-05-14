//global constants for the app

import {NbMenuItem} from "@nebular/theme";

//this const will contain all icons used, so another developer doesn't need to search on the internet, if there is something already used

export const PAGE_TITLES = {
  //GENERAL MENU
  OVERALL: 'Overall',
}
export const GENERAL_MENU_ITEMS: NbMenuItem[] = [
  {
    title: PAGE_TITLES.OVERALL,
    link: '/',
    icon: 'map-outline',
  }
]
