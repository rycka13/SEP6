import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from "@ngxs/store";
import { PROVIDERS } from "../app/app.module";
import { FavoritesService } from "./favorites.service";

describe('FavoritesService', () => {
  let service: FavoritesService;

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
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
