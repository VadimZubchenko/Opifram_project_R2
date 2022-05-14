import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../common/models/dialog-data';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})

export class ProductDialogComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.item?.name, Validators.required),
    description: new FormControl(this.data.item?.description, Validators.required),
    price: new FormControl(this.data.item?.price, Validators.required),
    quantity: new FormControl(this.data.item?.quantity, Validators.required),
    image: new FormControl(this.data.item?.image, Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {}

}
