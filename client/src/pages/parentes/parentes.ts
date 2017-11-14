import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacientesProvider } from './../../providers/pacientes/pacientes';

/**
  Aba de parentes (lista): (nome parente e 
    parentesco).
 */

@IonicPage()
@Component({
  selector: 'page-parentes',
  templateUrl: 'parentes.html',
})
export class ParentesPage {
  private parentesForm: FormGroup;
  private parentes: Array<{ nome: string, parentesco: string }>;
  private parentSegment: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private pacientes: PacientesProvider) {
    this.parentSegment = 'lista';
    this.parentesForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      parentesco: ['', Validators.required]
    });
    this.parentes = [{ nome: "João", parentesco: "Pai" },
    { nome: "Maria", parentesco: "Mãe" }];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentesPage');
  }

  deleteItem(list, index) {
    list.splice(index, 1);
  }

  addParentes() {
    let cpf = this.parentesForm.value.cpf;
    this.pacientes.selectByCPF(cpf).snapshotChanges().subscribe(action => {
      console.log(action);
    });


  }

}
