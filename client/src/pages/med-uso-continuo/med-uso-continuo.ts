import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
Aba de medicamentos de
uso contínuo: (RMS, nome comercial, fabricante, princípio ativo),
 */

@IonicPage()
@Component({
  selector: 'page-med-uso-continuo',
  templateUrl: 'med-uso-continuo.html',
})
export class MedUsoContinuoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedUsoContinuoPage');
  }

}
