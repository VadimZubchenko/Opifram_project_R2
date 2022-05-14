import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../common/models/dialog-data';
import { Order } from '../common/models/order';
import { OrderStatus } from '../common/models/order-status';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  order = this.data.item as Order;
  orderStatus: OrderStatus[] = Object.values(OrderStatus);

  orderForm: FormGroup = new FormGroup({
    status: new FormControl(this.order?.status, Validators.required),
    id: new FormControl(this.order?.id)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
