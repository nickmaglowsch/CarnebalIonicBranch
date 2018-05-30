import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cpf: string = "";
  senha: string = "";
  a:string;
  URLlogin: string ="url/login.php";
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    localStorage.setItem("lastname", "Smith");
    this.a = localStorage.getItem("lastname");
  }

  doLogin(){
      if (this.cpf.length > 0 && this.senha.length > 0){
        //this.http.post(URLlogin,)
        this.navCtrl.setRoot('MenulateralPage');
      } else {
        let alert = this.alertCtrl.create({
          title: 'Senha ou CPF vazio',
          subTitle: 'Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!',
          buttons: ['OK']
        });
        alert.present();
      }
  }

}
