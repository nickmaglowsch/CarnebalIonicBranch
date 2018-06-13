import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { AuthProvider } from '../providers/auth/auth';
import { AlertBuilderProvider } from '../providers/alert-builder/alert-builder';
import { ProductProvider } from '../providers/product/product';
import { LoaderProvider } from '../providers/loader/loader';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AlertBuilderProvider,
    ProductProvider,
    LoaderProvider
  ]
})
export class AppModule {}
