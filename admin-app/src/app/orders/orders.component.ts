import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  allOrders: Order[];
  displayedOrders: Order[];

  selectedOrder: Order;

  displayedColumns: string[] = [ 'user', 'createdAt', 'sum', 'status', 'id'];

  onSelect(order: Order) {
    this.selectedOrder = order;
  }

  onSearch(term: string) {
    if (term) {
      term = term.toLowerCase().trim();
      this.displayedOrders = this.allOrders.filter(o => o.user.firstName.toLowerCase().includes(term) || o.user.lastName.toLowerCase().includes(term));
    } else {
      this.displayedOrders = this.allOrders;
    }
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
              this.refreshOrders();
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
                this.refreshOrders();
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

  refreshOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.allOrders = orders;

        //Displayed orders might differ from allOrders, so if allOrders gets updated, update also displayed orders
        const updatedDisplayedOrders: Order[] = [];

        for (const order of orders) {
          for (const displayedOrder of this.displayedOrders) {
            if (order.id === displayedOrder.id) {
              updatedDisplayedOrders.push({ ...order });
            }
          }
        }
        this.displayedOrders = updatedDisplayedOrders;
      }
    });
  }

  initOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.displayedOrders = orders;
      }
    });
  }

  constructor(public orderService: OrderService, private confirmService: ConfirmService, private snackbarService: SnackbarService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.initOrders();
  }

}
