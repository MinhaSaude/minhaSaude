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
  fichaMedica: Array<{ title: string, component: any, image: string }>;
  fichaMedicaClick: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private afAuth: AngularFireAuth) {
    platform.ready().then(() => {
      afAuth.authState.subscribe(user => {
        if (user) {
          this.isAuthenticated = true;

          this.fichaMedica = [
            { title: 'Informações Pessoais', component: 'InfoPessoalPage', image: './assets/icon/ficha-medica/informacoes_pessoais.png' },
            { title: 'Parentes', component: 'ParentesPage', image: './assets/icon/ficha-medica/parentes.png' },
            { title: 'Alergias', component: 'AlergiasPage', image: './assets/icon/ficha-medica/alergias.png' },
            { title: 'Médicamento de uso contínuo', component: 'MedUsoContinuoPage', image: './assets/icon/ficha-medica/med_uso_continuo.png' },
            { title: 'Doenças Cronicas', component: 'DoencasCronicasPage', image: './assets/icon/ficha-medica/doencas_cronicas.png' },
            { title: 'Cirurgias', component: 'CirurgiasPage', image: './assets/icon/ficha-medica/cirurgias.png' }
          ];

          this.pages = [
            { title: 'Histórico', component: 'HistoricoPage', image: './assets/icon/menu/historico.png' },
            { title: 'Médicos', component: 'MedicosPage', image: './assets/icon/menu/medico.png' },
            { title: 'Cartão', component: 'CartaoPage', image: './assets/icon/menu/cartao.png' },
            { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
          ];

          this.nav.setRoot('InfoPessoalPage');
        } else {
          this.isAuthenticated = false;

          this.pages = [
            { title: 'Início', component: 'HomePage', image: './assets/icon/menu/inicio.png' },
            { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
          ];

          return;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  deslogar() {
    this.afAuth.auth.signOut().then(() => {
      this.nav.setRoot('HomePage');
    });
  }

  clickFichaMedica() {
    if (this.fichaMedicaClick) {
      this.fichaMedicaClick = false;
    } else {
      this.fichaMedicaClick = true;
    }
  }
}

