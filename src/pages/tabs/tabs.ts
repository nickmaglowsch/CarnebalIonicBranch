import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root = 'CardapioPage';
    tab2Root = 'NewcomandaPage';
    tab3Root = 'ComandasabertasPage';
    myIndex: number;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.myIndex = navParams.data.tabIndex || 0;
    }

}
