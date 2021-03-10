import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiamondListing } from 'src/app/sample-listing/models/diamondlisting.model';
import { HttpService } from '../http.service';
import { DiamondList } from './diamond';

@Component({
  selector: 'app-diamond',
  templateUrl: './diamond.component.html',
  styleUrls: ['./diamond.component.css']
})
export class DiamondComponent implements OnInit {

  diamondlisting : DiamondListing = {
    imageUrl:"../../assets/img/diamond.png",
    name: "GALAXY",
    description:"HHHH sxjnbj csjsbjc uhbj shnjk jascij ",
    about:"lorem ipsum doler juhgu kijhkj 7ugus ii8ghybhjsd lohvghas ythvdjk ygfyhv d ikjhatfdcgv s koijiuygyhvs n jk yuiftfsh ihugsa",
    aboutPicUrl:"../../assets/img/bath.png",
    detailPicUrl:"../../assets/img/bath.png",
    location:"",
    openingTime:new Date(),
    closingTime:new Date(),
    workingDays:["Mon,Tue,Wed,Thu,Fri,Sat"],
    productDescription:"Lorem ipsum doler lorem ioshgvh dilewrw uhjs oji oihjub lorem ipdindoler lorem ip", 
    products:[],
    servicesDescription:"Lorem ipsum doler lorem ipsum doler lorem ipsum d oler lorem ipsum doler klorem ipsum doler lorem ipsum doler ijhhb ",
    services:[], 
    reviews:[],
    facebookLink: "yjnuhy",
    instagramLink:"hny",
    twitterLink:"yhnhn",
    emailLink:"yhyn",
    footerText:"Lorem ipsum doler lkorem ipsum doler loren ipsum doler loremn ipduih lutyfgv opkiosjnm iuysugb "
  };

  diamondForm:FormGroup;
  diamond= new DiamondList();
  isLoading=false;
  errorMessage=null;

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getDiamondListingById(this.diamondlisting).subscribe(
      result => console.log('success: ',result),
      error => console.log('error: ',error)
    )

    this.diamondForm= new FormGroup({
      name: new FormControl(this.diamond.name, [Validators.required]),  
      email: new FormControl(this.diamond.email, [Validators.required,Validators.pattern("(^$)|(^.*@.*\..*$)")]),
      msg: new FormControl(this.diamond.msg, [Validators.required]),
    });
  }
  get name() { return this.diamondForm.get('name'); }
  get email() { return this.diamondForm.get('email'); }
  get msg() { return this.diamondForm.get('msg'); }

  save(){
    console.log(this.diamondForm);
    console.log('saved: '+ JSON.stringify(this.diamondForm.value));
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
    this._httpService.createEnquiry(this.diamondForm.value)
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
    if (this.diamondForm.invalid) {
      
      this.errorMessage = "somthing went wrong";

      return false;
    }


    return true
  }
  emptyForm(){
    
  this.diamondForm.get('name').setValue('');
  this.diamondForm.get('email').setValue('');
  this.diamondForm.get('msg').setValue('');
  }

}

