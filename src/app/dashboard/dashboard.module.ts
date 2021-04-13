import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { PlanViewComponent } from './plan-view/plan-view.component';
import { AuthGuard } from '../core/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts/public_api';




const routes: Routes = [

  {path:'',canActivate: [AuthGuard],component:DashboardHomeComponent},
  {path:'plan-view',canActivate: [AuthGuard],component:PlanViewComponent},
  
];



@NgModule({
  declarations: [DashboardHomeComponent, PlanViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule

  ]
})
export class DashboardModule { }
