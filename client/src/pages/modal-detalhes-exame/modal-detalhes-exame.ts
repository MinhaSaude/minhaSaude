import { Component, ViewChild, ElementRef } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-modal-detalhes-exame',
  templateUrl: 'modal-detalhes-exame.html',
})
export class ModalDetalhesExamePage {

  @ViewChild('fileInp') fileInput: ElementRef;

  buscarExame: any;

  exame = {
    data: "",
    clinica: "",
    tipo: "",
    anexos: "",
    uidConsulta: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    this.exame.data = this.navParams.get('data');
    this.exame.clinica = this.navParams.get('clinica');
    this.exame.tipo = this.navParams.get('tipo');
    this.exame.anexos = this.navParams.get('anexos');
    this.exame.uidConsulta = this.navParams.get('uidConsulta');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
