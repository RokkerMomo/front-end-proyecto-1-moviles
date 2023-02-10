import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VercarpetaPageRoutingModule } from './vercarpeta-routing.module';

import { VercarpetaPage } from './vercarpeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VercarpetaPageRoutingModule
  ],
  declarations: [VercarpetaPage]
})
export class VercarpetaPageModule {}
