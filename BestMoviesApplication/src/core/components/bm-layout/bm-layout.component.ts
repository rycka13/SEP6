import { Component } from '@angular/core';
import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {
  GENERAL_MENU_ITEMS,
  getIndexOfChildInsideParent,
  getIndexOfParent,
  updateSelectedParentAtIndex,
  updateSelectedChildAtIndexOfParent,
  PARENT_IDS,
} from "../../../app/constants";

@Component({
  selector: 'bm-layout',
  template:`
      <nb-layout>
          <nb-layout-header fixed>
            <button
              nbButton
              ghost
              shape="round"
            (click)="toggle()"
            >
              <nb-icon [icon]="isToggled ? 'arrowhead-right-outline' : 'arrowhead-left-outline'"></nb-icon>
            </button>
              <a href="#" (click)="toggle()"><i class="nb-menu"></i></a>
          </nb-layout-header>
          <nb-sidebar>
            <nb-menu [items]="GENERAL_MENU_ITEMS"></nb-menu>
          </nb-sidebar>
          <nb-layout-column class="colored-column-basic">
            <router-outlet></router-outlet>
          </nb-layout-column>
      </nb-layout>
  `
})

export class BmLayoutComponent {

  GENERAL_MENU_ITEMS = GENERAL_MENU_ITEMS;
  selectedItem: any;
  isToggled = false;
  constructor(private sideBarService: NbSidebarService,
              private menu: NbMenuService) {

    let indexOfItem = getIndexOfParent(PARENT_IDS.OVERALL_INFORMATION_ID);
    this.selectedItem = GENERAL_MENU_ITEMS[indexOfItem];
    //event for menu item clicked
    menu.onItemClick().subscribe(item => {
      if(this.selectedItem) {
        if(this.selectedItem.parent) {
          let indexOfItem = getIndexOfChildInsideParent(this.selectedItem.parent.data.id, this.selectedItem.data.id);
          updateSelectedChildAtIndexOfParent(this.selectedItem.parent.data.id, indexOfItem, false);
        }
        else {
          let indexOfItem = getIndexOfParent(this.selectedItem.data.id);
          updateSelectedParentAtIndex(indexOfItem, false);
        }
      }
      item.item.selected = true;
      this.selectedItem = item.item;
    })
  }

  toggle() {
    this.isToggled = !this.isToggled;
    this.sideBarService.toggle(true);
  }
}
