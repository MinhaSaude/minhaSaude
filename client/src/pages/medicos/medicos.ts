import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

/**
 * Generated class for the MedicosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
    private FormBuilder:FormBuilder) {
            
           this.buscarMedicoSegment= 'lista';
       
          this.buscarMedicoForm = this.FormBuilder.group({
            especialidades: [''],
            estados:['']           
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
