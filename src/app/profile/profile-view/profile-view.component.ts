import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/home/http.service';
import * as AppActions from '../../state/app.actions'
import { getAppState, State } from '../../state/app.reducer';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor( private toastr: ToastrService ,  private store: Store<State>,private _httpService: HttpService,private _router: Router,) { }

  loggedInUserId: string = ""
  loggedInUserName: string = ""
  profilePic: string = ""
  loggedInUserEmail: string = ""
  loggedInUserMobile : string = ""
  profilePicMediaId: any;

  ngOnInit(): void {

    this.store.select(getAppState).subscribe(
      appState => {
        if (appState) {
console.log("getAppState reached")
console.log(appState)

          if (appState.loggedInUserDetails.userId == 'userId') {
            this.getLoggedInUserDetails()
          } else {


            this.loggedInUserId = appState.loggedInUserDetails.userId
            this.loggedInUserName = appState.loggedInUserDetails.name
            this.profilePic = appState.loggedInUserDetails.profilePic
            this.loggedInUserEmail = appState.loggedInUserDetails.email
            this.loggedInUserMobile = appState.loggedInUserDetails.mobile
            this.profilePicMediaId = appState.loggedInUserDetails.mediaId
            console.log("user details appstate reached")
            console.log(this.loggedInUserId)
            console.log(this.loggedInUserName)
            console.log(this.profilePic)
            console.log(this.loggedInUserEmail)
            console.log(this.loggedInUserMobile)


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
            this.loggedInUserName = data['userDetails']['name']
            this.profilePic=data['userDetails']['profilePic']
            this.loggedInUserEmail=data['userDetails']['email']
            this.loggedInUserMobile=data['userDetails']['mobile']
            this.profilePicMediaId=data['userDetails']['profilePicMediaId']
            console.log("user details reached")
                console.log(this.loggedInUserId)
                console.log(this.loggedInUserName)
            this.store.dispatch(AppActions.updateLoggedInUserDetails({
              loggedInUserDetails: {
                userId: this.loggedInUserId, name: this.loggedInUserName,profilePic:this.profilePic ,email:this.loggedInUserEmail,mobile:this.loggedInUserMobile,mediaId:this.profilePicMediaId
              }
            }))
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
  

}
