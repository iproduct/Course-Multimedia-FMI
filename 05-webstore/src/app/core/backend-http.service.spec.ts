import { TestBed } from '@angular/core/testing';

import { BackendHttpService } from './backend-http.service';

describe('BackendHttpService', () => {
  let service: BackendHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
