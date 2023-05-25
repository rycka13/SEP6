import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmSearchComponent } from "src/core/components/bm-search/bm-search.component";
import {NbButtonModule, NbIconModule, NbInputModule} from "@nebular/theme";

@NgModule({
  imports: [
    NbIconModule,
    CommonModule,
    NbButtonModule,
    NbInputModule,
  ],
  declarations: [BmSearchComponent],
  exports: [
    CommonModule,
    BmSearchComponent
  ],
})
export class SharedModule { }
