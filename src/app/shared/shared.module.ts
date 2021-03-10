import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryCardComponent} from './category-card/category-card.component';
import {DiamondCardComponent} from './diamond-card/diamond-card.component';
import {FreeCardComponent} from './free-card/free-card.component';
import {GoldCardComponent} from './gold-card/gold-card.component';
import {PlatinumCardComponent} from './platinum-card/platinum-card.component';
import {SilverCardComponent} from './silver-card/silver-card.component';


  

@NgModule({
  declarations: [CategoryCardComponent,
    DiamondCardComponent,
    FreeCardComponent,
    GoldCardComponent,
    PlatinumCardComponent,
    SilverCardComponent,
    ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoryCardComponent,
    DiamondCardComponent,
    FreeCardComponent,
    GoldCardComponent,
    PlatinumCardComponent,
    SilverCardComponent,
  ],
})
export class SharedModule {

 }
