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

  getProducts(): void {
    this.products$ = this.productService.getProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  onEdit(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Edit, item: this.selectedProduct } })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.productService.updateProduct(data).subscribe(() => this.getProducts());
        }
      });
  }

  onDelete(): void {
    this.confirmService
      .confirm(`Haluatko varmasti poistaa tuotteen ${this.selectedProduct.name}?`)
      .subscribe(confirmed => {
        if (confirmed) {
          this.productService.deleteProduct(this.selectedProduct).subscribe(() => this.getProducts());
        }
      });
  }

  onCreate(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Create } })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.productService.createProduct(data).subscribe(() => this.getProducts());
        }
      });
  }

  constructor(public productService: ProductService, private confirmService: ConfirmService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

}
