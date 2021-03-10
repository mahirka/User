import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { GoldListing } from 'src/app/sample-listing/models/goldlisting.model';
import { GoldList } from './gold';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.component.html',
  styleUrls: ['./gold.component.css']
})
export class GoldComponent implements OnInit {

  goldlisting : GoldListing = {
    imageUrl:"../../assets/img/big.png" ,
    name: "GREEN VALLEY RESORT",
    rating:4,
    about:"lOREM IPSUM DOLER llorem ipsum foler lorem iposumn mdoler loren ipsum ndoler oiuytgv pltyf lorem ipsum doler lorem ipsum doler klorem ipsum",
    openingTime:new Date(),
    closingTime:new Date(),
    workingDays:["MON,TUE,WED,THU,FRI"],
    galleryImageUrl:[], 
    products:[],
    services:[],
    reviews:[],
    facebookLink: "AHYGYVHV",
    instagramLink:"AYTFGTG",
    twitterLink:"ygfyhv",
    webLink:"ygfvgv",
    footerText:"LOREM IPSUM DOLER SIT, lorem ipsum doler lorem opsum doler lorem iposim lorem ",
  };

  goldForm:FormGroup;
  gold= new GoldList();
  isLoading=false;
  errorMessage=null;

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getGoldListingById(this.goldlisting).subscribe(
      result => console.log('success: ',result),
      error => console.log('error: ',error)
    )

    this.goldForm= new FormGroup({
      name: new FormControl(this.gold.name, [Validators.required]),  
      email: new FormControl(this.gold.email, [Validators.required,Validators.pattern("(^$)|(^.*@.*\..*$)")]),
      msg: new FormControl(this.gold.msg, [Validators.required]),
    });
  }
  get name() { return this.goldForm.get('name'); }
  get email() { return this.goldForm.get('email'); }
  get msg() { return this.goldForm.get('msg'); }

  save(){
    console.log(this.goldForm);
    console.log('saved: '+ JSON.stringify(this.goldForm.value));
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
    this._httpService.createEnquiry(this.goldForm.value)
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
    if (this.goldForm.invalid) {
      
      this.errorMessage = "somthing went wrong";

      return false;
    }


    return true
  }
  emptyForm(){
    
  this.goldForm.get('name').setValue('');
  this.goldForm.get('email').setValue('');
  this.goldForm.get('msg').setValue('');
  }

}
