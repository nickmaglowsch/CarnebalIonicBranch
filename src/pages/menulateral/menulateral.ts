import { AuthProvider } from './../../providers/auth/auth';
import { MyApp } from './../../app/app.component';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

export interface PageInterface {
	title: string;
	PageName: string;
	tabComponent?: any;
	index?: number;
	icon: string;
}

@IonicPage()
@Component({
	selector: 'page-menulateral',
	templateUrl: 'menulateral.html',
})
export class MenulateralPage {
	foto: string;
	nome: string;
	rootPage = 'TabsPage';

	@ViewChild(Nav) nav: Nav;

	pages: PageInterface[] = [
		{ title: 'Cardapio', PageName: 'TabsPage', tabComponent: 'CardapioPage', index: 0, icon: 'ios-cafe' },
		{ title: 'Nova Comanda', PageName: 'TabsPage', tabComponent: 'NewComandaPage', index: 1, icon: 'md-add-circle' },
		{ title: 'Comandas Abertas', PageName: 'TabsPage', tabComponent: 'ComandasAbertasPage', index: 2, icon: 'ios-list-box' },
	]

	constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getUserInfo() != null) {
			this.foto = this.auth.getUserInfo().foto;
			this.nome = this.auth.getUserInfo().nome;
		} else {
			this.foto = '';
			this.nome = '';
		}
	}
	ionViewWillEnter() {
		if (this.auth.getUserInfo() == null) {
			this.navCtrl.setRoot('LoginPage');
		}
	}
	openPage(page: PageInterface) {
		let params = {};

		if (page.index) {
			params = { tabIndex: page.index };
		}
		if (this.nav.getActiveChildNavs() && page.index != undefined) {
			this.nav.getActiveChildNavs()[0].select(page.index);
		} else {
			this.nav.setRoot(page.PageName, params);
		}
	}

	logout() {
		MyApp.USER = null;
		this.navCtrl.setRoot('LoginPage');
	}
	editProfile() {
		this.navCtrl.push('ProfilePage');
	}
}
