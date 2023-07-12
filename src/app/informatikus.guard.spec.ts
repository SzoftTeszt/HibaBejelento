import { TestBed } from '@angular/core/testing';

import { InformatikusGuard } from './informatikus.guard';

describe('InformatikusGuard', () => {
  let guard: InformatikusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InformatikusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
