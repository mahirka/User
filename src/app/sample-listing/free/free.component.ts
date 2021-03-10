
import { HttpService } from '../http.service';
import { Component, OnInit } from '@angular/core';
import { FreeListing } from 'src/app/sample-listing/models/freelisting.model';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {

  selectedGalleryImageUrl="../../assets/img/city.png"
  freelisting : FreeListing = {
    bgImage:"../../../../assets/img/dhaba.png",
    name: "STREET CAFE",
    rating:4,
    imageUrl:[],
    about:"lorem ipsum doler sit maet LOrem ipsum doler sit met lorem ipsuim doler sit met old monk,pop,magic moments,shiva sthreegal sxgvhjvd wqughdjbqw uqjwhdbjbnjkfb juhbwqfjkbjnmbfj wqfujbjkbwqf qwgfbhjb fn hgbwjhqb nm, fbkhugbjhn wqfbvhjbv wqfn hgwhjqb nf buihuijqwnbfj gqwfyub njf qughujnw ma fchgehjfb mne,bfheuygbf jhnb efnjbeyhwbf djhnbhg",
    openingTime:new Date(),
    closingTime:new Date(),
    workingDays:["MON,TUE,WED,THU,FRI,SAT"], 
    tags:[],
    products:[],
    facebookLink: "HGBH",
    whatsappNumber:"hvghv",
    instagramLink:"gghv",
    contactNumber:"fcfgc",
    reviews:[],
  };

  constructor(private HttpService: HttpService) { }

  ngOnInit(): void {

    this.HttpService.getFreeListingById(this.freelisting).subscribe(
      result => console.log('success: ',result),
      error => console.log('error: ',error)
    )
  }

}
