import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ReactiveFormsModule } from '@angular/forms';



  const routes: Routes = [
    
      {path:'view',canActivate: [AuthGuard],component:ProfileViewComponent},
    {path:'edit',canActivate: [AuthGuard],component:ProfileEditComponent},
    {path:'reset',canActivate: [AuthGuard],component:PasswordResetComponent},
    
    
  ];

@NgModule({
  declarations: [ProfileViewComponent, ProfileEditComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ]
})
export class ProfileModule { }
