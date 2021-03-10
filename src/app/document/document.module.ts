import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';


const routes: Routes = [

  {path:'about',canActivate: [AuthGuard],component:AboutComponent},
  {path:'contact',canActivate: [AuthGuard],component:ContactComponent},
  {path:'terms-and-conditions',canActivate: [AuthGuard],component:TermsAndConditionsComponent},
  {path:'privacy',canActivate: [AuthGuard],component:PrivacyComponent},
  
  
];

  



@NgModule({
  declarations: [AboutComponent, ContactComponent, TermsAndConditionsComponent, PrivacyComponent, ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DocumentModule { }
