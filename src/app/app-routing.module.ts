import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: 'authentication',loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  {path:'',component:LayoutComponent,children:[

  {path: 'dashboard/profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path: 'docs', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)},
  {path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'sample', loadChildren: () => import('./sample-listing/sample-listing.module').then(m => m.SampleListingModule)},
  {path: 'dashboard/business-listing', loadChildren: () => import('./business-listing/business-listing.module').then(m => m.BusinessListingModule)},
  {path: 'products-and-services', loadChildren: () => import('./products-and-services/products-and-services.module').then(m => m.ProductsAndServicesModule)},

  {path: '',loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  ]},
// {path: ion'', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }