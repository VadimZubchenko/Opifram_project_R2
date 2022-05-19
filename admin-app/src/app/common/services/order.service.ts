import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderStatus } from '../models/order-status';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.API_URI}/order`);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.API_URI}/order/${id}`);
  }

  sendOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.API_URI}/order/send/${order.id}`, {});
  }

  deleteOrder(order: Order): Observable<Order> {
    return this.http.delete<Order>(`${environment.API_URI}/order/${order.id}`);
  }

  searchOrders(term: string): Observable<Order[]> {
    if (!term) { return this.getOrders(); }
    return this.http.post<Order[]>(`${environment.API_URI}/order/search`, { term: term });
  }

  formatStatus(status: OrderStatus): string { 
    switch(status) {
    case OrderStatus.SENT:
      return 'Lähetetty';
    case OrderStatus.WaitingForShipment:
      return 'Odottaa lähetystä';
    }
  }

  constructor(private http: HttpClient, private authService: AuthService) { }
}
