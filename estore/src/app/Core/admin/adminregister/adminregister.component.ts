import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../Shared/services/auth.service';
import {ValidateService} from '../../../Shared/services/validate.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) {
      }

  ngOnInit(): void {
  }

  onRegister(){
    const admin = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,

    };

    if (!this.validateService.validateRegister(admin)){
      alert('Required Fields');
      return false;
    }
    if (!this.validateService.validateEmail(admin.email)){
      alert('Enter a valid Email');
      return false;
    }

    this.authService.registerAdmin(admin).subscribe((data: any) => {

      if (data.success){
        alert('Registered Successfully');
        this.router.navigate(['/admin']);
      }
      else{
        alert('Unable to  Register');
        this.router.navigate(['/admin/register']);
      }
    });
  }

}
