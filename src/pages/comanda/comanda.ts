import { MyApp } from './../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { CardapioPage } from './../cardapio/cardapio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-comanda',
  templateUrl: 'comanda.html',
})
export class ComandaPage {
  lastPage: string;
  items:any = new Array;
  itemsSent:any;
  url:string;
  show:boolean;
  idComanda:any;
  quantidade:number = 0;
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.idComanda = navParams.get('idComanda');
    this.url = MyApp.URL;
    this.lastPage = this.navCtrl.last().id ;
  }

  ionViewWillEnter(){
    if (MyApp.cdFuncionario == undefined){
      this.navCtrl.setRoot('LoginPage');
    } 
    if (this.lastPage == 'ComandasabertasPage') {
      this.show = true;
      this.http.get(MyApp.URL+ 'getProducts.php?id='+this.idComanda)
      .subscribe(
        result => {
          this.items = result;
        }
      )
    } 
    if (this.lastPage == 'NewcomandaPage'){
      this.items= CardapioPage.originalList;
      this.show = false;
    }
  }

  ionViewDidEnter(){
    
  }


  addQty(i){
    i.qtProduto++;
  }

  subQty(i){
    if (i.qtProduto != 0)
      i.qtProduto--;
  }

  sendComanda(){
    this.itemsSent = this.items.filter((item) => {
      return (item.qtProduto > 0);
    })
    for (const item of this.itemsSent) {
      item.cdComanda = this.idComanda;
    }
    console.log(this.itemsSent);
    this.http.post(MyApp.URL+'addItems.php', this.itemsSent)
      .subscribe(
        (data) => {
          if (data != 0){
            this.navCtrl.pop();
          }
        });
    this.itemsSent = null;
    this.items = null;
  }


  abrirCardapio(e){
    this.lastPage = "";
    this.navCtrl.push('CardapioPage', {"items":this.items});
    this.events.subscribe('Items:fera', (items) => {
      for (const iterator of items) {
        this.items.push(iterator);
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
