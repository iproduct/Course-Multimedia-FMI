import { TestBed } from '@angular/core/testing';

import { PromiseBackendService } from './promise-backend.service';

describe('PromiseBackendServiceService', () => {
  let service: PromiseBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(PromiseBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
