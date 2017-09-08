import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CartaoPage } from './../pages/cartao/cartao';
import { SobrePage } from './../pages/sobre/sobre';
import { MedicosPage } from './../pages/medicos/medicos';
import { HistoricoPage } from './../pages/historico/historico';
import { FichaMedicaPage } from './../pages/ficha-medica/ficha-medica';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  fichaMedica:any = FichaMedicaPage;
  historico:any = HistoricoPage;
  medicos:any = MedicosPage;
  cartao:any = CartaoPage;
  sobre:any = SobrePage;
  inicio:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page){
    this.rootPage = page;
  }
}

