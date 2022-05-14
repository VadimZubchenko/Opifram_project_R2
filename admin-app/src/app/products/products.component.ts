import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
    //TODO: Edit product
    console.log('Edit:', this.selectedProduct);
    this.dialog
      .open(ProductDialogComponent, { data: { action: 'edit', item: this.selectedProduct } })
      .afterClosed()
      .subscribe(result => console.log('Result:', result));
  }

  onDelete(): void {
    //TODO: Delete product
    this.confirmService.confirm(`Haluatko varmasti poistaa tuotteen ${this.selectedProduct.name}?`)
      .subscribe(confirmed => {
        if (confirmed) {
          console.log('Delete:', this.selectedProduct);
        }
      });
  }

  onCreate(): void {
    //TODO: Create new product
    console.log('Create new product');
    this.dialog
      .open(ProductDialogComponent, { data: { action: 'create' } })
      .afterClosed().subscribe(result => console.log('Result', result));
  }

  constructor(public productService: ProductService, private confirmService: ConfirmService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

}
