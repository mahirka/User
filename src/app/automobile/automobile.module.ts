import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../core/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [

  {path:'new',canActivate: [AuthGuard],component:NewComponent},
  {path:'edit',canActivate: [AuthGuard],component:EditComponent},
  {path:'view-all',canActivate: [AuthGuard],component:ViewAllComponent},

  
];

@NgModule({
  declarations: [NewComponent, EditComponent, ViewAllComponent],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AutomobileModule { }
