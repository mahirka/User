import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl,  FormGroup,  Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from './password-reset';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.reducer';
import { Router } from '@angular/router';
import { CustomValidators } from '../../authentication/custom-validators';
import { getAppState } from '../../state/app.reducer';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetForm: FormGroup;
  reset= new ResetPassword();
  isConfirmPasswordSame = true;
  errorMessage=null;
  isLoading = false;
  loggedInUserId: string = ""
  constructor(private toastr: ToastrService ,private store: Store<State>, private _httpService: HttpService,private fb: FormBuilder,private _router: Router,) { }

  ngOnInit(): void {
    this.resetForm= new FormGroup({
      password: new FormControl(this.reset.password, [Validators.required,
        Validators.minLength(5),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Za-z]/, { hasCapitalCase: true }),
        ]),
        confirmPassword: new FormControl(this.reset.confirmPassword, [Validators.required,
          Validators.minLength(5),
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Za-z]/, { hasCapitalCase: true }),
          ]),
          userId:new FormControl(null)
    });

    this.resetForm.get('confirmPassword').valueChanges.subscribe(value=>{
      console.log("confirmPassword")
      console.log(value)
      console.log(this.resetForm.get('password').value)
      if(this.resetForm.get('password').value != value ){
        console.log("confirmPassword not equal")
        this.isConfirmPasswordSame = false;
      }else{
        console.log("confirmPassword equal")
        this.isConfirmPasswordSame = true;
      }
      
    })
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

get password() { return this.resetForm.get('password'); }
get confirmPassword() { return this.resetForm.get('confirmPassword'); }
get userId() { return this.resetForm.get('userId'); }

save(){
  console.log(this.resetForm);
  console.log('saved: '+ JSON.stringify(this.resetForm.value));
}

submit() {
  
  if(!this.isLoading){
    console.log("not is loading")
    if (this.checkIfFormValid()) {
      console.log("form valid")
      this.resetPassword()
    }
  }

}
initializedFormData(){
  this.resetForm.get('userId').setValue(this.loggedInUserId)
}

resetPassword() {
   
  console.log("reset reached")
  this.errorMessage = null;
  this.isLoading = true;
  this._httpService.resetPassword(this.resetForm.value)
    .subscribe(
      data => {
        console.log("data reached")

        this.isLoading = false;
        if (data['response'] == 'success') {
          //data['tocken']
          
          this.toastr.success("Success! Your password is changed");

        }

      },

      error => {
        console.log("error reached")
        console.log(error.error)

        this.isLoading = false;
        this.errorMessage = error.error;
      },

    );



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
checkIfFormValid(){
  if (this.resetForm.invalid) {
    
    this.errorMessage = "somthing went wrong !";

    return false;
  }
  
  return true
}


}