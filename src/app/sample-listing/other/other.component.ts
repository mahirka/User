import { HttpService } from '../http.service';
import { Component, OnInit } from '@angular/core';
import { OtherListing } from 'src/app/sample-listing/models/otherlisting-model';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  otherlisting : OtherListing = {
    name: "AMBADI BAR",
    rating:4,
    imageUrl:[],
    about:"lorem ipsum doler sit maet LOrem ipsum doler sit met lorem ipsuim doler sit met old monk,pop,magic moments,shiva sthreegal",
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

    this.HttpService.getOtherListingById(this.otherlisting).subscribe(
      result => console.log('success: ',result),
      error => console.log('error: ',error)
    )
  }

}
