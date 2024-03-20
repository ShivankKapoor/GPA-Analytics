import { TestBed } from '@angular/core/testing';

import { MiniWarningService } from './mini-warning.service';

describe('MiniWarningService', () => {
  let service: MiniWarningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniWarningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
