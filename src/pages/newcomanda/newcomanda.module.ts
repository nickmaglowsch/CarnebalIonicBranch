import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewcomandaPage } from './newcomanda';

@NgModule({
  declarations: [
    NewcomandaPage,
  ],
  imports: [
    IonicPageModule.forChild(NewcomandaPage),
  ],
})
export class NewcomandaPageModule {}
