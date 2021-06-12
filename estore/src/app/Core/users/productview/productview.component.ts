import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {ProductService} from '../../../Shared/services/product.service';
import Product from '../../../Shared/models/products';
import {ToolbarService} from '../../../Shared/services/toolbar.service';


@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public ps: ProductService,
              private nav: ToolbarService
  ) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {

    this.nav.show();
    this.route.params.subscribe(params => {
      this.ps.editProducts(params.id).subscribe((res: Product) => {
        this.product = res;
      });
    });
  }

  addToCart(product: Product) {
    this.ps.addToCart(product);
    this.ngOnInit();
  }
}
