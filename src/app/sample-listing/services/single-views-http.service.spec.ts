import { TestBed } from '@angular/core/testing';

import { SingleViewsHttpService } from './single-views-http.service';

describe('SingleViewsHttpService', () => {
  let service: SingleViewsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleViewsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
