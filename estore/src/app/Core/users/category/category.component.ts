import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import Product from '../../../Shared/models/products';
import {ProductService} from '../../../Shared/services/product.service';
import {ToolbarService} from '../../../Shared/services/toolbar.service';
import {AuthService} from '../../../Shared/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  products: Product[];
  Prod: Product[] = [];
  term: any;
  cat: any;
  user: any;
  inCart = false;
  private price: any;
  private cartProductQuantity: any = 0;

  constructor(private router: Router, private ps: ProductService,
              private nav: ToolbarService,
              private as: AuthService, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ps
        .getProducts()
        .subscribe((data: Product[]) => {
          this.products = data;
          this.cat = params.id;
          if (!(params.id == 'All Products')) {
            this.Prod = [];
            for (const item of this.products) {
              if (item.ProductCat == params.id) {
                this.Prod.push(item);
              }
            }
          } else {
            this.Prod = this.products;
          }
        });
    });

    this.user = JSON.parse(localStorage.getItem('user'));
    this.nav.show();
  }

  addToCart(product: Product) {
    this.ps.addToCart(product);
    this.ngOnInit();
  }
}
