import { GlobalProvider } from './../../providers/global/global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { ParentesProvider } from '../../providers/parentes/parentes';

/**
  Aba de parentes (lista): (nome parente e 
    parentesco).
 */


@IonicPage()
@Component({
  selector: 'page-parentes',
  templateUrl: 'parentes.html',
})
export class ParentesPage {

  buscarParentes: any;
  private parentesForm: FormGroup;
  private parentes: Array<{ nome: string, parentesco: string }>;
  private parentSegment: string;
  private checkStatus: boolean = false;
  private uid: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private global: GlobalProvider,
    private pacientes: PacientesProvider,
    private parentesPv: ParentesProvider,
    public toastCtrl: ToastController) {

    this.parentSegment = 'lista';
    this.parentesForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      parentesco: ['', Validators.required]
    });
    this.parentes = [];

    this.verificaCanGoBack();

    if(typeof this.navParams.get("user") == 'undefined'){

      this.global.getCurrentUser().then((user) => {
        if (user) {
          this.uid = user.uid;
          this.buscarParentes = this.parentesPv.select(user.uid).snapshotChanges().subscribe(actions => {
            var data = [];
            actions.forEach(action => {
              var parentes = action.payload.val();
              parentes.key = action.key;
              data.push(parentes);
            });
            this.parentes = data;
          });
  
  
        } else {
          this.navCtrl.setRoot('HomePage');
        }
      });

    } else {
      var user = this.navParams.get('user');
      
      this.buscarParentes = this.parentesPv.select(user.uid).snapshotChanges().subscribe(actions => {
        var data = [];
        actions.forEach(action => {
          var parentes = action.payload.val();
          parentes.key = action.key;
          data.push(parentes);
        });
        this.parentes = data;
      });
    }

  }

  /**
  * O método canGoBack nativo do Ionic não estava funcionando, mesmo colocado no WillEnter, quando a
  * aplicação terminou completamente de carregar ele retornava que havia uma página anterior.
  * Só funciona no click e é terrível sumir com o botão só quando o usuário clicar.
  */
  verificaCanGoBack(){
    console.log(this.navParams);
    if(typeof this.navParams.get("canGoBack") == 'undefined'){
      this.checkStatus = true;
    }
  }

  ngOnDestroy() {
    this.buscarParentes.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentesPage');
  }

  deleteItem(list, index) {
    this.parentesPv.delete(list[index].key);
  }

  addParentes() {
    let cpf = this.parentesForm.value.cpf;

    this.pacientes.selectByCPF(cpf).snapshotChanges().subscribe(actions => {

      if (actions.length > 0) {

        actions.forEach(action => {
          var dadosUsuario = action.payload.val();

          this.parentesPv.update({
            uid: this.uid,
            uidParente: dadosUsuario.uid,
            nome: dadosUsuario.nome,
            parentesco: this.parentesForm.value.parentesco
          });

          this.showMessage("Registro salvo com sucesso.");
          this.parentesForm.reset();
        });

      } else {
        this.showMessage("CPF não existe na base de dados.");
      }

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

  proxPagina(){
    this.navCtrl.push('AlergiasPage', {
      user: this.navParams.get('user'),
      canGoBack: true
    });
  }

  anterior(){
    console.log(this.navCtrl.canGoBack());
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }
  }
}
