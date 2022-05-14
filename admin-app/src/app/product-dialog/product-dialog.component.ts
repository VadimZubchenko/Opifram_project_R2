import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../common/models/dialog-data';
import { Product } from '../common/models/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})

export class ProductDialogComponent implements OnInit {

  product = this.data.item as Product;

  productForm: FormGroup = new FormGroup({
    name: new FormControl(this.product?.name, Validators.required),
    description: new FormControl(this.product?.description, Validators.required),
    category: new FormControl(this.product?.category, Validators.required),
    price: new FormControl(this.product?.price, Validators.required),
    quantity: new FormControl(this.product?.quantity, Validators.required),
    image: new FormControl(this.product?.image, Validators.required),
    id: new FormControl(this.product?.id)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {}

}
