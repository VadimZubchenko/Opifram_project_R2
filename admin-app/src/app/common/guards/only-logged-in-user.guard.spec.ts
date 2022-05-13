import { TestBed } from '@angular/core/testing';

import { OnlyLoggedInUserGuard } from './only-logged-in-user.guard';

describe('OnlyLoggedInUserGuard', () => {
  let guard: OnlyLoggedInUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyLoggedInUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
