import { Component, OnInit } from '@angular/core';
import {ToolbarService} from '../../../Shared/services/toolbar.service';
import {AuthService} from '../../../Shared/services/auth.service';
import Product from '../../../Shared/models/products';
import {ProductService} from '../../../Shared/services/product.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: any;
  private price: any;
  products: Product[];
  menProd: any = [];
  kidsProds: any = [];
  womenProd: any = [];
  featured: any = [];

  constructor(private router: Router, private nav: ToolbarService, private ps: ProductService, private as: AuthService) {
    this.nav.show();
    if (this.as.isLoggedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.as.userSubject.next(this.user.name);
      this.as.uimgSubject.next(this.user.userImage);
      this.price = this.user.products.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
      this.as.priceSubject.next(this.price);
      this.as.cartNumberSubject.next(this.user.products.length);

    }
  }

  ngOnInit(): void {
    this.ps
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        this.featured = this.shuffle(this.products);
        this.featured = this.featured.slice(0, 3);

        for (const item of this.products){
          if (item.ProductCat == 'Men' && item.ProductQuantity > 0) {
            this.menProd.push(item);
            this.menProd = this.menProd.slice(0, 4);
          }
          if (item.ProductCat == 'Women' && item.ProductQuantity > 0 ) {
            this.womenProd.push(item);
            this.womenProd = this.womenProd.slice(0, 4);

          }
          if (item.ProductCat == 'Kids' && item.ProductQuantity > 0) {
            this.kidsProds.push(item);
            console.log(this.kidsProds);
            this.kidsProds = this.kidsProds.slice(0, 4);
          }
        }
      });
  }
   shuffle(arra1) {
    let ctr = arra1.length, temp, index;

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }


  addToCart(product: Product) {
    this.ps.addToCart(product);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
