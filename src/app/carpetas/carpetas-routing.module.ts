import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarpetasPage } from './carpetas.page';

const routes: Routes = [
  {
    path: '',
    component: CarpetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarpetasPageRoutingModule {}
