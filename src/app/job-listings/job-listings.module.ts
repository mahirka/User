import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  {path:'new',canActivate: [AuthGuard],component:NewComponent},
  {path:'edit',canActivate: [AuthGuard],component:EditComponent},
  {path:'view-all',canActivate: [AuthGuard],component:ViewAllComponent},

  
];

@NgModule({
  declarations: [EditComponent, NewComponent, ViewAllComponent],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class JobListingsModule { }
