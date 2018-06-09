import { AuthProvider } from './../../providers/auth/auth';
import { MyApp } from './../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-comandasabertas',
    templateUrl: 'comandasabertas.html',
})
export class ComandasabertasPage {
    comandas: any;
    searchedComandas: any;
    orderBy: string = "comanda";
    constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl: AlertController) {


    }


    ionViewWillEnter() {
        if (this.auth.getUserInfo() == null) {
            this.navCtrl.setRoot('LoginPage');
        } else {
            this.http.get(MyApp.URL + "getComandasAbertas.php")
                .subscribe(result => {
                    this.comandas = result;
                    this.searchedComandas = result;
                });
        }
    }

    confirm(c) {
        let alert = this.alertCtrl.create({
            title: 'Fechar Comanda?',
            message: 'Você está fechando a comanda, logo so poderá registrar outros pedidos para o cliente abrindo outra',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.http.post(MyApp.URL + "closeComanda.php", c)
                            .subscribe(
                                data => {
                                    if (data == 1) {
                                        this.comandas.splice(this.comandas.map(function (e) { return e.cdComanda; }).indexOf(c.cdComanda), 1);
                                    }
                                }
                            );
                    }
                }
            ]
        });
        alert.present();
    }

    edit(c) {
        this.navCtrl.push('ComandaPage', { "idComanda": c.cdComanda, "from": "ComandaAberta" });
    }

    private initializeItems() {
        if (this.orderBy == 'comanda') {
            this.comandas = this.searchedComandas.sort(function (a, b) { return (Number(a.numComandaFisica) > Number(b.numComandaFisica)) ? 1 : ((Number(b.numComandaFisica) > Number(a.numComandaFisica)) ? -1 : 0); });
        } else {
            this.comandas = this.searchedComandas.sort(function (a, b) { return (a.numMesa > b.numMesa) ? 1 : ((b.numMesa > a.numMesa) ? -1 : 0); });
        }
    }

    searchComanda(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (this.orderBy == 'comanda') {
            if (val && val.trim() != '') {
                this.comandas = this.comandas.filter((comanda) => {
                    return (comanda.numComandaFisica.indexOf(val) > -1);
                })
            }
        } else {
            if (val && val.trim() != '') {
                this.comandas = this.comandas.filter((comanda) => {
                    return (comanda.numMesa.indexOf(val) > -1);
                })
            }
        }
    }

    orderList() {
        if (this.orderBy == 'comanda') {
            this.comandas = this.comandas.sort(function (a, b) { return (Number(a.numComandaFisica) > Number(b.numComandaFisica)) ? 1 : ((Number(b.numComandaFisica) > Number(a.numComandaFisica)) ? -1 : 0); });
        } else {
            this.comandas = this.comandas.sort(function (a, b) { return (a.numMesa > b.numMesa) ? 1 : ((b.numMesa > a.numMesa) ? -1 : 0); });
        }
    }
}
