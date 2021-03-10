import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result/search-result.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { FilterResultModalComponent } from './filter-result-modal/filter-result-modal.component';




  const routes: Routes = [
      {path:'',canActivate: [AuthGuard],component:SearchResultComponent},
      {path:'',canActivate: [AuthGuard],component:FilterResultModalComponent},
  
  ];

@NgModule({
  declarations: [SearchResultComponent, FilterResultModalComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SearchModule { }
