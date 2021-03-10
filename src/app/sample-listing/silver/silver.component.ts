import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { SilverListing } from 'src/app/sample-listing/models/silverlisting-model';
import { SilverList } from './silver';

@Component({
  selector: 'app-silver',
  templateUrl: './silver.component.html',
  styleUrls: ['./silver.component.css']
})
export class SilverComponent implements OnInit {

  silverlisting : SilverListing = {
    imageUrl:"../../assets/img/business-bg-1.jpg",
    name: "SILVERWOOD RESEDENCY",
    description:"LOREM IPS MDOLER LOREM IPSUM DIOLER JHBJB HGBHGB BHGBHJUB YHGBHGB HBHJBJK UHBJUBYUG HGBH GH ",
    about:"lore ipsum doler lore ipsum dol;er lorem ipsum doler lorem ipsum doler lore opdukj doler",
    openingTime:new Date(),
    closingTime:new Date(),
    workingDays:["MON,TUE,WED,THU,FRI,SAT"], 
    products:[],
    services:[],
    reviews:[],
    facebookLink: "chvbhvbc",
    instagramLink:"sdchygbhjbc",
    twitterLink:"dshgvhvb",
    emailLink:"scyghvhyvhgh",
    footerText:"SGHVGHV SGHGB HSUHGUJ SGHUHBS UIGYHUJHBSUYGHUHJBS YGTYUGBS 7YGHUIBS  ",
  };

  silverForm:FormGroup;
  silver= new SilverList();
  isLoading=false;
  errorMessage=null;

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getSilverListingById(this.silverlisting).subscribe(
      result => console.log('success: ',result),
      error => console.log('error: ',error)
    )

    this.silverForm= new FormGroup({
      name: new FormControl(this.silver.name, [Validators.required]),  
      email: new FormControl(this.silver.email, [Validators.required,Validators.pattern("(^$)|(^.*@.*\..*$)")]),
      msg: new FormControl(this.silver.msg, [Validators.required]),
    });
  }
  get name() { return this.silverForm.get('name'); }
  get email() { return this.silverForm.get('email'); }
  get msg() { return this.silverForm.get('msg'); }

  save(){
    console.log(this.silverForm);
    console.log('saved: '+ JSON.stringify(this.silverForm.value));
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
    this._httpService.createEnquiry(this.silverForm.value)
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
    if (this.silverForm.invalid) {
      
      this.errorMessage = "somthing went wrong";

      return false;
    }


    return true
  }
  emptyForm(){
    
  this.silverForm.get('name').setValue('');
  this.silverForm.get('email').setValue('');
  this.silverForm.get('msg').setValue('');
  }

}
