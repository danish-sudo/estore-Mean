import { Component, OnInit } from '@angular/core';
import Orders from "../../../Shared/models/orders";
import User from "../../../Shared/models/user";
import {AdminGuard} from "../admin.guard";
import {ProductService} from "../../../Shared/services/product.service";
import {OrdersService} from "../../../Shared/services/orders.service";
import {AuthService} from "../../../Shared/services/auth.service";
import Product from "../../../Shared/models/products";
import {Router} from "@angular/router";
import {ToolbarService} from "../../../Shared/services/toolbar.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin: any;
  products: Product[];
  orders: Orders[];
  users: User[];
  len: number;
  olen: number;
  ousers: number;
  prod: Product[];
  or: any;
   u: any;

  constructor(private ps: ProductService,
              private router: Router,
              private os: OrdersService,
              private authService: AuthService,
  ) {
    this.ps
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        this.len = this.products.length;
        this.prod = this.products.slice(0, 6);

      });
    this.os
      .getOrder()
      .subscribe((data: Orders[]) => {
        this.orders = data;
        this.olen = this.orders.length;
        this.or = this.orders.slice(0, 6);
      });
    this.authService
      .getAllUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        this.ousers = this.users.length;
        this.u = this.users.slice(0, 6);

      });

  }

  ngOnInit(): void {
  }

}
