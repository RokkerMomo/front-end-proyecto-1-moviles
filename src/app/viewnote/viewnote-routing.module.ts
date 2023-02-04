import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewnotePage } from './viewnote.page';

const routes: Routes = [
  {
    path: '',
    component: ViewnotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewnotePageRoutingModule {}
