import { TestBed } from '@angular/core/testing';

import { Googlesheets } from './googlesheets';

describe('Googlesheets', () => {
  let service: Googlesheets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Googlesheets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
