import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../Shared/services/auth.service';
import {ToolbarService} from '../../../Shared/services/toolbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user: any = JSON.parse(localStorage.getItem('user'));
  term: string;
  cart = 0;
  price = 0;
  img: any ;
  hasImage: boolean;
  quantity: any;


  constructor(private authService: AuthService, private router: Router, public ts: ToolbarService) {
    if (this.authService.isLoggedIn()) {
      this.authService.getCartValue().subscribe((data) => {
        this.cart = data;
      });
      this.authService.getUserInfo().subscribe((data) => {
        this.user.name = data;
      });
      this.authService.getCartPrice().subscribe((data) => {
        this.price = data;
      });
      this.authService.getImg().subscribe((d) => {
        if (d != undefined) {
          this.hasImage = true;
          this.img = 'http://localhost/images/' + d;
        } else {
          this.hasImage = false;
        }
      });
    }
  }

  ngOnInit(): void {

  }
  onLogout() {
    this.cart = 0;
    this.price = 0;
    this.authService.logout();
    this.router.navigate(['category', 'All Products']);
    return false;
  }

  isUserExists() {
    return this.authService.isLoggedIn();
  }

}
