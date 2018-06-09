import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FirstLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-login',
  templateUrl: 'first-login.html',
})
export class FirstLoginPage {
  cpf:string ="";
  senha:string="";
  senhaConfirma:string="";
  show:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public alertCtrl: AlertController) {
  }

  
  doUpdateSenha(){
    
    let alert = this.alertCtrl.create({
      title: 'Senha ou CPF Invalidos',
      subTitle: 'Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!',
      buttons: ['OK']
    });
      if (this.cpf.length > 0 && this.senha.length > 0){
        let loginData = new FormData();
        loginData.append('cpf',this.cpf);
        loginData.append('senha',this.senha);
        this.http.post(MyApp.URL+'firstLogin.php', loginData)
        .subscribe(
        data => {
          console.log(data);
          if (data !== 0){
            MyApp.cdFuncionario = data[0].cdFuncionario;
            MyApp.foto = data[0].foto;
            MyApp.nome = data[0].nomeFuncionario;
            console.log(MyApp.cdFuncionario);
            this.navCtrl.setRoot('MenulateralPage');
            
          }else{
            alert.present();
          }
        });
      } else {
        alert.present();
      }

  }

  

}
