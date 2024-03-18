import { TestBed } from '@angular/core/testing';

import { StringFormattingService } from './string-formatting.service';

describe('StringFormattingService', () => {
  let service: StringFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
