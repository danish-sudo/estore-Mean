import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Orders from '../../../Shared/models/orders';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../Shared/services/auth.service';
import {OrdersService} from '../../../Shared/services/orders.service';
import {ToolbarService} from '../../../Shared/services/toolbar.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  localUser: any;
  private images: any;
  url: any;
  private img: any;
  orders: Orders[];
  hasImage: any = false;
  orderStatus: string;
   o: Orders[] =[];


  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute, private as: AuthService,
              private os: OrdersService,
              private nav: ToolbarService) {

  }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('user'));
    this.os
      .getOrder()
      .subscribe((data: Orders[]) => {
        this.orders = data;
        for (const item of this.orders) {
            if (item.TrackingID == this.localUser.orders){
              this.o.push(item);
            }
        }
        });
    if (this.localUser.userImage != undefined) {
      this.hasImage = true;
    }
    this.img = this.localUser.userImage;
    this.url = 'http://localhost/images/' + this.img;

    this.nav.show();

  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files[0];
    }
    const formData = new FormData();
    formData.append('file', this.images);
    this.http.post<any>('http://localhost:3000/users/file', formData).subscribe(
      (res) => {
        this.img = res.filename;
        this.url = 'http://localhost/images/' + res.filename;

      }, (err) => console.log(err)
    );

  }
  onSubmit(name: any){
      this.as.userUpdateName(name, this.img, this.localUser.id);
      this.localUser.userImage = this.img;
      this.as.storeUserData(this.localUser.token, this.localUser);
      this.as.uimgSubject.next(this.localUser.userImage);
      this.as.userSubject.next(this.localUser.name);
      this.router.navigate(['/']);
  }
}
