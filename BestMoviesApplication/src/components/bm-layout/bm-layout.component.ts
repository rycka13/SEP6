import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'bm-layout',
  template:`
      <nb-layout>
          <nb-layout-header fixed>
              <a href="#" (click)="toggle()"><i class="nb-menu"></i></a>
          </nb-layout-header>
          <nb-layout-header subheader>
              <nb-actions>
                  <nb-action icon="home-outline"></nb-action>
                  <nb-action icon="search-outline"></nb-action>
                  <nb-action icon="edit-outline"></nb-action>
              </nb-actions>
          </nb-layout-header>
          <nb-sidebar></nb-sidebar>
          <nb-layout-column class="colored-column-basic">Layout Content</nb-layout-column>
      </nb-layout>
  `
})

export class BmLayoutComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
