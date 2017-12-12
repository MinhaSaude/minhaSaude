import { GlobalProvider } from './../../providers/global/global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { CirurgiasProvider } from '../../providers/cirurgias/cirurgias';

/**
Aba de cirurgias 
(membro, motivo, data)
 */

@IonicPage()
@Component({
  selector: 'page-cirurgias',
  templateUrl: 'cirurgias.html',
})
export class CirurgiasPage {

  buscaCirurgia: any;
  private cirurgiasForm: FormGroup;
  private cirurgiaSegment: string;
  private checkStatus: boolean = false;
  private uid: string;
  private cirurgias: Array<{}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private global: GlobalProvider,
    public toastCtrl: ToastController,
    private cirurgiasPv: CirurgiasProvider) {

      this.verificaCanGoBack();

    this.cirurgiaSegment = 'listaCirurgia';

    this.cirurgias = [];

    this.cirurgiasForm =
      this.formBuilder.group({
        membro: ['', Validators.required],
        motivo: ['', Validators.required],
        data: ['', Validators.required]
      });

    if(typeof this.navParams.get('user') == 'undefined'){
      this.global.getCurrentUser().then((user) => {
        if (user) {
          this.uid = user.uid;
          this.buscaCirurgia = this.cirurgiasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions => {
            var data = [];
            actions.forEach(action => {
              var items = action.payload.val();
              items.key = action.key;
              data.push(items);
            });
            this.cirurgias = data;
          });
  
        } else {
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      var user = this.navParams.get('user');

      this.uid = user.uid;
      this.buscaCirurgia = this.cirurgiasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions => {
        var data = [];
        actions.forEach(action => {
          var items = action.payload.val();
          items.key = action.key;
          data.push(items);
        });
        this.cirurgias = data;
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
    console.log('ionViewDidLoad CirurgiasPage');
  }

  ngOnDestroy() {
    this.buscaCirurgia.unsubscribe();
  }

  addCirurgia() {

    var cirurgia = {
      uid: this.uid,
      membro: this.cirurgiasForm.value.membro,
      motivo: this.cirurgiasForm.value.motivo,
      data: this.cirurgiasForm.value.data
    }

    this.cirurgiasPv.update(cirurgia);
    this.cirurgiasForm.reset();
    this.showMessage("Cirurgia salva com sucesso.");
  }


  deleteCirurgia(cirurgias, i) {
    this.cirurgiasPv.delete(cirurgias[i].key);
  }

  

  anterior(){
    this.navCtrl.pop();
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