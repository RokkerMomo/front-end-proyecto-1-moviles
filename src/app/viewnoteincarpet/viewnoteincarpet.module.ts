import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewnoteincarpetPageRoutingModule } from './viewnoteincarpet-routing.module';

import { ViewnoteincarpetPage } from './viewnoteincarpet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewnoteincarpetPageRoutingModule
  ],
  declarations: [ViewnoteincarpetPage]
})
export class ViewnoteincarpetPageModule {}
