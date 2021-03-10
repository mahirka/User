import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreeComponent } from './free/free.component';
import { OtherComponent } from './other/other.component';
import { GoldComponent } from './gold/gold.component';
import { SilverComponent } from './silver/silver.component';
import { DiamondComponent } from './diamond/diamond.component';
import { PlatinumComponent } from './platinum/platinum.component';
import { AuthGuard } from '../core/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NewReviewModalComponent } from './new-review-modal/new-review-modal.component';



  const routes: Routes = [
    
    {path:'free/:id',canActivate: [AuthGuard],component:FreeComponent},
    {path:'other/:id',canActivate: [AuthGuard],component:OtherComponent},
    {path:'gold/:id',canActivate: [AuthGuard],component:GoldComponent},
    {path:'silver/:id',canActivate: [AuthGuard],component:SilverComponent},
    {path:'diamond/:id',canActivate: [AuthGuard],component:DiamondComponent},
    {path:'platinum/:id',canActivate: [AuthGuard],component:PlatinumComponent},
    
  ];




@NgModule({
  declarations: [FreeComponent, OtherComponent, GoldComponent, SilverComponent, DiamondComponent, PlatinumComponent, NewReviewModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class SampleListingModule { }
