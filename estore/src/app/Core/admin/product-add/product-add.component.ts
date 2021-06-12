import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../Shared/services/product.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  angForm: FormGroup;
  private images: any;
  private image2: any;
  private imagePath: any;
  private imagePath2: any;

  constructor(private fb: FormBuilder, private ps: ProductService, private http: HttpClient) {
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
  addProduct(Code, productName, productCat, productDis, ProductPrice, ProductQuantity, ProductSize, productColor, productManu) {

    const admin = JSON.parse(localStorage.getItem('admin'));
    const today = new Date();
    this.ps.addProducts(Code, productName, productCat, productDis, ProductPrice,
      ProductQuantity, admin.username, today.toDateString(), this.imagePath, this.imagePath2
      , ProductSize, productColor, productManu
    );
    alert('Product Added');
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
  ngOnInit() {
  }

  selectImage2(event) {
    if (event.target.files.length > 0) {
      this.image2 = event.target.files[0];
    }
    const formData = new FormData();
    formData.append('file', this.image2);
    this.http.post<any>('http://localhost:3000/users/file', formData).subscribe(
      (res) => {
        console.log(res);
        this.imagePath2 = res.filename;

      }, (err) => console.log(err)
    );
  }
}
