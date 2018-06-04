import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cpf: string = "";
  senha: string = "";
  data: Observable<any>;
  urlLogo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient ,public alertCtrl: AlertController) {
    this.urlLogo = MyApp.URL + "Untitled-1.png";
  }

  doLogin(){
    let alert = this.alertCtrl.create({
      title: 'Senha ou CPF incorretos',
      subTitle: 'Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!',
      buttons: ['OK']
    });
      if (this.cpf.length > 0 && this.senha.length > 0){
        let loginData = new FormData();
        loginData.append('cpf',this.cpf);
        loginData.append('senha',this.senha);
        this.data=this.http.post(MyApp.URL+'login.php', loginData)
        this.data.subscribe(
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
