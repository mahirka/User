import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validators';
import { HttpService } from '../http.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../layout/layout.component.css'],
  encapsulation:ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  log= new Login();
  errorMessage=null;
  isLoading = false;

  constructor(private toastr: ToastrService,private _httpService: HttpService,private _router: Router,) {
    
   }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      mobile: new FormControl(this.log.mobile, [Validators.required, Validators.pattern("([0-9]{10,10})+")]),
      password: new FormControl(this.log.password, [Validators.required,
        Validators.minLength(5),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Za-z]/, { hasCapitalCase: true }),
        ]),
       
    });

  }

  get mobile() { return this.loginForm.get('mobile'); }
  get password() { return this.loginForm.get('password'); }


save(){
  console.log(this.loginForm);
  console.log('saved: '+ JSON.stringify(this.loginForm.value));
}

submit() {
    
  if(!this.isLoading){
    console.log("not is loading")
    if (this.checkIfFormValid()) {
      console.log("form valid")
      this.login()
    }
  }

}

login() {
   
  console.log("login reached")
  this.errorMessage = null;
  this.isLoading = true;
  this._httpService.login(this.loginForm.value)
    .subscribe(
      data => {
        console.log("data reached")

        this.isLoading = false;
        if (data['response'] == 'success') {
          //data['tocken']
          localStorage.setItem('tocken', data['tocken']);
          this._router.navigate(['/home'])
          this.toastr.success("Logged in Successful");

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
  if (this.loginForm.invalid) {
    
    this.errorMessage = "somthing went wrong !";

    return false;
  }
  
  return true
}

    

}
