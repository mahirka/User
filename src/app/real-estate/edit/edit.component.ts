import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getAppState, State } from 'src/app/state/app.reducer';
import { HttpService } from '../http.service';
import { RealEstate } from '../real-estate';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  realForm:FormGroup;
  real= new RealEstate();
  errorMessage=null;
  isLoading = false;
  isSubmitted=false;
  loggedInUserId: string = ""

  constructor(private toastr: ToastrService,private _httpService: HttpService,private store: Store<State>,private _activatedRoute: ActivatedRoute,private _router: Router,) { }

  ngOnInit(): void {

    this.realForm= new FormGroup({
      rent: new FormControl(this.real.rent, [Validators.required]),  
      type: new FormControl(this.real.type, [Validators.required]),
      area: new FormControl(this.real.area, [Validators.required]),
      project: new FormControl(this.real.project, [Validators.required]),
      status: new FormControl(this.real.status, [Validators.required]),
      floors: new FormControl(this.real.floors, [Validators.required]),
      bath: new FormControl(this.real.bath, [Validators.required]),
      atbath: new FormControl(this.real.atbath, [Validators.required]),
      furnish: new FormControl(this.real.furnish, [Validators.required]),
      car: new FormControl(this.real.car, [Validators.required]),
      bike: new FormControl(this.real.bike, [Validators.required]),
      description: new FormControl(this.real.description, [Validators.required]),
      name: new FormControl(this.real.name, [Validators.required]),
      distance: new FormControl(this.real.distance, [Validators.required]),
      face: new FormControl(this.real.face, [Validators.required]),
      boundary: new FormControl(this.real.boundary, [Validators.required]),
      layout: new FormControl(this.real.layout, [Validators.required]),
      purpose: new FormControl(this.real.purpose, [Validators.required]),
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

  get rent() { return this.realForm.get('rent'); }
  get type() { return this.realForm.get('type'); }
  get area() { return this.realForm.get('area'); }
  get project() { return this.realForm.get('project'); }
  get status() { return this.realForm.get('status'); }
  get floors() { return this.realForm.get('floors'); }
  get bath() { return this.realForm.get('bath'); }
  get atbath() { return this.realForm.get('atbath'); }
  get furnish() { return this.realForm.get('furnish'); }
  get car() { return this.realForm.get('car'); }
  get bike() { return this.realForm.get('bike'); }
  get description() { return this.realForm.get('description'); }
  get name() { return this.realForm.get('name'); }
  get distance() { return this.realForm.get('distance'); }
  get face() { return this.realForm.get('face'); }
  get boundary() { return this.realForm.get('boundary'); }
  get layout() { return this.realForm.get('layout'); }
  get purpose() { return this.realForm.get('purpose'); }


  save(){
    console.log(this.realForm);
    console.log('saved: '+ JSON.stringify(this.realForm.value));
  }

  initializedFormData(){
    this.realForm.get('userId').setValue(this.loggedInUserId)
    this.realForm.get('rent').setValue(this.rent)
    this.realForm.get('type').setValue(this.type)
    this.realForm.get('area').setValue(this.area)
    this.realForm.get('project').setValue(this.project)
    this.realForm.get('status').setValue(this.status)
    this.realForm.get('floors').setValue(this.floors)
    this.realForm.get('bath').setValue(this.bath)
    this.realForm.get('atbath').setValue(this.atbath)
    this.realForm.get('furnish').setValue(this.furnish)
    this.realForm.get('car').setValue(this.car)
    this.realForm.get('bike').setValue(this.bike)
    this.realForm.get('description').setValue(this.description)
    this.realForm.get('name').setValue(this.name)
    this.realForm.get('distance').setValue(this.distance)
    this.realForm.get('face').setValue(this.face)
    this.realForm.get('boundary').setValue(this.boundary)
    this.realForm.get('layout').setValue(this.layout)
    this.realForm.get('purpose').setValue(this.purpose)
    

    
  }

  submit() {
    this.isSubmitted = true;
    if(!this.isLoading){
      if (this.checkIfFormValid()) {
        this.createRealEstateList()
      }
    }
  
  }
  
  createRealEstateList() {
     
    this.errorMessage = null;
    this.isLoading = true;
    this._httpService.createRealEstateList(this.realForm.value)
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
    if (this.realForm.invalid) {
      const controls =  this.realForm.controls;
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

