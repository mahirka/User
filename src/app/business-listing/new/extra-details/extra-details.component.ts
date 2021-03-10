import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessListing } from '../../business';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getbusinessListingBasicDetails, State } from '../state/business-listing.reducer';
import { getAppState } from 'src/app/state/app.reducer';
import * as BusinessListingActions from '../state/business-listing.actions'
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-extra-details',
  templateUrl: './extra-details.component.html',
  styleUrls: ['./extra-details.component.css']
})
export class ExtraDetailsComponent implements OnInit {

  businessPlanDetailForm:FormGroup;
  businessPlanDetail= new BusinessListing();
  errorMessage = null;
  isLoading=false;
  isProducts = false;
  isServices = false;
  businessListingId = 'businessListingId';
  template = 'Free' 
  currentForm = 'detailsForm'
  productForm: FormGroup;
  serviceForm: FormGroup;
  businessListingBody: any = {};
  loggedInUserId: string = ""
  loggedInUserName: string = ""
  medias = []
  

  constructor(private _httpService: HttpService, private _router: Router, private store: Store<State>, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.businessPlanDetailForm= new FormGroup({
      caption: new FormControl(this.businessPlanDetail.caption, [Validators.required]),
      tags: new FormControl(this.businessPlanDetail.tags, [Validators.required]),
      facebookLink: new FormControl(this.businessPlanDetail.facebookLink, [Validators.required]),
      instagramLink: new FormControl(this.businessPlanDetail.instagramLink, [Validators.required]),
      whatsappNumber: new FormControl(this.businessPlanDetail.whatsappNumber, [Validators.required]),
      youtubeLink: new FormControl(this.businessPlanDetail.youtubeLink, [Validators.required]),
      websiteLink: new FormControl(this.businessPlanDetail.websiteLink, [Validators.required]),
      twitterLink: new FormControl(this.businessPlanDetail.twitterLink, [Validators.required]),
      
    });

    this.store.select(getbusinessListingBasicDetails).subscribe(
      businessListingBasicDetails => {
        console.log("getbusinessListingBasicDetails")

        if (businessListingBasicDetails) {

          console.log("businessListingBasicDetails step")
          console.log(businessListingBasicDetails.businessListingStep)

          if (businessListingBasicDetails.businessListingStep != 'extra-details') {
            this._router.navigate(['/dashboard/business-listing/new/' + businessListingBasicDetails.businessListingStep]);
          }
          this.businessListingBody = {...businessListingBasicDetails};
          this.medias = businessListingBasicDetails.medias
          console.log("businessListingBasicDetails BusinessListingForm")
          console.log(businessListingBasicDetails)
        }

      }
    )
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
            this.initializedFormData()
            console.log("user details ")
            console.log(this.loggedInUserId)
            


            }
        }
      }
    )
  }
  get caption() { return this.businessPlanDetailForm.get('caption'); }
  get tags() { return this.businessPlanDetailForm.get('tags'); }
  get facebookLink() { return this.businessPlanDetailForm.get('facebookLink'); }
  get instagramLink() { return this.businessPlanDetailForm.get('instagramLink'); }
  get whatsappNumber() { return this.businessPlanDetailForm.get('whatsappNumber'); }
  get youtubeLink() { return this.businessPlanDetailForm.get('youtubeLink'); }
  get websiteLink() { return this.businessPlanDetailForm.get('websiteLink'); }
  get twitterLink() { return this.businessPlanDetailForm.get('twitterLink'); }

  getLoggedInUserDetails() {
    this._httpService.getLoggedInUserDetails()
      .subscribe(
        data => {
  
          console.log("getLoggedInUserDetails")
          console.log(data)
          if (data['userDetails']) {
  
            this.loggedInUserId = data['userDetails']['id']
            this.loggedInUserName = data['userDetails']['name']
            this.initializedFormData()
            console.log("user details reached")
                console.log(this.loggedInUserId)
                console.log(this.loggedInUserName)
            
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
  initializedFormData(){
    this.businessPlanDetailForm.get('Id').setValue(this.loggedInUserId)
    this.businessPlanDetailForm.get('name').setValue(this.loggedInUserName)

  }

  saveBasicPlanDetails() {
    if (!this.isLoading) {
      if (this.checkIfFormValid()) {
        this.isLoading = true;
       this.errorMessage=null;

        this.store.dispatch(BusinessListingActions.saveBusinessListingPlanDetails({ businessListingPlanDetails: this.businessPlanDetailForm.value }))
        this.createBusinessListing()
        console.log("created")
        
      }
    }
    
  }

  createBusinessListing() {
    
    this.businessListingBody["creatorId"] = this.loggedInUserId
    this.businessListingBody["published"] = true
    this.businessListingBody["verified"] = false
    this.businessListingBody["creatorName"] = this.loggedInUserName
    this._httpService.createBusinessListing(this.businessListingBody)
      .subscribe(

        data => {

          if (data['response'] == 'success') {
      
            console.log("businessListingBody")
            console.log(this.businessListingBody)
  
            if (data['response'] == 'success') {
              this.businessListingId = data['businessListingId']
              this.uploadMedia(data['businessListingId'])
            }
          }

        },

        error => {
          this.toastr.info("Could you please try again?", error.error,);
        },

      );

  }
  uploadMedia(businessListingId) {

    const formData: any = new FormData();
    formData.append('associatedId', businessListingId); //note c
    formData.append('directory', 'businessListings/' + businessListingId);
    for (var i = 0; i < this.medias.length; i++) {
      formData.append("file", this.medias[i], this.medias[i]['name']);

    }

    this._httpService.uploadMedia(formData)
      .subscribe(

        data => {
          this.isLoading = false;
          if (data['response'] == 'success') {
            console.log("this.businessListingId")
            this.toastr.success("Business Plan Details Successfully Stored",);
            this.isLoading = false;
               this._router.navigate(['/dashboard/business-listing/view-all'])
               

            // if (this.template == 'Free') {
            //   this._router.navigate(['/dashboard/business-listing/view-all'])
            // }

            // if (this.isProducts) {
            //   this.currentForm = 'productsForm'
            // } else {

            //   if (this.isServices) {
            //     this.currentForm = 'servicesForm'
            //   } else {
            //     this.toastr.success("BusinessListing Created Successfully", "Success");
            //     this._router.navigate(['/dashboard/business-listing/view-all'])
            //   }

            // }

          }

        },

        error => {
          console.log("error")
          console.log(error)
          this.toastr.error("Could you please try again?", error.error,);
        },

      );
  }
  checkIfFormValid(){
    if (this.businessPlanDetailForm.invalid) {
      
      this.errorMessage = "somthing went wrong !";
  
      return false;
    }
    return true
  }

}
