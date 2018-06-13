import { LoadingController,Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderProvider {
  loading: Loading;
  constructor(private loadingCtrl: LoadingController) {
    
  }

  showLoading(description:string) {
    this.loading = this.loadingCtrl.create({
        content: description,
        dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismissAll();
  }
  
}
