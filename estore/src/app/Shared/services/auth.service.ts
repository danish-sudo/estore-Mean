import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AdminPage: boolean;
  authToken: any;
  user: any;
  adminAuthToken: any;
  admin: any;
  uri = 'http://localhost:3000/users';
  auri = 'http://localhost:3000/admin';

  public cartNumberSubject = new BehaviorSubject<number>(0);
  public cartNumber = this.cartNumberSubject.asObservable();
  public userSubject = new BehaviorSubject<string>(null);
  public userInfo = this.userSubject.asObservable();
  public priceSubject = new BehaviorSubject<number>(0);
  public price = this.priceSubject.asObservable();
  public uimgSubject = new BehaviorSubject<string>(null);
  public uimg = this.uimgSubject.asObservable();
  constructor(private http: HttpClient) {
  }


  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.uri + '/register', user, {headers})
      .pipe(map((res) => res));
  }
  getAllUsers(){
    return this.http.get(`${this.uri}/getAll`);
  }

  userUpdateName(name, userImage, id) {
    const obj = {
      name,
      userImage
    };
    this.http
      .post(`${this.uri}/etname/${id}`, obj)
      .subscribe((res) => console.log('Updated'));
  }

  updateOrders(orders, id) {
    const obj = {
      orders
    };
    this.http
      .post(`${this.uri}/orders/${id}`, obj)
      .subscribe((res) => console.log('Updated'));
  }

  updateUser(products, id) {
    const obj = {
      products
    };
    this.http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe((res) => console.log('Updated'));
  }

  email_exists(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.uri + '/check_email', user, {headers})
      .pipe(map((res) => res));

  }

  registerAdmin(admin) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.auri + '/register', admin, {headers})
      .pipe(map((res) => res));
  }

  authUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.uri + '/auth', user, {headers})
      .pipe(map((res) => res));
  }

  authAdmin(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.auri + '/auth', user, {headers})
      .pipe(map((res) => res));
  }

  storeAdminData(token, admin) {
    localStorage.setItem('aid_token', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.adminAuthToken = token;
    this.admin = admin;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('id_token');
    this.user = null;
    localStorage.removeItem('user');
  }

  adminLogout() {
    this.adminAuthToken = null;
    localStorage.removeItem('aid_token');
    this.admin = null;
    localStorage.removeItem('admin');

  }

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }

  isAdminLoggedIn() {
    return localStorage.getItem('admin') != null;
  }

  getCartValue(): Observable<number> {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null && this.user.products != null) {
      const myArray = Object.values(this.user.products);
      const cart = myArray.length;
      this.cartNumberSubject.next(cart);
    }
    return this.cartNumber;
  }
  getCartPrice(): Observable<number>{
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null) {
      const myArray = this.user.products;
      const pr = myArray.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
      this.priceSubject.next(pr);
    }
    return this.price;
  }
  getUserInfo(): Observable<string>{
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null){
      const name = this.user.name;
      this.userSubject.next(name);
    }
    return this.userInfo;
  }
  getImg(): Observable<string>{
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null){
      const img = this.user.userImage;
      this.uimgSubject.next(img);
    }
    return this.uimg;
  }

  isAdminPage() {
    return this.AdminPage;
  }
  deleteUser(id){
    return this.http.get(`${this.uri}/delete/${id}`);
  }
}
