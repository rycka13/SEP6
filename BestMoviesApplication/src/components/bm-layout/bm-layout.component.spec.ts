import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmLayoutComponent } from './bm-layout.component';

describe('BmLayoutComponent', () => {
  let component: BmLayoutComponent;
  let fixture: ComponentFixture<BmLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
