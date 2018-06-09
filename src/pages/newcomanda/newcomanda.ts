import { MyApp } from './../../app/app.component';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-newcomanda',
  templateUrl: 'newcomanda.html',
})
export class NewcomandaPage {

  numComanda: string;
  numMesa:string;
  idComanda:any;
  data:Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,public alertCtrl: AlertController) {
    this.numComanda ='';
    this.numComanda = '';
  }
  ionViewWillEnter(){
    if (MyApp.cdFuncionario == undefined){
      this.navCtrl.setRoot('LoginPage');
    }
    this.numComanda = '';
    this.numMesa ='';
  }

  createComanda(){
    let alert = this.alertCtrl.create({
      title: 'A Comanda já está em uso',
      subTitle: 'Por favor verifique nas Comandas Abertas',
      buttons: ['OK']
    });
    if (this.numComanda != "" && this.numMesa != ""){
      let comandaData = new FormData();
      comandaData.append("numComandaFisica",this.numComanda);
      comandaData.append("numMesa",this.numMesa);
      comandaData.append("cdFuncionario",MyApp.cdFuncionario);
      console.log(MyApp.cdFuncionario);
      console.log(comandaData.get("numComandaFisica"));
      this.http.post(MyApp.URL+'newComanda.php', comandaData)
      .subscribe(
        (data) => {
          console.log(data);
          if (data !== 0){
            this.idComanda = data;
            this.navCtrl.push('ComandaPage',{"idComanda" : this.idComanda});
          }else{
            alert.present();
          }
        });
    }else{
      alert.setTitle("Numero da mesa ou Comanda incorretos");
      alert.setSubTitle("Por favor verifique como preencheu os campos")
      alert.present();
    }
  }
 
  
}
