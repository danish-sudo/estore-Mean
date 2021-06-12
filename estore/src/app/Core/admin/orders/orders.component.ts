import { Component, OnInit } from '@angular/core';
import Orders from '../../../Shared/models/orders';
import {OrdersService} from '../../../Shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Orders[];
  term: string;
  pageOfItems: any;

  constructor(private os: OrdersService){

  }

  ngOnInit(): void {
    this.os
      .getOrder()
      .subscribe((data: Orders[]) => {
        this.orders = data;
      });
  }
  updateStatus(status, id){
    this.os.updateStatus(status, id);
    this.ngOnInit();
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
