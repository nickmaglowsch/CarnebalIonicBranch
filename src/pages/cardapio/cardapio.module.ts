import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardapioPage } from './cardapio';

@NgModule({
  declarations: [
    CardapioPage,
  ],
  imports: [
    IonicPageModule.forChild(CardapioPage),
  ],
})
export class CardapioPageModule {}
