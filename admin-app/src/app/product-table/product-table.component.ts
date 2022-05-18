import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { Product } from '../common/models/product';
import { ConfirmService } from '../common/services/confirm.service';
import { ProductService } from '../common/services/product.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() products: Product[];
  selectedProduct: Product;
  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'actions'];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  setPaginator(): void {
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
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
            next: (updatedProduct) => {
              this.products = this.products.map(product => product.id === updatedProduct.id ? updatedProduct : product);
              this.setPaginator();
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
            next: (deletedProduct) => {
              this.products = this.products.filter(product => product.id !== deletedProduct.id);
              this.setPaginator();
              this.snackbarService.show('Tuotteen poistaminen onnistui.');
            },
            error: (e) => {
              this.snackbarService.show('Tuotteen poistaminen epäonnistui.');
              console.error(e);
            }
          });
        }
      });
  }

  constructor(private productService: ProductService, private confirmService: ConfirmService, private snackbarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setPaginator();
  }

  ngOnChanges(): void {
    this.setPaginator();
  }

}
