import { TestBed } from '@angular/core/testing';

import { UnknownRouteGuardGuard } from './unknown-route-guard.guard';

describe('UnknownRouteGuardGuard', () => {
  let guard: UnknownRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnknownRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
