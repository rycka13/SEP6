import { Component } from '@angular/core';
import {NbMenuService, NbSidebarService} from "@nebular/theme";
import {
  getIndexOfChildInsideParent,
  getIndexOfParent,
  updateSelectedChildAtIndexOfParent, updateSelectedParentAtIndex
} from "src/core/helpers/helpers";
import {GENERAL_MENU_ITEMS, PARENT_IDS} from "src/app/constants";
import { AuthService } from "src/core/services/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <div class="left-container">
          <button
            nbButton
            ghost
            shape="round"
            (click)="toggle()"
          >
            <nb-icon [icon]="isToggled ? 'arrowhead-right-outline' : 'arrowhead-left-outline'"></nb-icon>
          </button>
        </div>
        <div class="right-container">
          <button
            *ngIf="!isLoggedIn"
            nbButton
            ghost
            shape="round"
            (click)="toggle()"
            nbTooltip="Log in"
          >
            <nb-icon icon="log-in-outline"></nb-icon>
          </button>
          <button
            *ngIf="isLoggedIn"
            nbButton
            ghost
            shape="round"
            nbTooltip="Log out"
            (click)="toggle()"
          >
            <nb-icon icon="log-out-outline"></nb-icon>
          </button>
        </div>
        <a href="#" (click)="toggle()"><i class="nb-menu"></i></a>
      </nb-layout-header>
      <nb-sidebar *ngIf="isLoggedIn">
        <nb-menu [items]="GENERAL_MENU_ITEMS"></nb-menu>
      </nb-sidebar>
      <nb-layout-column class="colored-column-basic">
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  GENERAL_MENU_ITEMS = GENERAL_MENU_ITEMS;
  selectedItem: any;
  isToggled = false;
  isLoggedIn: boolean = false;
  constructor(private sideBarService: NbSidebarService,
              private menu: NbMenuService,
              public authService: AuthService) {

    // TODO this.isLoggedIn = authService.hasLoggedIn;
    this.isLoggedIn = true;

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
