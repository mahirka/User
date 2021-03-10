
import {getLoggedInUserDetails, State,   getAppState} from '../state/app.reducer';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import {  Store } from '@ngrx/store';
import * as AppActions from '../state/app.actions'
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/home/http.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {


  public href: string = "";

  isDashboardInLargeScreen = false;
  isLocationBoxHeaderVisible = false;
  isChatBoxHeaderVisible = false;
  isNotificationtBoxHeaderVisible=false;
  isHeaderSearchVisible = false;
  profilePicMediaId: any;
  constructor(private location: Location,private _httpService: HttpService, private _router: Router,  private store: Store<State>, private toastr: ToastrService) { }

  loggedInUserId: string = ""
  loggedInUserName: string = ""
  profilePic: string = ""
  loggedInUserEmail: string = ""
  loggedInUserMobile : string = ""

  ngOnInit(): void {
    let url = this._router.url
        console.log("current url is");
        console.log(this._router.url);
        console.log(url.split('/'));
        console.log(url.split('/')[1]);
        if(url.split('/')[1]=="dashboard"){
          this.isDashboardInLargeScreen = true
        }else{
          this.isDashboardInLargeScreen = false
        }

        this._router.events.subscribe(val => {
            url = this.location.path();
            console.log("current url is");
            console.log(url);
            if(url.split('/')[1]=="dashboard"){
              this.isDashboardInLargeScreen = true
            }else{
              this.isDashboardInLargeScreen = false
            }
        });
        console.log("getAppState before reached")

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

  locationButton(){
    this.isLocationBoxHeaderVisible =  !this.isLocationBoxHeaderVisible
  }

  chatButton(){
    this.isChatBoxHeaderVisible =  !this.isChatBoxHeaderVisible
  }

  notificationButton(){
    this.isNotificationtBoxHeaderVisible =  !this.isNotificationtBoxHeaderVisible 
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

  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {

    if (window.pageYOffset > 350) {
      this.isHeaderSearchVisible = true;
  } else {
    this.isHeaderSearchVisible = false;
  }
  }
  logout() {
    
    localStorage.removeItem('tocken');
    this._router.navigate(['/authentication/login'])
  }
}
