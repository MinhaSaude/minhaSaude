import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartaoPage } from './../pages/cartao/cartao';
import { SobrePage } from './../pages/sobre/sobre';
import { MedicosPage } from './../pages/medicos/medicos';
import { HistoricoPage } from './../pages/historico/historico';
import { FichaMedicaPage } from './../pages/ficha-medica/ficha-medica';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FichaMedicaPage,
    HistoricoPage,
    MedicosPage,
    CartaoPage,
    SobrePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FichaMedicaPage,
    HistoricoPage,
    MedicosPage,
    CartaoPage,
    SobrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
