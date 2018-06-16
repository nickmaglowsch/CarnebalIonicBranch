import { LoaderProvider } from './../../providers/loader/loader';
import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../providers/auth/user';
import { AlertBuilderProvider } from './../../providers/alert-builder/alert-builder';
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
    cpf: string = "";
    senha: string = "";
    senhaConfirma: string = "";
    show: boolean = false;
    user: User;
    alert: AlertBuilderProvider;
    constructor(private loader:LoaderProvider,private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
        this.alert = new AlertBuilderProvider(this.alertCtrl, 'Senha ou CPF incorretos', 'Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!');
    }


    doUpdateSenha() {
        this.loader.showLoading("Entrando...");
        if (this.verificarCampos) {
            
            this.auth.login(this.cpf, this.senha).subscribe(
                data => {
                    this.user = null;
                    if (data !== 0) {
                        this.navCtrl.setRoot('MenulateralPage');
                    } else {
                        this.alert.newAlert().present();
                    }
                });
        }
    }

    verificarCampos(): boolean {
        if ((this.cpf.length > 0 && this.senha.length > 0 && this.senhaConfirma.length > 0)
            && (this.senha.length == this.senhaConfirma.length)) {
            this.alert.changeTitle("Senha ou CPF incorretos");
            this.alert.changeSubTitle("Por favor digite seu cpf e sua senha para logar, ou fale com o ADMIN!");
            return true;
        } else {
            this.alert.changeTitle("A senha e a sua confirmação não estão iguais");
            this.alert.changeSubTitle("A senha e a sua confirmação devem ser iguais!");
            return false;
        }
    }


}
