import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';

import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { AdmintoolComponent } from './admintool/admintool.component';
import {ProductService} from '../../Shared/services/product.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {JwPaginationModule} from "jw-angular-pagination";




@NgModule({
    declarations: [AdminloginComponent, AdminregisterComponent, ProductAddComponent, ProductEditComponent, ProductGetComponent, DashboardComponent, OrdersComponent, CustomersComponent, AdmintoolComponent, ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule, ReactiveFormsModule,
        Ng2SearchPipeModule, JwPaginationModule,

    ],
  exports: [
    DashboardComponent,
    AdmintoolComponent
  ],
    providers: [ProductService  ]
})
export class AdminModule { }
