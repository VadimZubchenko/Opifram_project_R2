import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { Product } from '../common/models/product';
import { ConfirmService } from '../common/services/confirm.service';
import { ProductService } from '../common/services/product.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'id'];

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  onEdit(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Edit, item: this.selectedProduct } })
      .afterClosed()
      .subscribe((data: Product) => {
        if (data) {
          this.productService.updateProduct(data).subscribe({
            next: () => {
              this.getProducts();
              this.snackbarService.show('Tuotteen muokkaaminen onnistui.');
            },
            error: (e) => {
              this.snackbarService.show('Tuotteen muokkaaminen epäonnistui.');
              console.error(e);
            }
          });
        }
      });
  }

  onDelete(): void {
    this.confirmService
      .confirm('Vahvista tuotteen poistaminen.')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.productService.deleteProduct(this.selectedProduct).subscribe({
            next: () => {
              this.getProducts();
              this.snackbarService.show('Tuotteen poistaminen onnistui.');
            },
            error: (e) => {
              this.getProducts();
              this.snackbarService.show('Tuotteen poistaminen epäonnistui.');
              console.error(e);
            }
          });
        }
      });
  }

  onCreate(): void {
    this.dialog
      .open(ProductDialogComponent, { disableClose: true, data: { action: DialogOpenAction.Create } })
      .afterClosed()
      .subscribe((data: Product) => {
        if (data) {
          this.productService.createProduct(data).subscribe({
            next: () => {
              this.getProducts();
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

  constructor(public productService: ProductService, private confirmService: ConfirmService, public dialog: MatDialog, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getProducts();
  }

}
