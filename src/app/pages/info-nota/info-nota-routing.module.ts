import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoNotaPage } from './info-nota.page';

const routes: Routes = [
  {
    path: '',
    component: InfoNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoNotaPageRoutingModule {}
