import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { Product } from '../common/models/product';
import { ProductService } from '../common/services/product.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  title = 'Tuotteet';
  products: Product[];

  onSearch(foundProducts: Observable<Product[]>): void {
    foundProducts.subscribe(products => this.products = products);
  }

  onCreate(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Create } })
      .afterClosed()
      .subscribe((data: Product) => {
        if (data) {
          this.productService.createProduct(data).subscribe({
            next: () => {
              this.productService.getProducts().subscribe(products => this.products = products);
              this.snackbarService.show('Tuotteen lisääminen onnistui.');
            },
            error: (e) => {
              this.snackbarService.show('Tuotteen poistaminen epäonnistui.');
              console.error(e);
            }
          });
        }
      });
  }

  constructor(public productService: ProductService, private dialog: MatDialog, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
