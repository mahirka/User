import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';
import { RealEstate } from '../real-estate';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  realForm:FormGroup;
  real= new RealEstate();
  errorMessage=null;
  isLoading = false;
  isSubmitted=false;

  constructor(private toastr: ToastrService,private _httpService: HttpService,private _router: Router,) { }

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
  

}