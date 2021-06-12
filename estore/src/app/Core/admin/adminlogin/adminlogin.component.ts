import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../Shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router
    ) {
    }

  ngOnInit(): void {

    if (this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
  onLogin(){
    const user = {
      username: this.username,
      password: this.password
       };
    this.authService.authAdmin(user).subscribe((data: any) => {
        if (data.success){
          this.authService.storeAdminData(data.token, data.user);
          this.router.navigate(['/admin/dashboard']);
        }
        else{
          console.log('Unable to  Login');
        }
      });
  }

}
