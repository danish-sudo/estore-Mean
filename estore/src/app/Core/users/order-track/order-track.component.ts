import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Orders from "../../../Shared/models/orders";
import Product from "../../../Shared/models/products";
import {OrdersService} from "../../../Shared/services/orders.service";
import {AuthService} from "../../../Shared/services/auth.service";
import {ToolbarService} from "../../../Shared/services/toolbar.service";


@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit {
   orders: Orders;
  mydate: string;
   ShippingAddress: string;
   CustomerEmail: string;
   CustomerName: string;
   CustomerPhone: string;
  products: Product[];
   TrackingID: string;
   orderStatus: string;
   Total: number;
  pen: any = 'step';
  pc: any = 'step';
  ow: any = 'step';
  r: any = 'step';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private os: OrdersService,
              private as: AuthService,
              private nav: ToolbarService) { }

  ngOnInit(): void {
    this.nav.show();
    this.route.params.subscribe(params => {
      this.os.getByTracking(params.id).subscribe((res: Orders ) => {
        this.mydate = res.orderDate;
        this.CustomerEmail = res.CustomerEmail;
        this.CustomerName = res.CustomerName;
        this.CustomerPhone = res.CustomerPhone;
        this.products = res.products;
        this.TrackingID = res.TrackingID;
        this.orderStatus = res.orderStatus;
        this.Total = res.Total;
        this.ShippingAddress = res.ShippingAddress;
        this.getOrderStatus();

      });
    });
  }
  getOrderStatus() {

    if (this.orderStatus === 'Pending') {
      this.pen = 'step active';
    } else if (this.orderStatus === 'Picked by courier') {
      this.pc = 'step active';
    } else if (this.orderStatus === 'On the way') {
      this.ow = 'step active';
    } else if (this.orderStatus === 'Received'){
      this.r = 'step active';
    }
  }
}
