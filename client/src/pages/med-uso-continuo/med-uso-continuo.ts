import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';

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
  buscaMedicamento: any;
  private medContForm: FormGroup;
  private medContSegment: string;
  private medicamentos: Array<{}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private global: GlobalProvider,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {

    this.medContSegment = 'listaMedicamento'
  
    this.medContForm =
    this.formBuilder.group({
      nomeComercial: ['', Validators.required], 
      rms: ['', Validators.required],
      principioAtivo: ['', Validators.required],
      fabricante: ['', Validators.required]

    });

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedUsoContinuoPage');
  }

  addMedicamento() {

  }

  removeMedicamento(){
   
  }

}
