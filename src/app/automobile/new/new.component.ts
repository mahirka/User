import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/home/http.service';
import { Automobile } from '../edit/automobile-edit';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  automobileForm:FormGroup;
  automobile= new Automobile();
  errorMessage=null;
  isLoading = false;
  isSubmitted = false;

  constructor(private toastr: ToastrService,private _httpService: HttpService,private _router: Router,) { }

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

}
