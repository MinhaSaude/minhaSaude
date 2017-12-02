import { MedicosProvider } from './../../providers/medicos/medicos';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalProvider } from './../../providers/global/global';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-info-pessoal-medico',
  templateUrl: 'info-pessoal-medico.html',
})
export class InfoPessoalMedicoPage {

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
    dataNascimento: "",
    especialidade: "",
    telefoneResidencial: "",
    telefoneCelular: ""
  };
  validationMessages = {
    'cpfCnpj': [
      { type: 'required', message: 'CPF obrigatorio.' },
      { type: 'minlength', message: 'CPF Deve possuir 11 números.' },
    ]
  };
  private medicoForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private global: GlobalProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public medico: MedicosProvider) {

    this.medicoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11)]],
      especialidade: [''],
      telefoneResidencial: [''],
      telefoneCelular: [''],
      email: [''],
      cep: [''],
      estado: [''],
      cidade: [''],
      bairro: [''],
      logradouro: [''],
      complemento: [''],
      dataNascimento: ['']
    });


    this.global.getCurrentUser().then((user) => {
      if (user) {
        this.user.uid = user.uid;
        this.user.nome = user.displayName;
        this.user.foto = user.photoURL;
        this.user.email = user.email;
        this.user.telefoneResidencial = user.telefoneResidencial;
        this.user.telefoneCelular = user.telefoneCelular;
        this.user.cep = user.cep;
        this.user.bairro = user.bairro;
        this.user.cidade = user.cidade;
        this.user.logradouro = user.logradouro;
        this.user.especialidade = user.especialidade;
        this.user.complemento = user.complemento;
        this.user.estado = user.estado;
        this.user.dataNascimento = user.dataNascimento;
        
        let buscarMedico = this.medico.select(user.uid).snapshotChanges().subscribe(action => {
          var dadosDoUsuario = action.payload.val();
          if (dadosDoUsuario) {
           // this.user.uid = user.uid;
            this.user = action.payload.val();
            this.user.uid = user.uid;

          }
          buscarMedico.unsubscribe();
        });
      } else {
        this.navCtrl.setRoot('HomePage');
      }
    });



  }

  salvarMedico(user) {
    
    this.medico.update(user);
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
