import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../Shared/services/product.service';
import Product from '../../../Shared/models/products';
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  term: string;
  products: Product[];
   pageOfItems: Array<any>;

  constructor(private router: Router, private ps: ProductService) { }

  ngOnInit() {
    this.ps
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
  deleteProduct(id, index) {
    this.ps.deleteProduct(id).subscribe(res => {
      this.products.splice(index, 1);
      this.ngOnInit();
    });
  }
}
