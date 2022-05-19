import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Order } from '../common/models/order';
import { OrderService } from '../common/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  title = 'Tilaukset';
  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  errorText: string;

  onSearch(orders: Observable<Order[]>) {
    orders.subscribe(foundOrders => this.orders = foundOrders);
  }

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    localStorage.setItem('tabIndex', '0');
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: () => {
        this.orders = [];
        this.errorText = 'Tietoja ei voitu hakea.';
      }
    });
  }

}
