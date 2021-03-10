import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class MainHomeComponent implements OnInit {
  isLocationBoxHeaderVisible = false
  constructor() { }



  ngOnInit(): void {
  }
  locationButton(){
    this.isLocationBoxHeaderVisible =  !this.isLocationBoxHeaderVisible
  }

}
