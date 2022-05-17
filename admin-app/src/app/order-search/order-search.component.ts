import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Order } from '../common/models/order';
import { OrderService } from '../common/services/order.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})

export class OrderSearchComponent implements OnInit {

  @Input() orders: Order[];
  @Input() testString: string;

  @Output() orderSearch = new EventEmitter<Observable<Order[]>>();

  searchTerms = new Subject<string>();

  onSearchInput(term: string) {
    this.searchTerms.next(term);
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSearch.emit(this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.orderService.searchOrders(term))
    ));
  }
}
