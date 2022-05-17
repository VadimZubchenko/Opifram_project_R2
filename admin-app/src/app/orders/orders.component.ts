import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/models/order';
import { OrderService } from '../common/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  orders: Order[];
  selectedOrder: Order;

  onOrderSearch(orders: Observable<Order[]>) {
    orders.subscribe(foundOrders => this.orders = foundOrders);
  }

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }
}
