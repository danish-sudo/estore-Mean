import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {NavbarComponent} from './Core/users/navbar/navbar.component';
import {LoginComponent} from './Core/users/login/login.component';
import {RegisterComponent} from './Core/users/register/register.component';
import {HomeComponent} from './Core/users/home/home.component';
import {CartComponent} from './Core/users/cart/cart.component';
import {AboutComponent} from './Core/users/about/about.component';
import {ProductviewComponent} from './Core/users/productview/productview.component';
import {UserProfileComponent} from './Core/users/user-profile/user-profile.component';
import {OrderTrackComponent} from './Core/users/order-track/order-track.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ValidateService} from './Shared/services/validate.service';
import {AuthService} from './Shared/services/auth.service';
import {ProductService} from './Shared/services/product.service';
import {AdminModule} from './Core/admin/admin.module';
import {ToolbarService} from './Shared/services/toolbar.service';
import { FooterComponent } from './Core/users/footer/footer.component';
import { CategoryComponent } from './Core/users/category/category.component';
import { NotFoundComponent } from './Core/users/not-found/not-found.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';


@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    AboutComponent,
    ProductviewComponent,
    UserProfileComponent,
    OrderTrackComponent,
    FooterComponent,
    CategoryComponent,
    NotFoundComponent,

  ],
  imports: [
    SlimLoadingBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule, ReactiveFormsModule, AdminModule

  ],
  providers: [ValidateService, AuthService, ProductService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
