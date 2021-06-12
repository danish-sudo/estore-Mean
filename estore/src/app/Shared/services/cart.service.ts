import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  uri = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) { }
  addCart(Product, User){
    const obj = {
      Product,
      User,
    };
    console.log(obj);
    this.http
      .post(`${this.uri}/add`, obj)
      .subscribe((res) => console.log('Done'));
  }
  getCart(){
    return this.http.get(`${this.uri}`);
  }

  editCart(id){
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  deleteCart(id){
    return this.http.get(`${this.uri}/delete/${id}`);
  }
  updateCart(Product, User, id){
    const obj = {
      Product,
      User,
    };
    this.http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe((res) => console.log('Done'));
  }

}
