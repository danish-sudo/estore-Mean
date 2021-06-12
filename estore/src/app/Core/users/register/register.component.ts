import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../Shared/services/auth.service";
import {ValidateService} from "../../../Shared/services/validate.service";
import {ToolbarService} from "../../../Shared/services/toolbar.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  emailexists = false;
  useralready = false;
   error: any;
  erroru:any;
  constructor(private validateService: ValidateService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private nav: ToolbarService) {

           this.registerForm = this.formBuilder.group({
             name: ['', Validators.required],
             email: ['', [Validators.required, Validators.email]],
             username: ['', [Validators.required, Validators.minLength(4)]],
             password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.nav.hide();

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }
  onSubmit(iname, iemail, iusername, ipassword) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const user = {
      name: iname,
      email: iemail,
      username: iusername,
      password: ipassword,
    };
    this.authService.email_exists(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.registerUser(user).subscribe((data: any) => {
              if (data.success) {
                this.router.navigate(['/login']);
              } else {
                alert('Unknown Error Occurred, Please Try Again');
                this.router.navigate(['/register']);
              }
            });
      } else {
        if (data.msg == 'Email Already Exists'){
          this.emailexists = true;
          this.error=data.msg;
        }
        else{
          this.useralready=true;
          this.erroru= data.msg;
        }
        return;
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
