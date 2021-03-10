
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthGuard } from '../core/auth.guard';
import { businessListingReducer } from '../business-listing/new/state/business-listing.reducer';
import { StoreModule } from '@ngrx/store';



const routes: Routes = [
  {path:'home',canActivate: [AuthGuard],component:MainHomeComponent},
  {path:'home-page',canActivate: [AuthGuard],component:HomePageComponent},
  
  //docs module


//businessListing module
  
  

];


@NgModule({
  declarations: [ MainHomeComponent,
       HomePageComponent,
       ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('businessListingState', businessListingReducer),


  ]
})
export class HomeModule { }
