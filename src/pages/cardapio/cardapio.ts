import { AuthProvider } from './../../providers/auth/auth';
import { ProductProvider } from './../../providers/product/product';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-cardapio',
    templateUrl: 'cardapio.html',
})
export class CardapioPage {
    items: any;
    itemsOri:any;
    show: boolean;
    itemsSent: any;
    url: string;
    lastPage: any;

    constructor(private auth: AuthProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider) {
        this.url = MyApp.URL;
        this.lastPage = this.navCtrl.last();
        this.initializeItems();
        this.itemsSent = new Array();
    }

    ionViewWillEnter() {
        if (this.auth.getUserInfo() == null) {
            this.navCtrl.setRoot('LoginPage');
        }
        if (this.lastPage != undefined)
            this.show = this.lastPage.id == 'ComandaPage';
        this.productProvider.getProducts("").subscribe(data => { this.items = data; this.itemsOri = data});
    }
    ionViewWillLeave(){
        this.itemsSent.splice(0,this.itemsSent.length);
    }
    initializeItems(): any {
        this.items = this.itemsOri;
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

    addItem(e, i) {
        if (e._value)
            this.itemsSent.push(i);
        else
            this.itemsSent.splice(this.itemsSent.indexOf(i), 1);

    }

    sendItems() {
        this.events.publish('Items:fera', this.itemsSent);
        this.navCtrl.pop();
    }
}
