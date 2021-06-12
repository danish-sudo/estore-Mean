import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Product from '../models/products';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://localhost:3000/products';
  user: any;
  inCart = false;
  private price: any;
  private cartProductQuantity: any = 0;

  constructor(private http: HttpClient, private as: AuthService) {
  }
  addProducts(Code, ProductName, ProductCat , ProductDis, ProductPrice,
              ProductQuantity, AddedBy, DateAdded, ImagePath, ImagePath2, Size,
              Color, Manufacturer){
    const obj = {
      Code,
      ProductName,
      ProductCat,
      ProductDis,
      ProductPrice,
      ProductQuantity,
      AddedBy,
      DateAdded,
      ImagePath,
      ImagePath2,
      Size,
      Color,
      Manufacturer
    };
    console.log(obj.ImagePath);
    this.http
    .post(`${this.uri}/add`, obj)
    .subscribe((res) => console.log('Done'));
  }

  getProducts(){
    return this.http.get(`${this.uri}`);
  }

  editProducts(id){
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  deleteProduct(id){
    return this.http.get(`${this.uri}/delete/${id}`);
  }
  updateProduct(Code, ProductName, ProductCat , ProductDis, ProductPrice,
                ProductQuantity, AddedBy, DateAdded, ImagePath, ImagePath2, Size,
                Color, Manufacturer, id){
    const obj = {
      Code,
      ProductName,
      ProductCat,
      ProductDis,
      ProductPrice,
      ProductQuantity,
      AddedBy,
      DateAdded,
      ImagePath,
      ImagePath2,
      Size,
      Color,
      Manufacturer
    };
    this.http
    .post(`${this.uri}/update/${id}`, obj)
    .subscribe((res) => console.log('Done'));
  }

  updateQuantity(ProductQuantity: number, id: any) {
    const obj = {
      ProductQuantity
    };
    this.http
      .post(`${this.uri}/updateQuantity/${id}`, obj)
      .subscribe((res) => console.log('Updated Quantity'));

  }
  getQuantity(id){
   return this.http.get(`${this.uri}/quantity/${id}`);
  }
  addToCart(product: Product) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.handleStock(product.Code);
    if (this.as.isLoggedIn()){
      for (const item of this.user.products) {
        if (item.Code === product.Code) {
          item.ProductQuantity++;
          this.inCart = true;
        }
      }
      if (!this.inCart){
        const newProd = product;
        newProd.ProductQuantity = 1;
        this.user.products.push(newProd);
      }
      this.as.storeUserData(this.user.token, this.user);
      this.as.updateUser(this.user.products, this.user.id);
      this.as.cartNumberSubject.next(this.user.products.length);
      this.price = this.user.products.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
      this.as.priceSubject.next(this.price);
      this.inCart = false;
    }
    else {
      alert('Please Login');
    }
  }
  private handleStock(Code: any) {
    this.getQuantity(Code).subscribe((data: number) => {
      this.cartProductQuantity = data;
      this.cartProductQuantity--;
      this.updateQuantity(this.cartProductQuantity, Code);
    });
  }
}
