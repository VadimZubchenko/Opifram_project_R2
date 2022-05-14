import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/models/order';
import { ConfirmService } from '../common/services/confirm.service';
import { OrderService } from '../common/services/order.service';
import { SnackbarService } from '../common/services/snackbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  title = 'Tilaukset';

  orders$: Observable<Order[]>;
  selectedOrder: Order;

  displayedColumns: string[] = ['user', 'status', 'sum', 'createdAt', 'id'];

  onSelect(order: Order) {
    this.selectedOrder = order;
  }

  onDelete(): void {
    this.confirmService.confirm('Vahvista tilauksen poistaminen.')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.orderService.deleteOrder(this.selectedOrder)
            .subscribe({
              next: () => {
                this.getOrders();
                this.snackbarService.show('Tilauksen poistaminen onnistui.');
              },
              error: (e) => {
                this.snackbarService.show('Tilauksen poistaminen epäonnistui.');
                console.error(e);
              }
            });
        }
      });
  }

  getOrders(): void {
    this.orders$ = this.orderService.getOrders();
  }

  constructor(private orderService: OrderService, private confirmService: ConfirmService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getOrders();
  }

}
