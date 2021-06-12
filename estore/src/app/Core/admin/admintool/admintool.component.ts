import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../Shared/services/auth.service";

@Component({
  selector: 'app-admintool',
  templateUrl: './admintool.component.html',
  styleUrls: ['./admintool.component.css']
})
export class AdmintoolComponent implements OnInit {
  admin: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('admin'));
  }
  logout() {
    this.authService.adminLogout();
    console.log('Logged Out');
    this.router.navigateByUrl('admin');
    return false;
  }

}
