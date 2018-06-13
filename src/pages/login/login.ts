import { LoaderProvider } from './../../providers/loader/loader';
import { AlertBuilderProvider } from './../../providers/alert-builder/alert-builder';
import { AuthProvider } from './../../providers/auth/auth';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    cpf: string = "";
    senha: string = "";
    urlLogo: string;
    constructor(private loader:LoaderProvider,private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
        this.urlLogo = MyApp.URL + "Untitled-1.png";
    }

    doLogin() {
        
        let alert = new AlertBuilderProvider(this.alertCtrl, 'Senha ou CPF incorretos', 'Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!');
        alert.newAlert()
        if (this.cpf.length > 0 && this.senha.length > 0) {
            this.loader.showLoading("Entrando...");
            this.auth.login(this.cpf, this.senha)
                .subscribe(data => {
                    if (data !== 0) {
                        if (data[0].primeiroLogin != 1) {
                            this.navCtrl.setRoot('MenulateralPage');
                        } else {
                            this.navCtrl.setRoot('FirstLoginPage');
                        }
                    } else {
                        alert.newAlert().present();
                        this.loader.dismissLoading();
                    }
                });
        } else {
            alert.newAlert().present();
        }
    }

}
