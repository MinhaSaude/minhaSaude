import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  displayName: string;
  page: any;

  user = {
    uid: "",
    foto: "",
    nome: "",
    cpfCnpj: "",
    email: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    registroSus: "",
    sexo: "",
    estatoCivil: "",
    tipoSanguineo: "",
    altura: "",
    peso: "",
    ocupacaoProfissional: "",
    nomeResponsavel: "",
    dataNascimento: "",
    grauEscolaridade: "",
    telefoneResidencial: "",
    telefoneCelular: ""
  };

  validationMessages = {
    'cpfCnpj': [
      { type: 'required', message: 'CPF obrigatorio.' },
      { type: 'minlength', message: 'CPF Deve possuir 11 números.' },
    ]
  };

  private pacienteForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private global: GlobalProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public paciente: PacientesProvider) {

    this.pacienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11)]],
      telefoneResidencial: [''],
      telefoneCelular: [''],
      email: [''],
      cep: [''],
      estado: [''],
      cidade: [''],
      bairro: [''],
      logradouro: [''],
      complemento: [''],
      registroSus: [''],
      sexo: [''],
      estatoCivil: [''],
      tipoSanguineo: [''],
      altura: [''],
      peso: [''],
      ocupacaoProfissional: [''],
      escolaridade: [''],
      nomeResponsavel: [''],
      dataNascimento: ['']
    });

    if(typeof this.navParams.get("paginaMedicoConsultaPaciente") == "undefined"){
      this.global.getCurrentUser().then((user) => {
        if (user) {
          this.user.uid = user.uid;
          this.user.nome = user.displayName;
          this.user.foto = user.photoURL;
          this.user.email = user.email;
          let buscarPaciente = this.paciente.select(user.uid).snapshotChanges().subscribe(action => {
            var dadosDoUsuario = action.payload.val();
            if (dadosDoUsuario) {
              this.user = action.payload.val();
            }
            buscarPaciente.unsubscribe();
          });
        } else {
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      var user = this.navParams.get("user");
      this.user.uid = user.uid;
      this.user.nome = user.displayName;
      this.user.foto = user.photoURL;
      this.user.email = user.email;
      let buscarPaciente = this.paciente.select(user.uid).snapshotChanges().subscribe(action => {
        var dadosDoUsuario = action.payload.val();
        if (dadosDoUsuario) {
          this.user = action.payload.val();
        }
        buscarPaciente.unsubscribe();
      });
    }
  }

  salvarPaciente(user) {
    this.paciente.update(user);
    this.showMessage("Dados atualizados com sucesso!");
  }

  uploadFoto(event) {
    this.readThis(event.target);
  }

  readThis(inputValue: any) {
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

  proxPagina(){
    this.navCtrl.push("ParentesPage", {
      user: this.navParams.get("user"),
      canGoBack: true
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
