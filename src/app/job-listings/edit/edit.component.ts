import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getAppState, State } from 'src/app/state/app.reducer';
import { HttpService } from '../http.service';
import { Job } from '../job';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  jobForm:FormGroup;
  job= new Job();
  errorMessage=null;
  isLoading = false;
  isSubmitted=false;
  loggedInUserId: string = "" 


  constructor(private toastr: ToastrService,private _httpService: HttpService,private store: Store<State>,private _activatedRoute: ActivatedRoute,private _router: Router,) { }

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

  initializedFormData(){
    this.jobForm.get('userId').setValue(this.loggedInUserId)
    this.jobForm.get('title').setValue(this.title)
    this.jobForm.get('name').setValue(this.name)
    this.jobForm.get('experience').setValue(this.experience)
    this.jobForm.get('salary').setValue(this.salary)
    this.jobForm.get('food').setValue(this.food)
    this.jobForm.get('contact').setValue(this.contact)
    this.jobForm.get('location').setValue(this.location)
    this.jobForm.get('description').setValue(this.description)
    this.jobForm.get('titles').setValue(this.titles)
    this.jobForm.get('label').setValue(this.label)
    this.jobForm.get('year').setValue(this.year)
    this.jobForm.get('link').setValue(this.link)

    
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
