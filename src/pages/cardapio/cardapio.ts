import { MyApp } from './../../app/app.component';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  items:any;
  show:boolean;
  static  originalList:any;
  itemsSent:any = new Array;
  url:string;
  itemsToRemove:any;
  lastPage:any;

  constructor(public events: Events,public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.url = MyApp.URL;
    this.items = CardapioPage.originalList;
    this.lastPage = this.navCtrl.last();
  }

  ionViewWillEnter(){
    if (MyApp.cdFuncionario == undefined){
      this.navCtrl.setRoot('LoginPage');
    }
    if (this.lastPage != undefined){
      this.show = this.lastPage.id == 'ComandaPage';
      if (this.show){
        this.initializeItems();

      }
    }else{
      this.http.get(MyApp.URL+"getProducts.php")
      .subscribe(result => {
        this.items = result; 
        console.log(result);
        CardapioPage.originalList = result;
        this.items = CardapioPage.originalList;
      })
    }
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

  addItem(e,i){
    console.log(e._value);
    if (e._value){
      console.log(i);
      this.itemsSent.push(i);
      console.log(this.itemsSent);
    }else {
      this.itemsSent.splice(this.itemsSent.indexOf(i), 1);
      console.log(this.itemsSent);
    }
  }

  sendItems(){
    this.events.publish('Items:fera', this.itemsSent);
    this.navCtrl.pop();
  }
}
