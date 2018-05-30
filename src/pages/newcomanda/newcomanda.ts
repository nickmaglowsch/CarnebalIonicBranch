import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewcomandaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newcomanda',
  templateUrl: 'newcomanda.html',
})
export class NewcomandaPage {

  numComanda: number;
  numMesa:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  createComanda(){
    console.log(this.numComanda);
    console.log(this.numMesa);
    if (this.numComanda > 0 && this.numMesa > 0)
    this.navCtrl.setRoot("ComandaPage");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewcomandaPage');
  }
  
}
