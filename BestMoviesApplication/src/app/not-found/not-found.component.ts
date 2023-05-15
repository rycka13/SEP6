import { Component } from '@angular/core';
import {NbThemeService} from "@nebular/theme";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private nbThemeService: NbThemeService) {
    // nbThemeService.changeTheme('default');
  }
}
