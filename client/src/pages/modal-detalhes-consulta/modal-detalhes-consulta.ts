import { ExamesProvider } from './../../providers/exames/exames';
import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { ConsultasProvider } from './../../providers/consultas/consultas';


@IonicPage()
@Component({
  selector: 'page-modal-detalhes-consulta',
  templateUrl: 'modal-detalhes-consulta.html',
})
export class ModalDetalhesConsultaPage {

  buscarExames: any;

  consulta = {
    data: "",
    medico: "",
    local: "",
    anamnese: "",
    sintomas: ""
  }

  private exames: Array<{
    data: string,
    clinica: string,
    tipo: string,
    anexos: string,
    uidConsulta: string
  }>;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private consultasProvider: ConsultasProvider,
    private examesProvider: ExamesProvider) {

    this.exames = [];

    this.buscarExames = this.examesProvider.getByUidConsulta(this.navParams.get('key')).snapshotChanges().subscribe(actions => {
      var data = [];
      actions.forEach(action => {
        var consultas = action.payload.val();
        consultas.key = action.key;
        data.push(consultas);
      });
      this.exames = data;
    });
  }

  ionViewDidLoad() {
    this.consulta.data = this.navParams.get('data');
    this.consulta.medico = this.navParams.get('medico');
    this.consulta.local = this.navParams.get('local');
    this.consulta.anamnese = this.navParams.get('anamnese');
    this.consulta.sintomas = this.navParams.get('sintomas');
  }

  deleteConsulta() {
    this.consultasProvider.delete(this.navParams.get('key'));
    this.showMessage("Consulta excluida com sucesso");
    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  confirmarExclusao() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      message: `Deseja excluir consulta?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteConsulta();
          }
        }
      ]
    });
    alert.present();
  }

  addExame() {

    let exameModal = this.modalCtrl.create('ModalExamesPage');
    exameModal.present();

    exameModal.onDidDismiss(data => {

      if (data != null) {
        this.exames.push(data);
      }
    });
  }

  detalhesExame(exame) {
    let modal = this.modalCtrl.create('ModalDetalhesExamePage', exame);
    modal.present();
  }

  showMessage(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
