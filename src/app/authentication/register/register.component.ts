
import {FormGroup,FormControl, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Register } from './register';
import { CustomValidators } from '../custom-validators';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../layout/layout.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  mobileFormGroup: FormGroup;
  otpFormGroup: FormGroup;
  reg= new Register();
  isConfirmPasswordSame = true;
  errorMessage=null;
  isLoading = false;
  resetStep = 1;
  constructor(private toastr: ToastrService , private _httpService: HttpService,private fb: FormBuilder,private _router: Router,) { }


  ngOnInit(): void {
    this.mobileFormGroup= new FormGroup({
      
      mobile: new FormControl(this.reg.mobile, [Validators.required, Validators.pattern("([0-9]{10,10})+")]),
      
    });

    this.otpFormGroup= new FormGroup({
      
      otp: new FormControl(this.reg.otp, [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(6), Validators.maxLength(6)]),
      tocken: new FormControl(null, null),
      
    });
      this.registerForm= new FormGroup({
        name: new FormControl(this.reg.name, [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl(this.reg.email, [Validators.required,Validators.pattern("(^$)|(^.*@.*\..*$)")]),
        mobile: new FormControl(this.reg.mobile, [Validators.required, Validators.pattern("([0-9]{10,10})+")]),
        password: new FormControl(this.reg.password, [Validators.required,
          Validators.minLength(5),
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Za-z]/, { hasCapitalCase: true }),
          ]),
          confirmPassword: new FormControl(this.reg.confirmPassword, [Validators.required,
            Validators.minLength(5),
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Za-z]/, { hasCapitalCase: true }),
            ]),
      });

      this.registerForm.get('confirmPassword').valueChanges.subscribe(value=>{
        console.log("confirmPassword")
        console.log(value)
        console.log(this.registerForm.get('password').value)
        if(this.registerForm.get('password').value != value ){
          console.log("confirmPassword not equal")
          this.isConfirmPasswordSame = false;
        }else{
          console.log("confirmPassword equal")
          this.isConfirmPasswordSame = true;
        }
        
      })

  }


  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get mobile() { return this.registerForm.get('mobile'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get otp() { return this.otpFormGroup.get('otp'); }

  save(){
    console.log(this.registerForm);
    console.log('saved: '+ JSON.stringify(this.registerForm.value));
  }

  submit() {
    
    if(!this.isLoading){
      console.log("not is loading")
      if (this.checkIfFormValid()) {
        console.log("form valid")
        this.register()
      }
    }
  
  }
  sendOtpToRegister() {
    if (!this.isLoading) {
      if (this.mobileFormGroup.get('mobile').invalid) {

        this.errorMessage = "something went wrong !";
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        this._httpService.sendOtpToRegister(this.mobileFormGroup.value)
          .subscribe(

            data => {

              this.isLoading = false;
              if (data['response'] == 'success') {
                //data['tocken']
                this.otpFormGroup.get('tocken').setValue(data['tocken']);
                this.resetStep = 2;

              }

            },

            error => {
              this.isLoading = false;
              this.errorMessage = error.error;

            },

          );
      }
    }
      
  }


  
  
  verifyOtpToRegister() {
    if (!this.isLoading) {
      if (this.otpFormGroup.get('otp').invalid) {

        this.errorMessage = "something went wrong !";
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        this._httpService.verifyOtpToRegister(this.otpFormGroup.value)
          .subscribe(
            data => {

              this.isLoading = false;

              if (data['response'] == 'success') {
                this.resetStep = 3
              }

            },
            error => {
              this.isLoading = false;
              this.errorMessage = error.error;

            },
          );
      }
    }
      
  }
  
  register() {
     
    console.log("login reached")
    this.errorMessage = null;
    this.isLoading = true;
    this._httpService.register(this.registerForm.value)
      .subscribe(
        data => {
          console.log("data reached")
  
          this.isLoading = false;
          if (data['response'] == 'success') {
            //data['tocken']
            localStorage.setItem('tocken', data['tocken']);
            this._router.navigate(['/authentication/login'])
            this.toastr.success("Success! You are registration is complete");
  
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
  checkIfFormValid(){
    if (this.registerForm.invalid) {
      
      this.errorMessage = "somthing went wrong !";
  
      return false;
    }
    
    return true
  }
  

}
