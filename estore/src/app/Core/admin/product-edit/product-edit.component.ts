import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../Shared/services/product.service';
import {HttpClient} from '@angular/common/http';
import Product from '../../../Shared/models/products';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  angForm: FormGroup;
  private images: any;
  private image2: any;
  private imagePath: any;
  private imagePath2: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private ps: ProductService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Code: ['', Validators.required],
      productName: ['', Validators.required ],
      productCat: ['', Validators.required ],
      productDis: ['', Validators.required ],
      productPrice: ['', Validators.required ],
      productQuantity: ['', Validators.required],
      productImage: ['', Validators.required],
      productImage2: ['', Validators.required],
      productSize: ['', Validators.required ],
      productColor: ['', Validators.required ],
      productManu: ['', Validators.required ],
    });
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files[0];
    }
    const formData = new FormData();
    formData.append('file', this.images);
    this.http.post<any>('http://localhost:3000/users/file', formData).subscribe(
      (res) => {
        console.log(res);
        this.imagePath = res.filename;
      }, (err) => console.log(err)
    );
  }
  selectImage2(event) {
    if (event.target.files.length > 0) {
      this.image2 = event.target.files[0];
    }
    const formData = new FormData();
    formData.append('file', this.image2);
    this.http.post<any>('http://localhost:3000/users/file', formData).subscribe(
      (res) => {
        this.imagePath2 = res.filename;

      }, (err) => console.log(err)
    );
  }
  updateProduct(Code, productName, productCat, productDis, ProductPrice, ProductQuantity, ProductSize, productColor, productManu) {
    const today = new Date();
    this.route.params.subscribe(params => {
      this.ps.updateProduct(Code, productName, productCat, productDis, ProductPrice,
        ProductQuantity, this.product.AddedBy, today.toDateString(), this.imagePath, this.imagePath2
        , ProductSize, productColor, productManu, params.id);
      this.router.navigate(['/admin/products']);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editProducts(params.id).subscribe((res: Product) => {
        this.product = res;
      });
    });
  }
}
