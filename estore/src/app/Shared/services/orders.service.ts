import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Orders from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  uri = 'http://localhost:3000/orders';
  localUser = JSON.parse(localStorage.getItem('user'));

  constructor(private http: HttpClient) { }
  createOrder(TrackingID,
              CustomerName,
              CustomerEmail,
              CustomerPhone,
              orderDate,
              ShippingAddress,
              products,
              orderStatus,
              Total){
    const obj = {
      TrackingID,
      CustomerName,
      CustomerEmail,
      CustomerPhone,
      orderDate,
      ShippingAddress,
      products,
      orderStatus,
      Total,
    };
    this.http
      .post(`${this.uri}/add`, obj)
      .subscribe((res: Orders) => {

      });

  }
  getOrder(){
    return this.http.get(`${this.uri}`);
  }

  editOrder(id){
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  deleteOrder(id){
    return this.http.get(`${this.uri}/delete/${id}`);
  }
  updateStatus(orderStatus, id){
    const obj = {
      orderStatus
    };
    this.http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe((res) => console.log('Done'));
  }

  getByTracking(id: any) {
    return this.http.get(`${this.uri}/tracking/${id}`);
  }
}
