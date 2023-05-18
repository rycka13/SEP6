import {GENERAL_MENU_ITEMS, INFORMATION_MENU_ITEMS, PARENT_IDS} from "src/app/constants";


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
