import { Component, OnInit } from '@angular/core';
import User from '../../../Shared/models/user';
import {AuthService} from '../../../Shared/services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  users: User[];
  term: string;
  pageOfItems: Array<any>;

  constructor(private as: AuthService){
    this.as
      .getAllUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        console.log(this.users);
      });
  }
  deleteUser(id, index) {
    this.as.deleteUser(id).subscribe(res => {
      this.users.splice(index, 1);
    });
    this.ngOnInit();

  }

  ngOnInit(): void {

  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
