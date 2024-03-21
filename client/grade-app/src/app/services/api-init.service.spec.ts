import { TestBed } from '@angular/core/testing';

import { ApiInitService } from './api-init.service';

describe('ApiInitService', () => {
  let service: ApiInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
