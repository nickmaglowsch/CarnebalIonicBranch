import { Alerta } from './alerta';
import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertBuilderProvider {
    alerta: Alerta;
    constructor(public alertCtrl: AlertController, private _subtitle: string, private _title: string) {
        this.alerta = new Alerta(_title, _subtitle);
    }

    newAlert(): Alert {
        return this.alertCtrl.create({ title: this.alerta.title, subTitle: this.alerta.subTitle, buttons: ['OK'] });
    }

    changeTitle(strTitle) {
        this.alerta.setTitle(strTitle);
    }
    changeSubTitle(strSubTitle) {
        this.alerta.setSubTitle(strSubTitle);
    }

}
