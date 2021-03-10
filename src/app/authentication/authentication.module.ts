
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import {ForgotPasswordComponent,} from './forgot-password/forgot-password.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../core/auth.guard';


const routes: Routes = [
  {path:'',canActivate: [AuthGuard],component:LayoutComponent,
  children:[
    {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  ]
},
];

@NgModule({
  declarations: [LoginComponent,RegisterComponent,ForgotPasswordComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    
    
  ]
})
export class AuthenticationModule { }
