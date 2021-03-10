import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-result-modal',
  templateUrl: './filter-result-modal.component.html',
  styleUrls: ['./filter-result-modal.component.css']
})
export class FilterResultModalComponent implements OnInit {

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
