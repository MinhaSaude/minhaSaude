import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-modal-exames',
  templateUrl: 'modal-exames.html',
})
export class ModalExamesPage {

  private exameForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {

    this.exameForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      clinica: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required]],
      anexos: ['']
    });
  }

  ionViewDidLoad() { }

  adiconarExame() {

    var exame = {
      data: this.exameForm.value.data,
      clinica: this.exameForm.value.clinica,
      tipo: this.exameForm.value.tipo,
      anexos: this.exameForm.value.anexos,
      uidConsulta: ''
    }

    this.showMessage("Exame adiconado.");
    this.viewCtrl.dismiss(exame);
  }

  closeModal() {
    this.viewCtrl.dismiss(null);
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
