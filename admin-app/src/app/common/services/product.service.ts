import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURI } from 'src/config';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authService.getToken() })
  };

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiURI}/product`, this.httpOptions);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${apiURI}/product/${id}`, this.httpOptions);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${apiURI}/product`, product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${apiURI}/product/${product.id}`, product, this.httpOptions);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${apiURI}/product/${product.id}`, this.httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) { }
}
