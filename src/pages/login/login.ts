import { AlertBuilderProvider } from './../../providers/alert-builder/alert-builder';
import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../providers/auth/user';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
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
    loading: Loading;
    user: User = undefined;
    constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.urlLogo = MyApp.URL + "Untitled-1.png";
    }

    doLogin() {
        this.showLoading();
        let alert = new AlertBuilderProvider(this.alertCtrl, 'Senha ou CPF incorretos', 'Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!');
        alert.newAlert()
        if (this.cpf.length > 0 && this.senha.length > 0) {
            this.auth.login(this.cpf, this.senha)
                .subscribe(data => {
                    this.user = null;
                    if (data !== 0) {
                        if (data[0].primeiroLogin != 1) {
                            this.navCtrl.setRoot('MenulateralPage');
                        } else {
                            this.navCtrl.setRoot('FirstLoginPage');
                        }
                    } else {
                        alert.newAlert().present();
                    }
                });
        } else {
            alert.newAlert().present();
        }
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Entrando...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
}
