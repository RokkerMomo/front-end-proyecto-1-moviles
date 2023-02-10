import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarpetasPageRoutingModule } from './carpetas-routing.module';

import { CarpetasPage } from './carpetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarpetasPageRoutingModule
  ],
  declarations: [CarpetasPage]
})
export class CarpetasPageModule {}
