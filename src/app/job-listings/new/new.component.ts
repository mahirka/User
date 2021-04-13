import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';
import { Job } from '../job';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  jobForm:FormGroup;
  job= new Job();
  errorMessage=null;
  isLoading = false;
  isSubmitted=false;

  constructor(private toastr: ToastrService,private _httpService: HttpService,private _router: Router,) { }

  ngOnInit(): void {

    this.jobForm= new FormGroup({
      title: new FormControl(this.job.title, [Validators.required]),  
      name: new FormControl(this.job.name, [Validators.required]),
      experience: new FormControl(this.job.experience, [Validators.required]),
      salary: new FormControl(this.job.salary, [Validators.required]),
      food: new FormControl(this.job.food, [Validators.required]),
      contact: new FormControl(this.job.contact, [Validators.required]),
      location: new FormControl(this.job.location, [Validators.required]),
      description: new FormControl(this.job.description, [Validators.required]),
      titles: new FormControl(this.job.titles, [Validators.required]),
      label: new FormControl(this.job.label, [Validators.required]),
      year: new FormControl(this.job.year, [Validators.required]),
      link: new FormControl(this.job.link, [Validators.required]),
      
    });
  }

  get title() { return this.jobForm.get('title'); }
  get name() { return this.jobForm.get('name'); }
  get experience() { return this.jobForm.get('experience'); }
  get salary() { return this.jobForm.get('salary'); }
  get food() { return this.jobForm.get('food'); }
  get contact() { return this.jobForm.get('contact'); }
  get location() { return this.jobForm.get('location'); }
  get description() { return this.jobForm.get('description'); }
  get titles() { return this.jobForm.get('titles'); }
  get label() { return this.jobForm.get('label'); }
  get year() { return this.jobForm.get('year'); }
  get link() { return this.jobForm.get('link'); }

  save(){
    console.log(this.jobForm);
    console.log('saved: '+ JSON.stringify(this.jobForm.value));
  }

  submit() {
    this.isSubmitted = true;
    if(!this.isLoading){
      if (this.checkIfFormValid()) {
        this.createJobList()
      }
    }
  
  }
  
  createJobList() {
     
    this.errorMessage = null;
    this.isLoading = true;
    this._httpService.createJobList(this.jobForm.value)
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
    if (this.jobForm.invalid) {
      const controls =  this.jobForm.controls;
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

