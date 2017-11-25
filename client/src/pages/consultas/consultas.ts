import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';

import { GlobalProvider } from './../../providers/global/global';
import { ConsultasProvider } from './../../providers/consultas/consultas';
import { ExamesProvider } from './../../providers/exames/exames';

@IonicPage()
@Component({
  selector: 'page-consultas',
  templateUrl: 'consultas.html',
})
export class ConsultasPage {

  buscarConsultas: any;
  private consultasForm: FormGroup;

  private consultas: Array<{
    data: string,
    medico: string,
    local: string,
    anamnese: string,
    sintomas: string
  }>;

  private exames: Array<{
    data: string,
    clinica: string,
    tipo: string,
    anexos: string,
    uidConsulta: string
  }>;

  private parentSegment: string;
  private uid: string;

  buscarExames: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private global: GlobalProvider,
    private consultasPV: ConsultasProvider,
    private examesPV: ExamesProvider,
    public toastCtrl: ToastController) {

    this.parentSegment = 'lista';

    this.consultasForm = this.formBuilder.group({
      data: ['', Validators.required],
      medico: ['', Validators.required],
      local: ['', Validators.required],
      anamnese: ['', Validators.required],
      sintomas: ['', Validators.required]
    });

    this.consultas = [];

    this.global.getCurrentUser().then((user) => {
      if (user) {
        this.uid = user.uid;
        this.buscarConsultas = this.consultasPV.select(user.uid).snapshotChanges().subscribe(actions => {
          var data = [];
          actions.forEach(action => {
            var consultas = action.payload.val();
            consultas.key = action.key;
            data.push(consultas);
          });
          this.consultas = data;
        });

      } else {
        this.navCtrl.setRoot('HomePage');
      }
    });

    this.exames = [];
  }

  ionViewDidLoad() { }

  ngOnDestroy() {
    this.buscarConsultas.unsubscribe();
  }

  detalhesConsulta(consulta) {
    let exameModal = this.modalCtrl.create('ModalDetalhesConsultaPage', consulta);
    exameModal.present();
  }

  addConsulta() {

    var consulta = {
      uid: this.uid,
      data: this.consultasForm.value.data,
      medico: this.consultasForm.value.medico,
      local: this.consultasForm.value.local,
      anamnese: this.consultasForm.value.anamnese,
      sintomas: this.consultasForm.value.sintomas
    }

    let ref = this.consultasPV.save(consulta);

    this.exames.forEach(exame => {
      exame.uidConsulta = ref.key;

      if (exame.uidConsulta != "") {
        this.examesPV.save(exame);
      }

    });

    this.consultasForm.reset();
    this.exames = [];
    this.showMessage("Consulta cadastrada com sucesso");
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

  hideButton(): boolean{
    if(this.parentSegment === "lista"){
      return true;
    }
  }

  showMessage(m) {
    let toast = this.toastCtrl.create({
      message: m,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    toast.present();
  }

}
