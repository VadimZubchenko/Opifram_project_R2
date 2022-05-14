import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../common/models/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})

export class ProductDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { action: string, item: Product | undefined }) { }

  ngOnInit(): void {
  }

}
