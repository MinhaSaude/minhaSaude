import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
Aba de cirurgias 
(membro, motivo, data), aba de parentes (lista):
(nome parente e grau de parentesco).
Os campos de informação básica são trazidos do cadastro do paciente.

 */

@IonicPage()
@Component({
  selector: 'page-cirurgias',
  templateUrl: 'cirurgias.html',
})
export class CirurgiasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CirurgiasPage');
  }

}
