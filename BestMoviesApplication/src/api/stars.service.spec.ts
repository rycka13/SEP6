import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from "@ngxs/store";
import { PROVIDERS } from "../app/app.module";
import { StarsService } from "./stars.service";

describe('StarsService', () => {
  let service: StarsService;

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
    service = TestBed.inject(StarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
