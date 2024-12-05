import { TestBed } from '@angular/core/testing';

import { DiscardMatchesService } from './discard-matches.service';

describe('DiscardMatchesService', () => {
  let service: DiscardMatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscardMatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
