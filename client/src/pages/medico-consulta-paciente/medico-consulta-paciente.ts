import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-medico-consulta-paciente',
  templateUrl: 'medico-consulta-paciente.html'
})
export class MedicoConsultaPacientePage {
  
  private buscarPacienteForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public navParams: NavParams,
              private FormBuilder:FormBuilder,
              private pacientes:PacientesProvider) {

    this.buscarPacienteForm = this.FormBuilder.group({
      CPF: ['']      
    });
  }

  buscaPaciente(){
    let cpf = this.buscarPacienteForm.value.CPF;

    this.pacientes.selectByCPF(cpf).snapshotChanges().subscribe(actions => {
        if(actions.length > 0){
          actions.forEach(action => {
            var dadosUsuario = action.payload.val();
            
            //this.showMessage("CPF existe na base de dados.");
            this.navCtrl.push('InfoPessoalPage', {
              user: dadosUsuario,
              paginaMedicoConsultaPaciente: true
            });
          });
        } else {
          this.showMessage("CPF não existe na base de dados.");
        }
        this.pacientes.unsubscribe();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicoConsultaPacientePage');
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
