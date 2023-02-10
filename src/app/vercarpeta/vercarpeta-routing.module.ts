import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VercarpetaPage } from './vercarpeta.page';

const routes: Routes = [
  {
    path: '',
    component: VercarpetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VercarpetaPageRoutingModule {}
