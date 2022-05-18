import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Order } from '../common/models/order';
import { OrderService } from '../common/services/order.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})

export class OrderSearchComponent implements OnInit {

  @Output() orderSearch = new EventEmitter<Observable<Order[]>>();
  
  searchInput: string;
  searchTerms: Subject<string> = new Subject<string>();

  onSearchInput(term: string): void {
    this.searchTerms.next(term.trim());
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
