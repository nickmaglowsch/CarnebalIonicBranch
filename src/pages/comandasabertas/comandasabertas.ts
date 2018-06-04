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
  comandas:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,private alertCtrl: AlertController) {
    
  }
  

  ionViewWillEnter(){
    if (MyApp.cdFuncionario == undefined){
      this.navCtrl.setRoot('LoginPage');
    }else{
      this.http.get(MyApp.URL+"getComandasAbertas.php")
        .subscribe(result => {
          this.comandas = result; 
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
            console.log(c);
            this.http.post(MyApp.URL + "closeComanda.php",c)
            .subscribe(
              data => {
                if (data == 1){
                  this.comandas.splice(this.comandas.indexOf(c.cdComanda), 1);
                }
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  edit(c){
    this.navCtrl.setRoot('ComandaPage',{"idComanda" : c.cdComanda});
  }
  

}
