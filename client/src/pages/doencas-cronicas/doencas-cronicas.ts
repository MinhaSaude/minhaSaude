import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoencasCronicasProvider } from '../../providers/doencas-cronicas/doencas-cronicas';
import { GlobalProvider } from './../../providers/global/global';

/**
Doenças crônicas (nome, descrição),
 */

@IonicPage()
@Component({
  selector: 'page-doencas-cronicas',
  templateUrl: 'doencas-cronicas.html',
})
export class DoencasCronicasPage {
  buscaDoenca: any;
  private doencasForm: FormGroup;
  private doencasSegment: string;
  private uid: string;
  private checkStatus: boolean = false;
  private doencas: Array<{}>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private global: GlobalProvider,
    public toastCtrl: ToastController,
    private doencasPv: DoencasCronicasProvider) {

    this.doencasSegment = 'lista';

    this.doencas = [];

    this.verificaCanGoBack();


    this.doencasForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['']
    });

    if(typeof this.navParams.get('user') == 'undefined'){

      this.global.getCurrentUser().then((user) => {
        if (user) {
          this.uid = user.uid;
        this.buscaDoenca =   this.doencasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions => {
            var data = [];
            actions.forEach(action => {
              var items = action.payload.val();
              items.key = action.key;
              data.push(items);
            });
            this.doencas = data;
          
          });
        } else {
          this.navCtrl.setRoot('HomePage');
        }
      });

    } else {
      var user = this.navParams.get('user');
      this.uid = user.uid;
      this.buscaDoenca =   this.doencasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions => {
        var data = [];
        actions.forEach(action => {
          var items = action.payload.val();
          items.key = action.key;
          data.push(items);
        });
        this.doencas = data;
      
      });
    }
  }

  /**
  * O método canGoBack nativo do Ionic não estava funcionando, mesmo colocado no WillEnter, quando a
  * aplicação terminou completamente de carregar ele retornava que havia uma página anterior.
  * Só funciona no click e é terrível sumir com o botão só quando o usuário clicar.
  */
  verificaCanGoBack(){
    if(typeof this.navParams.get("canGoBack") == 'undefined'){
      this.checkStatus = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoencasCronicasPage');
  }

  ngOnDestroy(){
    this.buscaDoenca.unsubscribe();
  }

  addDoencas() {
    var doenca = {
      uid: this.uid,
      nome: this.doencasForm.value.nome,
      descricao: this.doencasForm.value.descricao
    }
    this.doencasPv.update(doenca);
    this.doencasForm.reset();
    this.showMessage("Registro salvo com sucesso.");

  }

  deleteDoencas(doencas, i) {
    this.doencasPv.delete(doencas[i].key);
  }

  anterior(){
    this.navCtrl.pop();
  }

  proxPagina(){
    this.navCtrl.push('CirurgiasPage', {
      user: this.navParams.get('user'),
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
