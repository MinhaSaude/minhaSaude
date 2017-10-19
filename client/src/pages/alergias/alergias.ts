import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
Aba de alergia (tipo de alergia, descrição alergia, medicamentos
restritos: (RMS, nome comercial, fabricante, princípio ativo))
 */

@IonicPage()
@Component({
  selector: 'page-alergias',
  templateUrl: 'alergias.html',
})
export class AlergiasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlergiasPage');
  }

}
