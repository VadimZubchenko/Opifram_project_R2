import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURI } from 'src/config';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiURI}/product`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${apiURI}/product/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${apiURI}/product`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${apiURI}/product/${product.id}`, product);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${apiURI}/product/${product.id}`);
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term) { return this.getProducts(); }
    return this.http.post<Product[]>(`${apiURI}/product/search`, { term: term });
  }

  constructor(private http: HttpClient, private authService: AuthService) { }
}
