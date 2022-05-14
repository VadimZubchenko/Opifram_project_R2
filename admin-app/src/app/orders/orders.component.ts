import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { Order } from '../common/models/order';
import { ConfirmService } from '../common/services/confirm.service';
import { OrderService } from '../common/services/order.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  selectedOrder: Order;

  displayedColumns: string[] = ['user', 'status', 'sum', 'createdAt', 'id'];

  onSelect(order: Order) {
    this.selectedOrder = order;
  }

  onShow(): void {
    this.dialog.open(OrderDialogComponent, { data: { action: DialogOpenAction.Open, item: this.selectedOrder } });
  }

  onEdit(): void {
    this.dialog
      .open(OrderDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Edit, item: this.selectedOrder } })
      .afterClosed()
      .subscribe((data: Order) => {
        if (data) {
          this.orderService.updateOrder(data).subscribe({
            next: () => {
              this.getOrders();
              this.snackbarService.show('Tilauksen muokkaaminen onnistui.');
            },
            error: (e) => {
              console.error(e);
              this.snackbarService.show('Tilauksen muokkaaminen epäonnistui.');
            }
          });
        }
      });
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

  constructor(private orderService: OrderService, private confirmService: ConfirmService, private snackbarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrders();
  }

}
