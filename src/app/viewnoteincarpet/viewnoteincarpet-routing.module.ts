import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewnoteincarpetPage } from './viewnoteincarpet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewnoteincarpetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewnoteincarpetPageRoutingModule {}
