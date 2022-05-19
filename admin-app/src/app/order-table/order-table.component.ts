import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

export class OrderTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() orders: Order[];
  @Input() errorText: string;
  selectedOrder: Order;
  displayedColumns: string[] = [ 'user', 'createdAt', 'sum', 'status', 'actions'];

  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  setPaginator(): void {
    this.dataSource = new MatTableDataSource<Order>(this.orders);
    this.dataSource.paginator = this.paginator;
  }

  onSelect(order: Order) {
    this.selectedOrder = order;
  }

  onShow(): void {
    this.dialog.open(OrderDialogComponent, { data: { action: DialogOpenAction.Open, item: this.selectedOrder } });
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  onMarkAsSend(): void {
    this.confirmService.confirm('Vahvista tilauksen tilan muutos.')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.orderService.sendOrder(this.selectedOrder).subscribe({
            next: (updatedOrder) => {
              this.orders = this.orders.map(order => order.id === updatedOrder.id ? updatedOrder : order);
              this.setPaginator();
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
              next: (deletedOrder) => {
                this.orders = this.orders.filter(order => order.id !== deletedOrder.id);
                this.setPaginator();
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setPaginator();
  }

  ngOnChanges(): void {
    this.setPaginator();
  }

}
