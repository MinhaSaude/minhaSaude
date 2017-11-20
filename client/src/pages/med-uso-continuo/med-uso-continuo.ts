import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import { MedUsoContinuoProvider } from '../../providers/med-uso-continuo/med-uso-continuo';

/**
Aba de medicamentos de uso contínuo: (RMS, nome comercial, fabricante, princípio ativo) **/
  
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
  private uid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private global: GlobalProvider,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private medicamentosPv: MedUsoContinuoProvider) {

    this.medContSegment = 'listaMedicamento'

    this.medicamentos = [];
  
    this.medContForm =
    this.formBuilder.group({
      nomeComercial: ['', Validators.required], 
      rms: ['', Validators.required],
      principioAtivo: ['', Validators.required],
      fabricante: ['', Validators.required]

    });

         this.global.getCurrentUser().then((user) =>{
           if (user){
             this.uid = user.uid;
             this.buscaMedicamento = this.medicamentosPv.selectByUID(this.uid).snapshotChanges().subscribe(actions =>{
             var data = [];
             actions.forEach(action =>{
               
              var items = action.payload.val();
              items.key = action.key;
              data.push(items);

             });
                  
             this.medicamentos = data;

         });
         

           }else {
             this.navCtrl.setRoot('HomePage');
           }
         });



  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedUsoContinuoPage');
  }

  addMedicamento() {
    var medicamento={
    uid: this.uid,
    rms: this.medContForm.value.rms,
    fabricante: this.medContForm.value.fabricante,
    nomeComercial: this.medContForm.value.nomeComercial,
    principioAtivo: this.medContForm.value.principioAtivo
    }

    this.medicamentosPv.updateMedicamento(medicamento);
    this.medContForm.reset();
    this.showMessage("Registro salvo com sucesso.");

  }

  removeMedicamento(medicamentos, i){
    this.medicamentosPv.deleteMedicamento(medicamentos[i].key);
   
  }

showMessage(m){
  let toast = this.toastCtrl.create({
    message: m,
    showCloseButton: true,
    closeButtonText:'Ok',
    duration: 3000
 });

 toast.present();
}


}