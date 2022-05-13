import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURI, baseHttpOptions } from 'src/config';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiURI}/product`, baseHttpOptions);
  };

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${apiURI}/product/${id}`, baseHttpOptions);
  };

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${apiURI}/product`, product, baseHttpOptions);
  };

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${apiURI}/product/${product.id}`, baseHttpOptions);
  };

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${apiURI}/product/${product.id}`, baseHttpOptions);
  };

  constructor(private http: HttpClient) { }
}
