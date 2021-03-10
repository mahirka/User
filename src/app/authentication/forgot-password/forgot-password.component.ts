
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validators';
import { ForgotPassword } from './forgot-password';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../layout/layout.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage = null;
  mobileFormGroup: FormGroup;
  otpFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  isLoading = false;
  resetStep = 1;
    forgotPassword= new ForgotPassword();

  constructor( private _httpService: HttpService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mobileFormGroup= new FormGroup({
      
      mobile: new FormControl(this.forgotPassword.mobile, [Validators.required, Validators.pattern("([0-9]{10,10})+")]),
      
    });

    this.otpFormGroup= new FormGroup({
      
      otp: new FormControl(this.forgotPassword.otp, [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(6), Validators.maxLength(6)]),
      tocken: new FormControl(null, null),
      
    });
    
    this.passwordFormGroup= new FormGroup({
      
      password: new FormControl(this.forgotPassword.password, [Validators.required,
        Validators.minLength(5),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Za-z]/, { hasCapitalCase: true }),
        ]),
        userId: new FormControl(null, null),
      
    });
    
  }

  get mobile() { return this.mobileFormGroup.get('mobile'); }
  get otp() { return this.otpFormGroup.get('otp'); }
  get password() { return this.passwordFormGroup.get('password'); }
  

  sendOtpToResetPassword() {
    if (!this.isLoading) {
      if (this.mobileFormGroup.get('mobile').invalid) {

        this.errorMessage = "something went wrong !";
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        this._httpService.sendOtpToResetPassword(this.mobileFormGroup.value)
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


  
  
  verifyOtpToResetPassword() {
    if (!this.isLoading) {
      if (this.otpFormGroup.get('otp').invalid) {

        this.errorMessage = "something went wrong !";
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        this._httpService.verifyOtpToResetPassword(this.otpFormGroup.value)
          .subscribe(
            data => {

              this.isLoading = false;

              if (data['response'] == 'success') {
                this.passwordFormGroup.get('userId').setValue(data['userId']);
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


  
  resetPassword() {
    if (!this.isLoading) {
      if (this.passwordFormGroup.get('password').invalid) {

        this.errorMessage = "something went wrong !";
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        this._httpService.resetPassword(this.passwordFormGroup.value)
          .subscribe(
            data => {
    
              this.isLoading = false;
    
              if (data['response'] == 'success') {
                this._router.navigate(['/authentication/login']);
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

}

