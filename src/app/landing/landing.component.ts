import { UserService } from '@app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private userService:UserService
  ) {
   
   }

  ngOnInit() {
  }

}
