import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from './../providers/global/global';
import { AngularFireAuth } from 'angularfire2/auth';
import { MedicosProvider } from '../providers/medicos/medicos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, image: string }>;
  fichaMedica: Array<{ title: string, component: any, image: string }>;
  fichaMedicaClick: boolean = false;
  isAuthenticated: boolean = false;
  tipoUsuario: string;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private global: GlobalProvider,
    private medicoPv: MedicosProvider) {
    platform.ready().then(() => {
      this.init();
      afAuth.authState.subscribe(user => {

        if (user) {
          this.global.setCurrentUser(user);
          this.isAuthenticated = true;
          let buscaMedico = this.medicoPv.select(user.uid).snapshotChanges().subscribe(action => {
            var medico = action.payload.val();
            if (medico) {
              this.tipoUsuario = 'Medico';
              this.menu(this.isAuthenticated, this.tipoUsuario);
              this.global.setTipoUsuario(this.tipoUsuario);
              this.openPage('InfoPessoalMedicoPage');
            } else {
              this.tipoUsuario = 'Paciente';
              this.menu(this.isAuthenticated, this.tipoUsuario);
              this.global.setTipoUsuario(this.tipoUsuario);
              this.openPage('InfoPessoalPage');
            }

            buscaMedico.unsubscribe();
          });

        } else {
          this.global.setCurrentUser('');
          this.isAuthenticated = false;
          this.menu(this.isAuthenticated, "Nenhum");
          this.openPage('HomePage');
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  init() {
    this.global.getCurrentUser().then((user) => {
      if (user != '') {
        this.global.getTipoUsuario().then((tipo => {
          if (tipo == 'Medico') {
            this.openPage('InfoPessoalMedicoPage');
          } else {
            this.openPage('InfoPessoalPage');
          }
        }));
      } else {
        this.openPage('HomePage');
      }
    });

  }

  menu(isAuthenticated, tipoUsuario) {

    if (isAuthenticated && tipoUsuario == "Paciente") {
      this.fichaMedica = [
        { title: 'Informações Pessoais', component: 'InfoPessoalPage', image: './assets/icon/ficha-medica/informacoes_pessoais.png' },
        { title: 'Parentes', component: 'ParentesPage', image: './assets/icon/ficha-medica/parentes.png' },
        { title: 'Alergias', component: 'AlergiasPage', image: './assets/icon/ficha-medica/alergias.png' },
        { title: 'Médicamento de uso contínuo', component: 'MedUsoContinuoPage', image: './assets/icon/ficha-medica/med_uso_continuo.png' },
        { title: 'Doenças Cronicas', component: 'DoencasCronicasPage', image: './assets/icon/ficha-medica/doencas_cronicas.png' },
        { title: 'Cirurgias', component: 'CirurgiasPage', image: './assets/icon/ficha-medica/cirurgias.png' }
      ];

      this.pages = [
        { title: 'Histórico', component: 'ConsultasPage', image: './assets/icon/menu/historico.png' },
        { title: 'Médicos', component: 'MedicosPage', image: './assets/icon/menu/medico.png' },
        { title: 'Cartão', component: 'CartaoPage', image: './assets/icon/menu/cartao.png' },
        { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
      ];
    } else if (isAuthenticated && tipoUsuario == "Medico") {
      this.pages = [
        { title: 'Informações Pessoais', component: 'InfoPessoalMedicoPage', image: './assets/icon/ficha-medica/informacoes_pessoais.png' },
        { title: 'Consultar Pacientes', component: 'MedicosPage', image: './assets/icon/ficha-medica/consultar_pacientes.png' },
        { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
      ];
    } else {
      this.pages = [
        { title: 'Início', component: 'HomePage', image: './assets/icon/menu/inicio.png' },
        { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
      ];
    }

  }

  openPage(page) {
    let view = this.nav.getActive();
    if (view == undefined) {
      this.nav.setRoot(page);
    } else {
      if (view.component.name === page) { // Previnir que ela tente acessar a mesma view
        return;
      } else {
        this.nav.setRoot(page);
      }
    }
  }

  openPageMenu(page) {
    let view = this.nav.getActive();
    if (view.component.name != page.component) { // Previnir que ela tente acessar a mesma view
      this.nav.setRoot(page.component);
    }
  }


  deslogar() {
    this.afAuth.auth.signOut().then(() => {

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

