import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { BusinessListing } from '../business';
import { getAppState, State } from '../../state/app.reducer';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  businessForm:FormGroup;
  business= new BusinessListing();
  loggedInUserId: string = "" 
    basicDetailfirstName:  string = ""
    basicDetaillastName:string = ""         
    basicDetailcategory:string = ""
    basicDetailsubCategory: string = ''
    basicDetailfloorDoorNumber: number;
    basicDetailbuildingName: string =''
    basicDetaillandmark: string=""
    basicDetailstreetName:string =""
    basicDetailnearestTown: string="" 
    basicDetaildistrict: string="" 
    basicDetailzipCode: string =""
    basicDetailprovince: string =""
    basicDetailcountry: string =""
    basicDetailkeyWords: string =''
    basicDetailpersonName: string=""
    basicDetailmobile: number;
    basicDetaildesignation: string=""
    basicDetailemail: string=""
    basicDetailaboutDescription:string="" 
    businessListingId=''

  constructor( private toastr: ToastrService ,private store: Store<State>,private _activatedRoute: ActivatedRoute, private _httpService: HttpService,private fb: FormBuilder,private _router: Router,) { }

  ngOnInit(): void {

    this.businessListingId = this._activatedRoute.snapshot.paramMap.get('businessListingId');
     this.getbusinessListingBasicDetails()

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
      facebookLink: new FormControl(this.business.facebookLink, [Validators.required]),
      instagramLink: new FormControl(this.business.instagramLink, [Validators.required]),
      whatsappNumber: new FormControl(this.business.whatsappNumber, [Validators.required]),
      youtubeLink: new FormControl(this.business.youtubeLink, [Validators.required]),
      websiteLink: new FormControl(this.business.websiteLink, [Validators.required]),
      vedio: new FormControl(this.business.vedio, [Validators.required]),
      qr: new FormControl(this.business.qr, [Validators.required]),
      caption: new FormControl(this.business.caption, [Validators.required]),
      item: new FormControl(this.business.item, [Validators.required]),
      cat: new FormControl(this.business.cat, [Validators.required]),
      subcat: new FormControl(this.business.subcat, [Validators.required]),
      price: new FormControl(this.business.price, [Validators.required]),
      desc: new FormControl(this.business.desc, [Validators.required]),
      brname: new FormControl(this.business.brname, [Validators.required]),
      brlocation: new FormControl(this.business.brlocation, [Validators.required]),
      condet: new FormControl(this.business.condet, [Validators.required]),
      title: new FormControl(this.business.title, [Validators.required]),
      descr: new FormControl(this.business.descr, [Validators.required]),
      title1: new FormControl(this.business.title1, [Validators.required]),
      descr1: new FormControl(this.business.descr1, [Validators.required]),
      job: new FormControl(this.business.job, [Validators.required]),
      salary: new FormControl(this.business.salary, [Validators.required]),
      quali: new FormControl(this.business.quali, [Validators.required]),
      userId:new FormControl(null)
    });
    

    this.store.select(getAppState).subscribe(
      appState => {
        if (appState) {
        console.log("getAppState reached")
        console.log(appState)

          if (appState.loggedInUserDetails.userId == 'userId') {
            this.getLoggedInUserDetails()
          } else {
            this.loggedInUserId = appState.loggedInUserDetails.userId
            this.initializedFormData()
            console.log("user details appstate reached")
            console.log(this.loggedInUserId)
            


            }
        }
      }
    )
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
  get zipCode() { return this.businessForm.get('zipCode'); }
  get province() { return this.businessForm.get('province'); }
  get country() { return this.businessForm.get('country'); }
  get keyWords() { return this.businessForm.get('keyWords'); }
  get mobile() { return this.businessForm.get('mobile'); }
  get openingTime() { return this.businessForm.get('openingTime'); }
  get closingTime() { return this.businessForm.get('closingTime'); }
  get workingDays() { return this.businessForm.get('workingDays'); }
  get personName() { return this.businessForm.get('personName'); }
  get designation() { return this.businessForm.get('designation'); }
  get email() { return this.businessForm.get('email'); }
  get aboutDescription() { return this.businessForm.get('aboutDescription'); }
  get facebook() { return this.businessForm.get('fcaebook'); }
  get instagram() { return this.businessForm.get('instagram'); }
  get vedio() { return this.businessForm.get('vedio'); }
  get qr() { return this.businessForm.get('qr'); }
  get caption() { return this.businessForm.get('caption'); }
  get item() { return this.businessForm.get('item'); }
  get cat() { return this.businessForm.get('cat'); }
  get subcat() { return this.businessForm.get('subcat'); }
  get price() { return this.businessForm.get('price'); }
  get desc() { return this.businessForm.get('desc'); }
  get brname() { return this.businessForm.get('brname'); }
  get brlocation() { return this.businessForm.get('brlocation'); }
  get condet() { return this.businessForm.get('condet'); }
  get title() { return this.businessForm.get('title'); }
  get descr() { return this.businessForm.get('descr'); }
  get title1() { return this.businessForm.get('title1'); }
  get descr1() { return this.businessForm.get('descr1'); }
  get job() { return this.businessForm.get('job'); }
  get salary() { return this.businessForm.get('salary'); }
  get quali() { return this.businessForm.get('quali'); }

  get userId() { return this.businessForm.get('userId'); }

  save(){
    console.log(this.businessForm);
    console.log('saved: '+ JSON.stringify(this.businessForm.value));
  }
  initializedFormData(){
    this.businessForm.get('userId').setValue(this.loggedInUserId)
    this.businessForm.get('firstName').setValue(this.firstName)
    this.businessForm.get('lastName').setValue(this.lastName)
    this.businessForm.get('category').setValue(this.category)
    this.businessForm.get('subCategory').setValue(this.subCategory)
    this.businessForm.get('floorDoorNumber').setValue(this.floorDoorNumber)
    this.businessForm.get('buildingName').setValue(this.buildingName)
    this.businessForm.get('landmark').setValue(this.landmark)
    this.businessForm.get('streetName').setValue(this.streetName)
    this.businessForm.get('nearestTown').setValue(this.nearestTown)
    this.businessForm.get('zipCode').setValue(this.zipCode)
    this.businessForm.get('province').setValue(this.province)
    this.businessForm.get('country').setValue(this.country)
    this.businessForm.get('keyWords').setValue(this.keyWords)
    this.businessForm.get('personName').setValue(this.personName)
    this.businessForm.get('mobile').setValue(this.mobile)
    this.businessForm.get('designation').setValue(this.designation)
    this.businessForm.get('email').setValue(this.email)
    this.businessForm.get('aboutDescription').setValue(this.nearestTown)
  }
  getbusinessListingBasicDetails() {
    this._httpService.getbusinessListingBasicDetails(this.businessListingId)
      .subscribe(
        data => {
  
          console.log("getbusinessListingBasicDetails")
          console.log(data)
          if (data['basicDetails']) {
  
            this.loggedInUserId = data['basicDetails']['id']
            this.basicDetailfirstName = data['basicDetails']['firstName']
            this.basicDetaillastName=data['basicDetails']['lastName']
            this.basicDetailcategory=data['basicDetails']['category']
            this.basicDetailsubCategory = data['basicDetails']['subCategory']
            this.basicDetailfloorDoorNumber = data['basicDetails']['floorDoorNumber']
            this.basicDetailbuildingName=data['basicDetails']['buildingName']
            this.basicDetaillandmark=data['basicDetails']['landmark']
            this.basicDetailstreetName = data['basicDetails']['streetName']
            this.basicDetailnearestTown = data['basicDetails']['nearestTown']
            this.basicDetailzipCode=data['basicDetails']['zipCode']
            this.basicDetailprovince=data['basicDetails']['province']
            this.basicDetailcountry = data['basicDetails']['country']
            this.basicDetailkeyWords = data['basicDetails']['keyWords']
            this.basicDetailpersonName=data['basicDetails']['personName']
            this.basicDetailmobile=data['basicDetails']['mobile']
            this.basicDetaildesignation = data['basicDetails']['designation']
            this.basicDetailemail = data['basicDetails']['email']
            this.basicDetailaboutDescription=data['basicDetails']['aboutDescription']
            this.initializedFormData()
            console.log("user details reached")
                console.log(this.loggedInUserId)

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

  getLoggedInUserDetails() {
    this._httpService.getLoggedInUserDetails()
      .subscribe(
        data => {
  
          console.log("getLoggedInUserDetails")
          console.log(data)
          if (data['userDetails']) {
  
            this.loggedInUserId = data['userDetails']['id']
            this.initializedFormData()
          
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
