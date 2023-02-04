import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewnotePageRoutingModule } from './viewnote-routing.module';

import { ViewnotePage } from './viewnote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewnotePageRoutingModule
  ],
  declarations: [ViewnotePage]
})
export class ViewnotePageModule {}
