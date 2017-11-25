import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-modal-exames',
  templateUrl: 'modal-exames.html',
})
export class ModalExamesPage {

  @ViewChild('fileInp') fileInput: ElementRef;

  exame = {
    data: "",
    clinica: "",
    tipo: "",
    anexos: "",
    uidConsulta: ""
  };

  private exameForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {

    this.exameForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      clinica: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() { }

  adiconarExame() {


    this.exame.data = this.exameForm.value.data;
    this.exame.clinica = this.exameForm.value.clinica;
    this.exame.tipo = this.exameForm.value.tipo;

    this.showMessage("Exame adiconado.");
    this.viewCtrl.dismiss(this.exame);
  }

  uploadFoto(event) {
    this.readThis(event.target);
  }

  readThis(inputValue: any) {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.exame.anexos = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  clickUploadFoto() {
    this.fileInput.nativeElement.click();
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
