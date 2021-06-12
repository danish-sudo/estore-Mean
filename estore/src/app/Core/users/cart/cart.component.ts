import { Component, OnInit } from '@angular/core';
import Orders from '../../../Shared/models/orders';
import Product from '../../../Shared/models/products';
import {OrdersService} from '../../../Shared/services/orders.service';
import {AuthService} from '../../../Shared/services/auth.service';
import {ProductService} from '../../../Shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolbarService} from '../../../Shared/services/toolbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderForm: FormGroup;
  submitted = false;
   constructor(private os: OrdersService, private route: ActivatedRoute,
               private authService: AuthService,
               private ps: ProductService, private nav: ToolbarService,
               private router: Router,
               private formBuilder: FormBuilder
               ) {
     this.ps
       .getProducts()
       .subscribe((data: Product[]) => {
         this.allProducts = data;
       });
     this.user = JSON.parse(localStorage.getItem('user'));
     this.myArray = Object.values(this.user.products);
     this.price = this.myArray.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
   }
   user: any;
   myArray: any = [];
   price: any;
   orders: Orders[];
   allProducts: Product[];
  obj: Orders;

  private tracking: string;
  private orderStatus: string;
  private checkoutProducts: any;
  private cartProductQuantity: any = 0;

  ngOnInit(): void {
    this.nav.show();
    this.orderForm = this.formBuilder.group({
      Address: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.minLength(11)]]
    });
  }

  minus(id, index) {
     if (this.myArray[index].ProductQuantity > 1) {
       this.incStock(this.myArray[index].Code);
       this.myArray[index].ProductQuantity--;
       this.user.products = this.myArray;

       this.authService.storeUserData(this.user.token, this.user);
       this.authService.updateUser(this.myArray, this.user.id);
       this.price = this.myArray.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
       this.authService.priceSubject.next(this.price);
     }
  }
  plus(id, index){
    this.handleStock(this.myArray[index].Code);

    this.myArray[index].ProductQuantity++;
    this.user.products = this.myArray;
    this.authService.storeUserData(this.user.token, this.user);
    this.authService.updateUser(this.myArray, this.user.id);
    this.price = this.myArray.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
    this.authService.priceSubject.next(this.price);
  }

  deleteProduct(id, index) {

    this.remProduct(this.myArray[index].ProductQuantity, this.myArray[index].Code);
    this.myArray.splice(index, 1);
    this.user.products = this.myArray;
    this.authService.storeUserData(this.user.token, this.user);
    this.authService.updateUser(this.myArray, this.user.id);
    this.authService.cartNumberSubject.next(this.user.products.length);
    this.price = this.myArray.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
    this.authService.priceSubject.next(this.price);

  }

  checkOut(CustomerPhone,
           ShippingAddress) {
    this.submitted = true;
    if (this.orderForm.invalid){
      return;
    }

    const today = new Date();
    this.tracking = this.TrackingID();
    this.orderStatus = 'Pending';
    this.os.createOrder(this.tracking, this.user.name,
      this.user.email, CustomerPhone, today.toDateString(), ShippingAddress,
      this.user.products,
      this.orderStatus,
      this.price);

    this.checkoutProducts = this.user.products;
    this.user.orders.push(this.tracking);
    this.user.products = [];
    this.authService.storeUserData(this.user.token, this.user);

    this.authService.updateOrders(this.user.orders, this.user.id);
    this.authService.updateUser(this.user.products, this.user.id);
    this.authService.cartNumberSubject.next(this.user.products.length);
    this.router.navigate(['orderTrack', this.tracking]);
    this.price = 0;
    this.authService.priceSubject.next(this.price);
  }

  TrackingID() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + '-' + S4() + '-' + S4());
  }

  private handleStock(Code: any) {
    this.ps.getQuantity(Code).subscribe((data: number) => {
      this.cartProductQuantity = data;
      this.cartProductQuantity--;
      this.ps.updateQuantity(this.cartProductQuantity, Code);
    });
  }

  private incStock(Code: any) {
    this.ps.getQuantity(Code).subscribe((data: number) => {
      this.cartProductQuantity = data;
      this.cartProductQuantity++;
      this.ps.updateQuantity(this.cartProductQuantity, Code);
    });
  }

  private remProduct(quantity: any, Code: any) {
    this.ps.getQuantity(Code).subscribe((data: number) => {
      this.cartProductQuantity = data;
      this.cartProductQuantity = this.cartProductQuantity + quantity;
      this.ps.updateQuantity(this.cartProductQuantity, Code);
    });
  }

}
