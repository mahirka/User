import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getAppState, State } from 'src/app/state/app.reducer';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  loggedInUserId: string = ""
  automobileListings:any[]=[{
    name:"FASTRACK MOTORS",
    location:"Thodupuzha,Idukki,Kerala",
    thumbnailUrl:"../../../../assets/img/racer.png"
  }]

  constructor(private toastr: ToastrService ,private store: Store<State>, private _httpService: HttpService,private _router: Router) { }

  ngOnInit(): void {

    this.store.select(getAppState).subscribe(
      appState => {
        if (appState) {
console.log("getAppState reached")
console.log(appState)

          if (appState.loggedInUserDetails.userId == 'userId') {
            this.getLoggedInUserDetails()
            this.getautomobileListing()
          } else {
            this.loggedInUserId = appState.loggedInUserDetails.userId
            console.log("user details appstate reached")
            console.log(this.loggedInUserId)
            


            }
        }
      }
    )
  }

  getLoggedInUserDetails() {
    this._httpService.getLoggedInUserDetails()
      .subscribe(
        data => {
  
          console.log("getLoggedInUserDetails")
          console.log(data)
          if (data['userDetails']) {
  
            this.loggedInUserId = data['userDetails']['id']
            this.getautomobileListing()
          
          }
            
  
        },
        error => {
          //this.logout()
          localStorage.removeItem('tocken');
          this._router.navigate(['/authentication/login']);
          this.toastr.info("Please Login", error.error,);
        },
      );
  }
  getautomobileListing(){
    this._httpService.getautomobileListing({creatorId:this.loggedInUserId})
    .subscribe(
      data => {
        console.log("getbusinessListing")
          console.log(data)
      this.automobileListings =  data["businessListings"]
      },
      error => {
        this._router.navigate(['/home']);
      },
    );
  }

}
