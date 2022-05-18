import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UnknownRouteGuardGuard } from './unknown-route-guard.guard';

describe('UnknownRouteGuardGuard', () => {
  let guard: UnknownRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, Router]
    });
    guard = TestBed.inject(UnknownRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
