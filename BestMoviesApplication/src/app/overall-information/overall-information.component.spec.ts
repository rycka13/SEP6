import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallInformationComponent } from './overall-information.component';

describe('OverallInformationComponent', () => {
  let component: OverallInformationComponent;
  let fixture: ComponentFixture<OverallInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
