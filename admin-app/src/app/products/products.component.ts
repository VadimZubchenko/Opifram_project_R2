import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/models/product';
import { ConfirmService } from '../common/services/confirm.service';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title = 'Tuotteet';
  products$: Observable<Product[]>;
  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'id'];

  selectedProduct: Product;

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  onEdit(): void {
    //TODO: Delete product
    console.log('Edit:', this.selectedProduct);
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
  }

  constructor(public productService: ProductService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

}
