import { ExamesProvider } from './../../providers/exames/exames';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { ConsultasProvider } from './../../providers/consultas/consultas';


@IonicPage()
@Component({
  selector: 'page-modal-detalhes-consulta',
  templateUrl: 'modal-detalhes-consulta.html',
})
export class ModalDetalhesConsultaPage {

  buscarExames: any;

  private exames: Array<{
    data: string,
    clinica: string,
    tipo: string,
    anexos: string,
    uidConsulta: string
  }>;

  private consultaForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private consultasProvider: ConsultasProvider,
    private examesProvide: ExamesProvider) {

    this.consultaForm = this.formBuilder.group({
      data: ['', Validators.required],
      medico: ['', Validators.required],
      local: ['', Validators.required],
      anamnese: ['', Validators.required],
      sintomas: ['', Validators.required]
    });


    this.exames = [];
    
    this.buscarExames = this.examesProvide.select(this.navParams.get('key')).snapshotChanges().subscribe(actions => {
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

    this.consultaForm.controls['data'].setValue(this.navParams.get('data'));
    this.consultaForm.controls['medico'].setValue(this.navParams.get('medico'));
    this.consultaForm.controls['local'].setValue(this.navParams.get('local'));
    this.consultaForm.controls['anamnese'].setValue(this.navParams.get('anamnese'));
    this.consultaForm.controls['sintomas'].setValue(this.navParams.get('sintomas'));
  }

  atualizarConsulta() {
    this.consultasProvider.update(this.navParams.get('key'), this.consultaForm.value);
    this.showMessage("Consulta atualizada com sucesso");
    this.closeModal();
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
