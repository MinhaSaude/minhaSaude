import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/*
Aba de informações básicas (nome, foto, CPF,
  telefone, tipo sanguíneo, telefone fixo, telefone celular, estado civil, endereço, e-mail,
  altura, peso e convênio)
*/
@IonicPage()
@Component({
  selector: 'page-info-pessoal',
  templateUrl: 'info-pessoal.html',
})
export class InfoPessoalPage {
  fichaMedica: any = "infoPessoal";
  titulo: any = "Informações Pessoais";
  displayName: string;
  page: any;
  photoURL: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.fichaMedica = "infoPessoal";
      } else {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPessoalPage');
  }

}
