import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { PlatinumListing } from 'src/app/sample-listing/models/platinumlisting.model';
import { PlatinumList } from './platinum';

@Component({
  selector: 'app-platinum',
  templateUrl: './platinum.component.html',
  styleUrls: ['./platinum.component.css']
})
export class PlatinumComponent implements OnInit {

  selectedGalleryImageUrl="../../assets/img/city.png"
  platinumlisting : PlatinumListing = {
    imageUrl:"../../assets/img/car1.png",
    name:"FAST TRACK CARS",
    description:"LOREM IPSUM DOLER",
    about:"asr sercvghy ytfyhghvx ihihjbn nsoijknm s ihyjubhjbsljknkmnms ihjbnmjs bmnihjbnmsquhj qjnx ijn  jiqkj jhiqjhihqhuhusq uhius quhiuxsh  u qijijhiuhxd iuhixuhiuhiux hi",    
    openingTime:new Date(),
    closingTime:new Date(),
    workingDays:["mon,tue,wed,thu,fri,sat"],
    galleryImageUrls:["../../assets/img/cloths.png","../../assets/img/cloths.png","../../assets/img/city.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png","../../assets/img/dresses.png"],
    products:[],
    servicesDescription:"ysgfhgf syhgfhsg gshqagh sihujhsa jhsgughjugbsj sjuhuqhgbjbq s ",
    services:[],
    reviews:[],
    facebookLink: "uuhg",
    instagramLink:"yfgv",
    contactNumber:"uygyhh",
    footerText:"tfgtfdx saygfvhvsa yhghsgv uywgdyhb wduhwujqd iuhwjd ",
  };
  
  currentMenu='home'
  platinumForm:FormGroup;
  platinum= new PlatinumList();
  isLoading=false;
  errorMessage=null;

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {

    this._httpService.getPlatinumListingById(this.platinumlisting).subscribe(
      result => console.log('success: ',result),
      error => console.log('error: ',error)
    )
    this.platinumForm= new FormGroup({
      name: new FormControl(this.platinum.name, [Validators.required]),  
      email: new FormControl(this.platinum.email, [Validators.required,Validators.pattern("(^$)|(^.*@.*\..*$)")]),
      msg: new FormControl(this.platinum.msg, [Validators.required]),
    });
  
  }
  get name() { return this.platinumForm.get('name'); }
  get email() { return this.platinumForm.get('email'); }
  get msg() { return this.platinumForm.get('msg'); }

  save(){
    console.log(this.platinumForm);
    console.log('saved: '+ JSON.stringify(this.platinumForm.value));
  }

  submit(){
    if(!this.isLoading){
      if(this.checkIfFormValid()){
        this.createEnquiry()
      }
    }
  }
  createEnquiry(){
    this.errorMessage=null;
    this.isLoading=true;
    this._httpService.createEnquiry(this.platinumForm.value)
    .subscribe(

      data => {
        console.log("success");
        this.isLoading = false;
        if (data['response'] == 'success') {
          //data['tocken']
         this.emptyForm();
         this.errorMessage = "Success";
        }

      },

      error => {
        console.log("error required");
        this.isLoading = false;
        this.errorMessage = error.error;
      },

    );
  }
  checkIfFormValid(){
    if (this.platinumForm.invalid) {
      
      this.errorMessage = "somthing went wrong";

      return false;
    }


    return true
  }
  emptyForm(){
    
  this.platinumForm.get('name').setValue('');
  this.platinumForm.get('email').setValue('');
  this.platinumForm.get('msg').setValue('');
  }

  galleryImageChanged(index){
    this.selectedGalleryImageUrl = this.platinumlisting.galleryImageUrls[index]
  }

  
}