import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import {GENERAL_MENU_ITEMS} from "../../app/constants";

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
  isToggled = false;
  constructor(private sideBarService: NbSidebarService) {
  }

  toggle() {
    this.isToggled = !this.isToggled;
    this.sideBarService.toggle(true);
  }
}
