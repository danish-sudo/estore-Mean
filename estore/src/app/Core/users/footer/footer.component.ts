import { Component, OnInit } from '@angular/core';
import {ToolbarService} from '../../../Shared/services/toolbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public nav: ToolbarService) { }

  ngOnInit(): void {
  }

}
