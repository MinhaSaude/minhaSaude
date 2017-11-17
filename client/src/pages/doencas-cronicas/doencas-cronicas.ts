import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
Doenças crônicas (nome, descrição),
 */

@IonicPage()
@Component({
  selector: 'page-doencas-cronicas',
  templateUrl: 'doencas-cronicas.html',
})
export class DoencasCronicasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoencasCronicasPage');
  }

}
