import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { Product } from '../common/models/product';
import { ConfirmService } from '../common/services/confirm.service';
import { ProductService } from '../common/services/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = 'Tuotteet';

  products$: Observable<Product[]>;
  selectedProduct: Product;

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'id'];

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  onEdit(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Edit, item: this.selectedProduct } })
      .afterClosed()
      .subscribe(save => {
        if (save) {
          console.log('Edit product');
        }
      });
  }

  onDelete(): void {
    this.confirmService
      .confirm(`Haluatko varmasti poistaa tuotteen ${this.selectedProduct.name}?`)
      .subscribe(confirmed => {
        if (confirmed) {
          console.log('Delete:', this.selectedProduct);
        }
      });
  }

  onCreate(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Create } })
      .afterClosed()
      .subscribe(save => {
        if (save) {
          console.log('Create product');
        }
      });
  }

  constructor(public productService: ProductService, private confirmService: ConfirmService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

}
