import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
Aba de cirurgias 
(membro, motivo, data)

 */

@IonicPage()
@Component({
  selector: 'page-cirurgias',
  templateUrl: 'cirurgias.html',
})
export class CirurgiasPage {
  private cirurgiasForm: FormGroup;
  private cirurgiaSegment: any;
    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
    this.cirurgiaSegment = 'listaCirurgia'
    this.cirurgiasForm =
      this.formBuilder.group({
        membro: ['', Validators.required], 
        motivo: ['', Validators.required],
        data: ['', Validators.required]
      });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CirurgiasPage');
  }

  addCirurgia() {

  }

}