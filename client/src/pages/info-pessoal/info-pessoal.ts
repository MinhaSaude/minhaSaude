import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from './../../providers/global/global';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*
Aba de informações pessoais
O caso de uso tem o objetivo de persistir as informações básicas do paciente (foto,
altura, peso, convênio, estado civil, endereço, e-mail, telefone, profissão, escolaridade, registro do SUS e tipo sanguíneo).
*/

@IonicPage()
@Component({
  selector: 'page-info-pessoal',
  templateUrl: 'info-pessoal.html',
})
export class InfoPessoalPage {
  @ViewChild('fileInp') fileInput: ElementRef;
  fichaMedica: any = "infoPessoal";
  titulo: any = "Informações Pessoais";
  displayName: string;
  page: any;
  
  user = {
    uid: "",
    foto: "./assets/images/profile.jpg",
    nome: "",
    cpfCnpj: "",
    telefoneResidencial: "",
    telefoneCelular: "",
    email: "",
    endereco: "",
    registro_sus: "",
    convenio: "",
    sexo: "",
    estadoCivil: "",
    tiposanguineo: "",
    altura: "",
    peso: "",
    profissao: "",
    escolaridade: "",
  };

  private pacienteForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private global: GlobalProvider,
    private pacientes: PacientesProvider,
    private formBuilder: FormBuilder) {

    this.pacienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpfCnpj: [''],
      telefoneResidencial: [''],
      telefoneCelular: [''],
      email: [''],
      endereco: [''],
      registro_sus: [''],
      convenio: [''],
      sexo: [''],
      statusCivil: [''],
      tiposanguineo: [''],
      altura: [''],
      peso: [''],
      profissao: [''],
      escolaridade: [''],
    });

  }

  ionViewDidLoad() {
    this.global.getCurrentUser().then((user) => {
      if (user) {
        this.getPacienteByUid(user.uid);
      } else {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  getPacienteByUid(uid) {
    this.pacientes.getPacienteByUid(uid).subscribe(user => {
      console.log(user);
      if (user.foto == "") {
        user.foto = this.user.foto;
      }
      this.user = user;
    });
  }

  salvarPaciente(user) {
    this.pacientes.setPacienteByUid(user).subscribe(data => {
      console.log(data);
    });
  }

  uploadFoto(event) {
    this.readThis(event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.user.foto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  clickUploadFoto() {
    this.fileInput.nativeElement.click();
  }
}
