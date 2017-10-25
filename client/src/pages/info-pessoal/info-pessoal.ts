import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalProvider } from './../../providers/global/global';

/*
Aba de informações pessoais
O caso de uso tem o objetivo de persistir as informações básicas do paciente (foto,
altura, peso, convênio, estado civil, endereço, e-mail, telefone, profissão, escolaridade, registro do SUS e tipo sanguíneo).


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
  photoURL: string = "./assets/images/profile.jpg";
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private global: GlobalProvider) {
    this.user = this.global.getCurrentUser();
    // this.displayName = this.user.displayName;
    // this.photoURL = this.user.photoURL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPessoalPage');
  }

}
