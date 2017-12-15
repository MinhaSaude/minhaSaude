import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MedicosProvider } from '../../providers/medicos/medicos';

@IonicPage()
@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
})
export class MedicosPage {
  private listaMedicos: Array<{}>;
  private buscarMedicoForm: FormGroup;
  private buscarMedicoSegment: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private FormBuilder: FormBuilder,
    private medicoPv: MedicosProvider) {

    this.buscarMedicoSegment = 'lista';

    this.buscarMedicoForm = this.FormBuilder.group({
      especialidade: [''],
      estados: ['', Validators.required]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicosPage');
  }


  buscarMedicos() {
   var bm = this.medicoPv.selectEstadoeEspecialidade(this.buscarMedicoForm.value.estados).snapshotChanges().subscribe(actions => {
      var data = [];
      actions.forEach(action => {
        var items = action.payload.val();
        items.key = action.key;

        if (this.buscarMedicoForm.value.especialidade) {
          if (items.especialidade == this.buscarMedicoForm.value.especialidade) {
            data.push(items);
          }
        } else {
          data.push(items);
        }

      });
      if (data.length == 0) {
        this.showMessage("Nenhum registro foi encontrado.");
      }
      this.listaMedicos = data;
      bm.unsubscribe();
    });
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
