import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURI } from 'src/config';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authService.getToken() })
  };

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${apiURI}/order`, this.httpOptions);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${apiURI}/order/${id}`, this.httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${apiURI}/order/${order.id}`, order, this.httpOptions);
  }

  deleteOrder(order: Order): Observable<Order> {
    return this.http.delete<Order>(`${apiURI}/order/${order.id}`, this.httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) { }
}
