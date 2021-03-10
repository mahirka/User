
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/home/http.service';
import { BusinessListing } from '../../business';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as BusinessListingActions from '../state/business-listing.actions'
import { State, getbusinessListingBasicDetails } from '../state/business-listing.reducer';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  businessForm:FormGroup;
  business= new BusinessListing();
  dropdownSettings = {};
  selectedItems = [];
  publishedWorkingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  coverPicUrl: any;
  coverPic: any;
  isLoading = false;
  isCoverPicCropped = true;
  coverPicChangedEvent: any = '';
  croppedImage: any = '';
  errorMessage = null;
  isCreated = false;
  publicUrl = "https://www.listnsell.in/"

  constructor(private _httpService: HttpService, private _router: Router, private store: Store<State>, private toastr: ToastrService) { }

  ngOnInit(): void {

      

    this.businessForm= new FormGroup({
      firstName: new FormControl(this.business.firstName, [Validators.required]),  
      lastName: new FormControl(this.business.lastName, [Validators.required]),
      category: new FormControl(this.business.category, [Validators.required]),
      subCategory: new FormControl(this.business.subCategory, [Validators.required]),
      floorDoorNumber: new FormControl(this.business.floorDoorNumber, [Validators.required]),
      buildingName: new FormControl(this.business.buildingName, [Validators.required]),
      landmark: new FormControl(this.business.landmark, [Validators.required]),
      streetName: new FormControl(this.business.streetName, [Validators.required]),
      nearestTown: new FormControl(this.business.nearestTown, [Validators.required]),
      district: new FormControl(this.business.district, [Validators.required]),
      zipCode: new FormControl(this.business.zipCode, [Validators.required]),
      province: new FormControl(this.business.province, [Validators.required]),
      country: new FormControl(this.business.country, [Validators.required]),
      keyWords: new FormControl(this.business.keyWords, [Validators.required]),
      openingTime: new FormControl(this.business.openingTime, [Validators.required]),
      closingTime: new FormControl(this.business.closingTime, [Validators.required]),
      workingDays: new FormControl(this.business.workingDays, [Validators.required]),
      personName: new FormControl(this.business.personName, [Validators.required]),
      mobile: new FormControl(this.business.mobile, [Validators.required]),
      designation: new FormControl(this.business.designation, [Validators.required]),
      email: new FormControl(this.business.email, [Validators.required]),
      aboutDescription: new FormControl(this.business.aboutDescription, [Validators.required]),
      medias: new FormControl(null,null),
      url: new FormControl(null,null),
      publicUrl: new FormControl(null, null),
 
    });
  


    this.store.select(getbusinessListingBasicDetails).subscribe(
      businessListingBasicDetails => {
        console.log("getbusinessListingBasicDetails")

        if (businessListingBasicDetails) {

          console.log("businessListingBasicDetails step")
          console.log(businessListingBasicDetails.businessListingStep)

          if (businessListingBasicDetails.businessListingStep != 'basic-details') {
            this._router.navigate(['/dashboard/business-listing/new/' + businessListingBasicDetails.businessListingStep]);
          }

          console.log("businessListingBasicDetails BusinessListingForm")
          console.log(businessListingBasicDetails)
          
          this.businessForm.get('firstName').setValue(businessListingBasicDetails.firstName);
          this.businessForm.get('lastName').setValue(businessListingBasicDetails.lastName);
          this.businessForm.get('category').setValue(businessListingBasicDetails.category);
          this.businessForm.get('subCategory').setValue(businessListingBasicDetails.subCategory);
          this.businessForm.get('floorDoorNumber').setValue(businessListingBasicDetails.floorDoorNumber);
          this.businessForm.get('buildingName').setValue(businessListingBasicDetails.buildingName);
          this.businessForm.get('landmark').setValue(businessListingBasicDetails.landmark);
          this.businessForm.get('streetName').setValue(businessListingBasicDetails.streetName);
          this.businessForm.get('nearestTown').setValue(businessListingBasicDetails.nearestTown);
          this.businessForm.get('district').setValue(businessListingBasicDetails.district);
          this.businessForm.get('zipCode').setValue(businessListingBasicDetails.zipCode);
          this.businessForm.get('country').setValue(businessListingBasicDetails.country);
          this.businessForm.get('province').setValue(businessListingBasicDetails.province);
          this.businessForm.get('keyWords').setValue(businessListingBasicDetails.keyWords);
          this.businessForm.get('openingTime').setValue(businessListingBasicDetails.openingTime);
          this.businessForm.get('closingTime').setValue(businessListingBasicDetails.closingTime);
          this.businessForm.get('workingDays').setValue(businessListingBasicDetails.workingDays);
          this.businessForm.get('personName').setValue(businessListingBasicDetails.personName);
          this.businessForm.get('mobile').setValue(businessListingBasicDetails.mobile);
          this.businessForm.get('designation').setValue(businessListingBasicDetails.designation);
          this.businessForm.get('email').setValue(businessListingBasicDetails.email);
          this.businessForm.get('aboutDescription').setValue(businessListingBasicDetails.aboutDescription);
          this.businessForm.get('url').setValue(businessListingBasicDetails.url);
          this.businessForm.get('publicUrl').setValue(this.publicUrl)
          this.businessForm.get('medias').setValue(businessListingBasicDetails.medias);


        }

      }
    )

    
        

    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      enableCheckAll: false,
      allowSearchFilter: false,
      limitSelection: -1
    };
  }

  get firstName() { return this.businessForm.get('firstName'); }
  get lastName() { return this.businessForm.get('lastName'); }
  get category() { return this.businessForm.get('category'); }
  get subCategory() { return this.businessForm.get('subCategory'); }
  get floorDoorNumber() { return this.businessForm.get('floorDoorNumber'); }
  get buildingName() { return this.businessForm.get('buildingName'); }
  get landmark() { return this.businessForm.get('landmark'); }
  get streetName() { return this.businessForm.get('streetName'); }
  get nearestTown() { return this.businessForm.get('nearestTown'); }
  get district() { return this.businessForm.get('district'); }
  get zipCode() { return this.businessForm.get('zipCode'); }
  get province() { return this.businessForm.get('province'); }
  get country() { return this.businessForm.get('country'); }
  get keyWords() { return this.businessForm.get('keyWords'); }
  get openingTime() { return this.businessForm.get('openingTime'); }
  get closingTime() { return this.businessForm.get('closingTime'); }
  get workingDays() { return this.businessForm.get('workingDays'); }
  get personName() { return this.businessForm.get('personName'); }
  get mobile() { return this.businessForm.get('mobile'); }
  get designation() { return this.businessForm.get('designation'); }
  get email() { return this.businessForm.get('email'); }
  get aboutDescription() { return this.businessForm.get('aboutDescription'); }
  get url() { return this.businessForm.get('url'); }
  get medias() { return this.businessForm.get('medias'); }


  
  saveBasicDetails() {
    if (!this.isLoading) {
      if (this.checkIfFormValid()) {
        this.isLoading = true;
       this.errorMessage=null;

        this.store.dispatch(BusinessListingActions.saveBusinessListingBasicDetails({ businessListingBasicDetails: this.businessForm.value }))

        this.store.dispatch(BusinessListingActions.changeBusinessListingStep({ businessListingStep: 'plan' }))
        this.toastr.success("Business Details Successfully Stored", "Business Details  Successfully Stored");
        this.isLoading = false;
      }
    }
    
  }
  checkIfFormValid(){
    if (this.businessForm.invalid) {
      
      this.errorMessage = "somthing went wrong !";
  
      return false;
    }
    
    return true
  }
  emptyForm() {
    this.publicUrl = "https://www.listnsell.in/" + this.businessForm.get('url').value;
    this.isCreated = true;
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  previewCoverPic(event) {
    let selectedFiles: Array<File> = [];
    selectedFiles = <Array<File>>event.target.files;

    if (selectedFiles.length > 1) {
      this.errorMessage = "Please select a single image file"
    } else {

      if (selectedFiles[0].type.match(/video\/*/) == null && selectedFiles[0].type.match(/image\/*/) == null) {
        this.errorMessage = "Please select a single image file"
      } else {

      }

      this.coverPic = selectedFiles[0];
      this.isCoverPicCropped = true;

      this.coverPicChangedEvent = event;

    }
  }
  coverPicCropped(event: ImageCroppedEvent) {
    
    this.coverPicUrl = event.base64;
    this.isCoverPicCropped = false;

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
