import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { OnlyLoggedOffUserGuardGuard } from './only-logged-off-user-guard.guard';

describe('OnlyLoggedOffUserGuardGuard', () => {
  let guard: OnlyLoggedOffUserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, Router, HttpHandler]
    });
    guard = TestBed.inject(OnlyLoggedOffUserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
