import { TestBed } from '@angular/core/testing';

import { OrderTableService } from './order-table.service';

describe('OrderTableService', () => {
  let service: OrderTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
