import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/home/http.service';
import { getAppState, State } from 'src/app/state/app.reducer';
import { Automobile } from './automobile-edit';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  automobileForm:FormGroup;
  automobile= new Automobile();
  errorMessage=null;
  isLoading = false;
  isSubmitted = false;
  loggedInUserId: string = "" 

  constructor(private toastr: ToastrService,private _httpService: HttpService,private store: Store<State>,private _activatedRoute: ActivatedRoute, private _router: Router,) { }

  ngOnInit(): void {

    this.automobileForm= new FormGroup({
      sale: new FormControl(this.automobile.sale, [Validators.required]),  
      rent: new FormControl(this.automobile.rent, [Validators.required]),
      vehicle: new FormControl(this.automobile.vehicle, [Validators.required]),
      brand: new FormControl(this.automobile.brand, [Validators.required]),
      model: new FormControl(this.automobile.model, [Validators.required]),
      fuel: new FormControl(this.automobile.fuel, [Validators.required]),
      year: new FormControl(this.automobile.year, [Validators.required]),
      driven: new FormControl(this.automobile.driven, [Validators.required]),
      description: new FormControl(this.automobile.description, [Validators.required]),
      spare: new FormControl(this.automobile.spare, [Validators.required]),
      price: new FormControl(this.automobile.price, [Validators.required]),
      emi: new FormControl(this.automobile.emi, [Validators.required]),
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

  get sale() { return this.automobileForm.get('sale'); }
  get rent() { return this.automobileForm.get('rent'); }
  get vehicle() { return this.automobileForm.get('vehicle'); }
  get brand() { return this.automobileForm.get('brand'); }
  get model() { return this.automobileForm.get('model'); }
  get fuel() { return this.automobileForm.get('fuel'); }
  get year() { return this.automobileForm.get('year'); }
  get driven() { return this.automobileForm.get('driven'); }
  get description() { return this.automobileForm.get('description'); }
  get spare() { return this.automobileForm.get('spare'); }
  get price() { return this.automobileForm.get('price'); }
  get emi() { return this.automobileForm.get('emi'); }

  save(){
    console.log(this.automobileForm);
    console.log('saved: '+ JSON.stringify(this.automobileForm.value));
  }

  initializedFormData(){
    this.automobileForm.get('userId').setValue(this.loggedInUserId)
    this.automobileForm.get('sale').setValue(this.sale)
    this.automobileForm.get('rent').setValue(this.rent)
    this.automobileForm.get('vehicle').setValue(this.vehicle)
    this.automobileForm.get('brand').setValue(this.brand)
    this.automobileForm.get('model').setValue(this.model)
    this.automobileForm.get('fuel').setValue(this.fuel)
    this.automobileForm.get('year').setValue(this.year)
    this.automobileForm.get('driven').setValue(this.driven)
    this.automobileForm.get('description').setValue(this.description)
    this.automobileForm.get('spare').setValue(this.spare)
    this.automobileForm.get('price').setValue(this.price)
    this.automobileForm.get('emi').setValue(this.emi)
    
  }

  submit() {
    this.isSubmitted = true;
    if(!this.isLoading){
      if (this.checkIfFormValid()) {
        this.createAutomobileList()
      }
    }
  
  }
  
  createAutomobileList() {
     
    this.errorMessage = null;
    this.isLoading = true;
    this._httpService.createAutomobileList(this.automobileForm.value)
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
    if (this.automobileForm.invalid) {
      const controls =  this.automobileForm.controls;
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