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


export function getSelectedItemById(id: string) {
  return GENERAL_MENU_ITEMS.filter(menuItem => {
    if (menuItem.children.length > 0) {
      return menuItem.children.filter(childrenMenuItem => childrenMenuItem.data.id = id);
    }
    return menuItem.data.id = id;
  });
}


//check if parent exists
export function getIndexOfChildInsideParent(parentId: string, childId: string) {
  switch (parentId) {
    case PARENT_IDS.INFORMATION_ID: {
      return INFORMATION_MENU_ITEMS.findIndex(menuItem => menuItem.data.id == childId);
    }
    default: {
      // if parent doesn't exist, then it returns -1
      return -1;
    }
  }
}

export function getIndexOfParent(parentId: string) {
  return GENERAL_MENU_ITEMS.findIndex(menuItem => menuItem.data.id == parentId);
}

export function updateSelectedChildAtIndexOfParent(parentId: string, indexOfChild: number, isSelected: boolean) {
  try {
    switch (parentId) {
      case PARENT_IDS.INFORMATION_ID: {
        INFORMATION_MENU_ITEMS[indexOfChild].selected = isSelected;
        return true;
      }
      default: {
        return false;
      }
    }
  }
  //index out of bounds
  catch (e) {
    console.log(e);
    return false;
  }
}

export function updateSelectedParentAtIndex(indexOfParent: number, isSelected: boolean) {
  try  {
   GENERAL_MENU_ITEMS[indexOfParent].selected = isSelected;
   return true;
  }
  //index out of bounds
  catch (e) {
    console.log(e);
    return false;
  }
}

//pagination
export function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

