import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getAppState, State } from 'src/app/state/app.reducer';
import { Fashion } from '../fashion';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fashionForm:FormGroup;
  fashion= new Fashion();
  errorMessage=null;
  isLoading = false;
  isSubmitted = false;
  loggedInUserId: string = "" 

  constructor(private toastr: ToastrService,private _httpService: HttpService,private store: Store<State>,private _activatedRoute: ActivatedRoute, private _router: Router,) { }

  ngOnInit(): void {
    this.fashionForm= new FormGroup({
      title: new FormControl(this.fashion.title, [Validators.required]),  
      category: new FormControl(this.fashion.category, [Validators.required]),
      subcat: new FormControl(this.fashion.subcat, [Validators.required]),
      price: new FormControl(this.fashion.price, [Validators.required]),
      offer: new FormControl(this.fashion.offer, [Validators.required]),
      quantity: new FormControl(this.fashion.quantity, [Validators.required]),
      location: new FormControl(this.fashion.location, [Validators.required]),
      description: new FormControl(this.fashion.description, [Validators.required]),
      warranty: new FormControl(this.fashion.warranty, [Validators.required]),
      delivery: new FormControl(this.fashion.delivery, [Validators.required]),
      returnoption: new FormControl(this.fashion.returnoption, [Validators.required]),
      tracking: new FormControl(this.fashion.tracking, [Validators.required]),
      contact: new FormControl(this.fashion.contact, [Validators.required]),
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

  get title() { return this.fashionForm.get('title'); }
  get category() { return this.fashionForm.get('category'); }
  get subcat() { return this.fashionForm.get('subcat'); }
  get price() { return this.fashionForm.get('price'); }
  get offer() { return this.fashionForm.get('offer'); }
  get quantity() { return this.fashionForm.get('quantity'); }
  get location() { return this.fashionForm.get('location'); }
  get description() { return this.fashionForm.get('description'); }
  get warranty() { return this.fashionForm.get('warranty'); }
  get delivery() { return this.fashionForm.get('delivery'); }
  get returnoption() { return this.fashionForm.get('returnoption'); }
  get tracking() { return this.fashionForm.get('tracking'); }
  get contact() { return this.fashionForm.get('contact'); }


  save(){
    console.log(this.fashionForm);
    console.log('saved: '+ JSON.stringify(this.fashionForm.value));
  }

  initializedFormData(){
    this.fashionForm.get('userId').setValue(this.loggedInUserId)
    this.fashionForm.get('title').setValue(this.title)
    this.fashionForm.get('category').setValue(this.category)
    this.fashionForm.get('subcat').setValue(this.subcat)
    this.fashionForm.get('price').setValue(this.price)
    this.fashionForm.get('offer').setValue(this.offer)
    this.fashionForm.get('quantity').setValue(this.quantity)
    this.fashionForm.get('location').setValue(this.location)
    this.fashionForm.get('description').setValue(this.description)
    this.fashionForm.get('warranty').setValue(this.warranty)
    this.fashionForm.get('delivery').setValue(this.delivery)
    this.fashionForm.get('returnoption').setValue(this.returnoption)
    this.fashionForm.get('tracking').setValue(this.tracking)
    this.fashionForm.get('contact').setValue(this.contact)

    
  }

  submit() {
    this.isSubmitted = true;
    if(!this.isLoading){
      if (this.checkIfFormValid()) {
        this.createFashionList()
      }
    }
  
  }
  
  createFashionList() {
     
    this.errorMessage = null;
    this.isLoading = true;
    this._httpService.createFashionList(this.fashionForm.value)
      .subscribe(
  
        data => {
          this.isLoading = false;
          if (data['response'] == 'success') {
            //data['tocken']
  
            this._router.navigate(['/home'])
            this.toastr.success("Your Registration is Successful");
  
          }
  
        },
  
        error => {
  
          this.isLoading = false;
          this.errorMessage = error.error;
        },
  
      );
  
  
  
  }
  checkIfFormValid(){
    if (this.fashionForm.invalid) {
      const controls =  this.fashionForm.controls;
      for (const key in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, key)) {
          const element = controls[key];
          if(element.invalid){
            this.errorMessage = "Please provid a valid "+key;
            return false;
          }
        }
      }
  
    }
  
  
    return true
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

