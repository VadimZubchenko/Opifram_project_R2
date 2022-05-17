import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { Order } from '../common/models/order';
import { ConfirmService } from '../common/services/confirm.service';
import { OrderService } from '../common/services/order.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  @Input() orders: Order[];
  selectedOrder: Order;
  displayedColumns: string[] = [ 'user', 'createdAt', 'sum', 'status', 'id'];

  onSelect(order: Order) {
    this.selectedOrder = order;
  }

  onShow(): void {
    this.dialog.open(OrderDialogComponent, { data: { action: DialogOpenAction.Open, item: this.selectedOrder } });
  }

  onMarkAsSend(): void {
    this.confirmService.confirm('Vahvista tilauksen tilan muutos.')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.orderService.sendOrder(this.selectedOrder).subscribe({
            next: () => {
              //this.getOrders();
              this.snackbarService.show('Tilauksen tilan muuttaminen onnistui.');
            },
            error: (e) => {
              console.error(e);
              this.snackbarService.show('Tilauksen tilan muuttaminen epäonnistui.');
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
                //this.getOrders();
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

  constructor(public orderService: OrderService, private confirmService: ConfirmService, private snackbarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
