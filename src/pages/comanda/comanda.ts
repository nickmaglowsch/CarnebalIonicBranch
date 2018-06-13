import { LoaderProvider } from './../../providers/loader/loader';
import { ProductProvider } from './../../providers/product/product';
import { AuthProvider } from './../../providers/auth/auth';
import { MyApp } from './../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-comanda',
    templateUrl: 'comanda.html',
})
export class ComandaPage {
    lastPage: string;
    items: any = new Array;
    itemsSent: any;
    url: string;
    show: boolean;
    idComanda: any;
    quantidade: number = 0;
    constructor(private auth: AuthProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams, public product: ProductProvider, private loader:LoaderProvider) {
        this.idComanda = navParams.get('idComanda');
        this.url = MyApp.URL;
        this.lastPage = this.navCtrl.last().id;
    }

    ionViewWillEnter() {
        if (this.auth.getUserInfo() == null) {
            this.navCtrl.setRoot('LoginPage');
        }
        if (this.lastPage == 'ComandasabertasPage') {
            this.show = true;
            this.product.getProducts(this.idComanda).subscribe(result => { this.items = result; });
        }
        if (this.lastPage == 'NewcomandaPage') {
            this.product.getProducts("").subscribe(result => { });
            this.items = this.product.getList();
            this.show = false;
        }
    }

    addQty(i) {
        i.qtProduto++;
    }

    subQty(i) {
        if (i.qtProduto != 0)
            i.qtProduto--;
    }

    sendComanda() {
        this.loader.showLoading("Registrando Comanda...");
        this.itemsSent = this.items.filter((item) => {
            return (item.qtProduto > 0);
        })
        for (const item of this.itemsSent) {
            item.cdComanda = this.idComanda;
        }
        this.product.addProduct(this.itemsSent).subscribe(result => {
            this.navCtrl.pop();
        });
        this.itemsSent = null;
        this.items = null;
    }


    abrirCardapio(e) {
        this.lastPage = "";
        this.navCtrl.push('CardapioPage', { "items": this.items });
        this.events.subscribe('Items:fera', (items) => {
            for (const iterator of items) {
                this.items.push(iterator);
            }
        });
    }

    initializeItems(): any {
        this.items = this.product.getList();
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
