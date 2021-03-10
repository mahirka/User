import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDetailsComponent } from './new/basic-details/basic-details.component';
import { PlanSelectionComponent } from './new/plan-selection/plan-selection.component';
import { ExtraDetailsComponent } from './new/extra-details/extra-details.component';
import { EditComponent } from './edit/edit.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewComponent } from './view/view.component';
import { StoreModule } from '@ngrx/store';
import { businessListingReducer } from './new/state/business-listing.reducer';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../core/auth.guard';
import { RouterModule, Routes } from '@angular/router';



  const routes: Routes = [

    {path:'new/basic-details',canActivate: [AuthGuard],component:BasicDetailsComponent},
    {path:'new/plan',canActivate: [AuthGuard],component:PlanSelectionComponent},
    {path:'new/extra-details',canActivate: [AuthGuard],component:ExtraDetailsComponent},
    {path:'edit',canActivate: [AuthGuard],component:EditComponent},
    {path:'view-all',canActivate: [AuthGuard],component:ViewAllComponent},
    {path:'view',canActivate: [AuthGuard],component:ViewComponent},
    
  ];

@NgModule({
  declarations: [BasicDetailsComponent, PlanSelectionComponent, ExtraDetailsComponent, EditComponent, ViewAllComponent, ViewComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('businessListingState', businessListingReducer),
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class BusinessListingModule { }
