import { LoaderProvider } from './../../providers/loader/loader';
import { ProductProvider } from './../../providers/product/product';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-comanda',
    templateUrl: 'comanda.html',
})
export class ComandaPage {
    lastPage: string;
    items: any;
    itemsSent: any;
    show: boolean;
    idComanda: any;
    quantidade: number;
    constructor(private auth: AuthProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams, public product: ProductProvider, private loader:LoaderProvider) {
        this.idComanda = navParams.get('idComanda');
        this.items = new Array();
        this.itemsSent = new Array();
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
            this.product.getProducts("").subscribe(result => { 
                this.items = this.product.getList();
            });
            this.show = false;
        }
    }

    ionViewWillLeave(){
        this.itemsSent.splice(0,this.itemsSent.length);
        this.items.splice(0,this.items.length);
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
            let quantidade = Number(item.qtProduto);
            return (quantidade > 0);
        })
        for (const item of this.itemsSent) {
            item.cdComanda = this.idComanda;
        }
        this.product.addProduct(this.itemsSent).subscribe(result => {
            this.navCtrl.pop();
        });
    }


    abrirCardapio(e) {
        this.lastPage = "";
        this.navCtrl.push('CardapioPage', { "items": this.items });
        this.events.subscribe('Items:fera', (items) => {
            this.product.getProducts(this.idComanda).subscribe(result => { 
                for (const results of result) {
                    this.items.push(results);
                }
            });
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
