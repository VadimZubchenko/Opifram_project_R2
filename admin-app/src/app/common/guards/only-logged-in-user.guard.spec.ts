import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { OnlyLoggedInUserGuard } from './only-logged-in-user.guard';

describe('OnlyLoggedInUserGuard', () => {
  let guard: OnlyLoggedInUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, Router, HttpHandler]
    });
    guard = TestBed.inject(OnlyLoggedInUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
