import { TestBed } from '@angular/core/testing';

import { PromiseBackendMockService } from './promise-backend-mock.service';

describe('PromiseBackendMockService', () => {
  let service: PromiseBackendMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromiseBackendMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
