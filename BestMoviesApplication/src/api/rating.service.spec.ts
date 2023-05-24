import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from "@ngxs/store";
import { PROVIDERS } from "../app/app.module";
import { RatingService } from "./rating.service";

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        ...PROVIDERS,
        Store,
      ],
    });
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});