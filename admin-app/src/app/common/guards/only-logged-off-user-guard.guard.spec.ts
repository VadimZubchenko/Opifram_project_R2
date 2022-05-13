import { TestBed } from '@angular/core/testing';

import { OnlyLoggedOffUserGuardGuard } from './only-logged-off-user-guard.guard';

describe('OnlyLoggedOffUserGuardGuard', () => {
  let guard: OnlyLoggedOffUserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyLoggedOffUserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
