import { Component, OnInit } from '@angular/core';
import {ToolbarService} from '../../../Shared/services/toolbar.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private nav: ToolbarService){
  }
  ngOnInit(): void {
    this.nav.show();
  }

}
