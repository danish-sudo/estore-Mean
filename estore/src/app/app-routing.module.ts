import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './Core/users/home/home.component';
import {LoginComponent} from './Core/users/login/login.component';
import {RegisterComponent} from './Core/users/register/register.component';
import {UserProfileComponent} from './Core/users/user-profile/user-profile.component';
import {AuthGuard} from './auth.guard';
import {OrderTrackComponent} from './Core/users/order-track/order-track.component';
import {ProductviewComponent} from './Core/users/productview/productview.component';
import {AdminModule} from './Core/admin/admin.module';
import {CartComponent} from './Core/users/cart/cart.component';
import {AboutComponent} from './Core/users/about/about.component';
import {CategoryComponent} from './Core/users/category/category.component';
import {NotFoundComponent} from "./Core/users/not-found/not-found.component";



let routes: Routes;
routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'userProfile/:id',
    component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'orderTrack/:id',
    component: OrderTrackComponent
  },
  {
    path: 'product/:id',
    component: ProductviewComponent
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,

  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'category/:id', pathMatch: 'full',
    component: CategoryComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
