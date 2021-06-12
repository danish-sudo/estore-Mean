import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductAddComponent} from './product-add/product-add.component';
import {AdminregisterComponent} from './adminregister/adminregister.component';
import {AdminGuard} from './admin.guard';
import {AdminloginComponent} from './adminlogin/adminlogin.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductGetComponent} from './product-get/product-get.component';
import {CustomersComponent} from './customers/customers.component';
import {OrdersComponent} from './orders/orders.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'products/add',
    component: ProductAddComponent, canActivate: [AdminGuard]
  },
  {
    path: 'products/edit/:id',
    component: ProductEditComponent, canActivate: [AdminGuard]
  },
  {
    path: 'products',
    component: ProductGetComponent, canActivate: [AdminGuard]
  },
  {
    path: '',
    component: AdminloginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate: [AdminGuard]
  },
  {
    path: 'register',
    component: AdminregisterComponent, canActivate: [AdminGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent, canActivate: [AdminGuard]
  },
  {
    path: 'users',
    component: CustomersComponent, canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
