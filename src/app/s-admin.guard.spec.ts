import { TestBed } from '@angular/core/testing';

import { SAdminGuard } from './s-admin.guard';

describe('SAdminGuard', () => {
  let guard: SAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
