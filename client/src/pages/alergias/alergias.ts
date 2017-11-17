import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
Aba de alergia (tipo de alergia, descrição alergia)
 */

@IonicPage()
@Component({
  selector: 'page-alergias',
  templateUrl: 'alergias.html',
})
export class AlergiasPage {
  private alergiasForm: FormGroup;
  private alergias: Array<{ tipo: string, descricao: string }>;
  private alergiaSegment: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
    this.alergiaSegment = 'lista';
    this.alergiasForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlergiasPage');
  }


  deleteItem(list, index) {
   
  }

  addAlergias() {

  }
}
