import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

export interface PageInterface {
  title:string;
  PageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menulateral',
  templateUrl: 'menulateral.html',
})
export class MenulateralPage {

  rootPage = 'TabsPage'

  @ViewChild(Nav) nav:Nav;

  pages: PageInterface[] = [
    {title:'Cardapio', PageName: 'TabsPage', tabComponent: 'CardapioPage', index: 0, icon:'home' },
    {title:'Nova Comanda', PageName: 'TabsPage', tabComponent: 'NewComandaPage', index: 0, icon:'home' },
    {title:'Comandas Abertas', PageName: 'TabsPage', tabComponent: 'ComandasAbertasPage', index: 0, icon:'home' },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(p){

  }

  isActive(p){
    
  }
}
