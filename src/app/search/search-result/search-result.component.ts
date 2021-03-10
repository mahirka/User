import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  isLocationBoxHeaderVisible = false;
  isHeaderSearchVisible = false;

  constructor() { }

  ngOnInit(): void {
  }
  locationButton(){
    this.isLocationBoxHeaderVisible =  !this.isLocationBoxHeaderVisible
  }
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {

    if (window.pageYOffset > 350) {
      this.isHeaderSearchVisible = true;
  } else {
    this.isHeaderSearchVisible = false;
  }
  }

}
