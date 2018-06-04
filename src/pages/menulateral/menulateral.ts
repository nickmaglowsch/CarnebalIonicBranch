import { MyApp } from './../../app/app.component';
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
  foto:string;
  nome:string;
  rootPage = 'TabsPage'

  @ViewChild(Nav) nav:Nav;

  pages: PageInterface[] = [
    {title:'Cardapio', PageName: 'TabsPage', tabComponent: 'CardapioPage', index: 0, icon:'ios-cafe' },
    {title:'Nova Comanda', PageName: 'TabsPage', tabComponent: 'NewComandaPage', index: 1, icon:'md-add-circle' },
    {title:'Comandas Abertas', PageName: 'TabsPage', tabComponent: 'ComandasAbertasPage', index: 3, icon:'ios-list-box' },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.foto = MyApp.URL + MyApp.foto;
    this.nome = MyApp.nome;
  }

  openPage(p){

  }

  isActive(p){
    
  }

  logout(){
    this.navCtrl.setRoot('LoginPage');
  }
}
