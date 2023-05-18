import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bm-search',
  template: `
      <div class="search-container">
        <input #searchInput
               (keyup.enter)="search(searchInput.value)"
               (keyup.backspace)="onReset(searchInput.value, false)"
                (blur)="onReset(searchInput.value, false); searchInput.value = ''"
        nbInput
        >
        <button
          *ngIf="isFiltered"
          nbButton
          outline
          status="basic"
          shape="round"
          class="reset-button"
          (click)="onReset('',true)"
        >
          <nb-icon
            icon="refresh-outline"
            pack="eva"
          >
          </nb-icon>
          Reset search
        </button>
      </div>
  `,
  styleUrls: ['./bm-search.component.scss']
})
export class BmSearchComponent {

  @Output() searchEvent = new EventEmitter<string>();
  @Output() resetSearch = new EventEmitter<void>();
  @Input() isFiltered: boolean;

  constructor() {
  }

  onReset(searchInput: string, triggeredByButton: boolean) {
    if(searchInput && searchInput.length < 3 && !triggeredByButton) {
      this.resetSearch.emit();
    }
    if(triggeredByButton) {
      this.resetSearch.emit();
    }

    //TODO maybe some toastr here that the search was resetted?
  }

  search(searchInput: string) {
    if(searchInput.length >= 3) {
      this.searchEvent.emit(searchInput);
    }
  }
}
