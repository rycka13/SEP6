import { Component } from '@angular/core';
import {NbMenuService, NbSidebarService} from "@nebular/theme";
import {
  getIndexOfChildInsideParent,
  getIndexOfParent,
  updateSelectedChildAtIndexOfParent, updateSelectedParentAtIndex
} from "src/core/helpers/helpers";
import {GENERAL_MENU_ITEMS, PARENT_IDS} from "src/app/constants";
import { AuthService } from "src/core/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/model/user";

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <div class="left-container">
          <button
            *ngIf="isLoggedIn"
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
            (click)="redirectToLoginPage()"
            nbTooltip="Log in"
          >
            <nb-icon icon="log-in-outline"></nb-icon>
          </button>
          <button
            *ngIf="isLoggedIn"
            nbButton
          status="primary"
          disabled>
            <nb-icon
              icon="person-outline"
              pack="eva"
            ></nb-icon>
            <span *ngIf="user.userName">
              {{ user.userName }}
            </span>
            <span *ngIf="user.email">
              {{ user.email }}
            </span>
          </button>
          <button
            *ngIf="isLoggedIn"
            nbButton
            ghost
            shape="round"
            nbTooltip="Log out"
            (click)="logOut()"
          >
            <nb-icon icon="log-out-outline"></nb-icon>
          </button>
        </div>
        <a href="#" *ngIf="isLoggedIn" (click)="toggle()"><i class="nb-menu"></i></a>
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
  user: User;
  constructor(private sideBarService: NbSidebarService,
              private menu: NbMenuService,
              public authService: AuthService,
              private router: Router) {

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if(!isLoggedIn) {
        this.router.navigate([`/auth/login`]);
      }
      this.isLoggedIn = isLoggedIn;
    })

    this.authService.user$.subscribe(user => {
      this.user = user;
    })

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

  redirectToLoginPage() {
    this.router.navigate([`/auth/login`]);
  }

  logOut() {
    this.authService.hasLoggedOut();
    this.router.navigate([`/auth/login`]);
  }
}
