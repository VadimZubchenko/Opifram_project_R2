import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Product } from '../common/models/product';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})

export class ProductSearchComponent implements OnInit {

  @Output() productSearch = new EventEmitter<Observable<Product[]>>();
  searchTerms: Subject<string> = new Subject<string>();

  onSearchInput(term: string): void {
    this.searchTerms.next(term.trim());
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productSearch.emit(this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.searchProducts(term))
    ));
  }
}
