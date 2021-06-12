import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../Shared/services/auth.service';
import {ToolbarService} from '../../../Shared/services/toolbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  submitted = false;
  error = false;
  private user: any;
  private price: any;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router, private nav: ToolbarService
    ) {
    this.LoginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
    this.nav.hide();
  }
  get f() { return this.LoginForm.controls; }

  onLogin(uname, upass){
    this.submitted = true;

    // stop here if form is invalid
    if (this.LoginForm.invalid) {
      return;
    }

    const user = {
      username: uname,
      password: upass,
       };
    this.authService.authUser(user).subscribe((data: any) => {
        if (data.success){
          this.authService.storeUserData(data.token, data.user);
          this.user = JSON.parse(localStorage.getItem('user'));
          this.authService.userSubject.next(this.user.name);
          this.authService.uimgSubject.next(this.user.userImage);
          this.price = this.user.products.reduce((prev, cur) => prev + (cur.ProductPrice * cur.ProductQuantity), 0);
          this.authService.priceSubject.next(this.price);
          this.authService.cartNumberSubject.next(this.user.products.length);

          this.router.navigate(['category', 'All Products']);
        }
        else{
          this.error = true;
        }
      });
  }

}
