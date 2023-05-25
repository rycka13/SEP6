import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmSearchComponent } from "src/core/components/bm-search/bm-search.component";
import { NbIconModule } from "@nebular/theme";

@NgModule({
  imports: [
    NbIconModule,
    CommonModule,
  ],
  declarations: [BmSearchComponent],
  exports: [
    CommonModule,
    BmSearchComponent
  ],
})
export class SharedModule { }
