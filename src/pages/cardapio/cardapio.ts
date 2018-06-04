import { MyApp } from './../../app/app.component';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  items:any;
  static  originalList:any;
  url:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
    this.url = MyApp.URL;
    this.http.get(MyApp.URL+"getProducts.php")
      .subscribe(result => {
        this.items = result; 
        console.log(result);
        CardapioPage.originalList = result;
      })
  
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
