import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  doUpdateSenha(){

  }

  

}
