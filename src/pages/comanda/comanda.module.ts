import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComandaPage } from './comanda';

@NgModule({
  declarations: [
    ComandaPage,
  ],
  imports: [
    IonicPageModule.forChild(ComandaPage),
  ],
})
export class ComandaPageModule {}
