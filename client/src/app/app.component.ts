import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'HomePage';
  pages: Array<{ title: string, component: any, image: string }>;
  isAuthenticated: boolean = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private afAuth: AngularFireAuth) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      afAuth.authState.subscribe(user => {
        if (!user) {
          this.pages = [
            { title: 'Início', component: 'HomePage', image: './assets/icon/menu/inicio.png' },
            { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
          ];
          return;
        }
        this.rootPage = 'FichaMedicaPage';
        this.pages = [
          { title: 'Ficha Médica', component: 'FichaMedicaPage', image: './assets/icon/menu/ficha-medica.png' },
          { title: 'Histórico', component: 'HistoricoPage', image: './assets/icon/menu/historico.png' },
          { title: 'Médicos', component: 'MedicosPage', image: './assets/icon/menu/medico.png' },
          { title: 'Cartão', component: 'CartaoPage', image: './assets/icon/menu/cartao.png' },
          { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
        ];

      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}

