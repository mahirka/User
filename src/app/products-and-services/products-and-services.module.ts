import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [

  {path:'new',canActivate: [AuthGuard],component:NewComponent},
  {path:'view',canActivate: [AuthGuard],component:ViewComponent},
  {path:'edit',canActivate: [AuthGuard],component:EditComponent},

];

@NgModule({
  declarations: [NewComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsAndServicesModule { }
