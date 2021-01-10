import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoNotaPageRoutingModule } from './info-nota-routing.module';

import { InfoNotaPage } from './info-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoNotaPageRoutingModule
  ],
  declarations: [InfoNotaPage]
})
export class InfoNotaPageModule {}
