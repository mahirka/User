import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/home/http.service';
import { SilverList } from '../silver/silver';

@Component({
  selector: 'app-new-review-modal',
  templateUrl: './new-review-modal.component.html',
  styleUrls: ['./new-review-modal.component.css']
})
export class NewReviewModalComponent implements OnInit {

  silverForm:FormGroup;
  silver= new SilverList();
  isLoading=false;
  errorMessage=null;

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
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