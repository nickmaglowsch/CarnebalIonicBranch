import { MyApp } from './../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { CardapioPage } from './../cardapio/cardapio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-comanda',
  templateUrl: 'comanda.html',
})
export class ComandaPage {
  items:any;
  itemsSent:any;
  url:string;
  idComanda:any;
  quantidade:number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.items= CardapioPage.originalList;
    this.idComanda = navParams.get('idComanda');
    this.url = MyApp.URL;
  }



  addQty(i){
    i.qtProduto++;
  }

  subQty(i){
    if (i.qtProduto != 0)
      i.qtProduto--;
  }

  sendComanda(){
    console.log("botao");
    this.itemsSent = this.items.filter((item) => {
      return (item.qtProduto > 0);
    })
    for (const item of this.itemsSent) {
      item.cdComanda = this.idComanda;
      console.log(item);
    }
    console.log(this.itemsSent);
    this.http.post(MyApp.URL+'addItems.php', this.itemsSent)
      .subscribe(
        (data) => {
          if (data != 0){
            this.navCtrl.setRoot('MenulateralPage');
          }
        });
  }



  initializeItems(): any {
    this.items = CardapioPage.originalList;
  }

  searchProduct(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nomeProduto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
