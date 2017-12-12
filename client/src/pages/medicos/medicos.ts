import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
})
export class MedicosPage {

  private buscarMedicoForm: FormGroup;
  private buscarMedicoSegment: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,    
    private FormBuilder:FormBuilder,
    private pacientes:PacientesProvider) {
            
           this.buscarMedicoSegment= 'lista';
       
          this.buscarMedicoForm = this.FormBuilder.group({
            especialidades: ['',Validators.required],
            estados:['',Validators.required]           
          });
        

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicosPage');
  }


  aviso(){
    this.showMessage("Funcionalidade ainda não implementada");
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
