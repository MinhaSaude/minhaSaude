import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import { AlergiasProvider } from '../../providers/alergias/alergias';


/**
Aba de alergia (tipo de alergia, descrição alergia)
 */

@IonicPage()
@Component({
  selector: 'page-alergias',
  templateUrl: 'alergias.html',
})
export class AlergiasPage {
  buscaAlergia: any;
  private alergiasForm: FormGroup;
  private alergiaSegment: string;
  private checkStatus: boolean = false;
  private uid: string;
  private alergias: Array<{}>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private global: GlobalProvider,
    public toastCtrl: ToastController,
    private alergiasPv: AlergiasProvider) {
    this.verificaCanGoBack();

    this.alergiaSegment = 'lista';

    this.alergias = [];

    this.alergiasForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
    if (typeof this.navParams.get("user") == "undefined") {
      this.global.getCurrentUser().then((user) => {
        if (user) {
          this.uid = user.uid;
          this.buscaAlergia = this.alergiasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions => {
            var data = [];
            actions.forEach(action => {
              var items = action.payload.val();
              items.key = action.key;
              data.push(items);
            });

            this.alergias = data;

          });
        } else {
          this.navCtrl.setRoot('HomePage');
        }

      });
    } else {
      var user = this.navParams.get("user");
      this.uid = user.uid;
      this.buscaAlergia = this.alergiasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions => {
        var data = [];
        actions.forEach(action => {
          var items = action.payload.val();
          items.key = action.key;
          data.push(items);
        });
        this.alergias = data;

      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlergiasPage');
  }

  ngOnDestroy() {
    this.buscaAlergia.unsubscribe();
  }

  /**
  * O método canGoBack nativo do Ionic não estava funcionando, mesmo colocado no WillEnter, quando a
  * aplicação terminou completamente de carregar ele retornava que havia uma página anterior.
  * Só funciona no click e é terrível sumir com o botão só quando o usuário clicar.
  */
  verificaCanGoBack() {
    console.log(this.navParams.get("canGoBack"));
    if (typeof this.navParams.get("canGoBack") == 'undefined') {
      this.checkStatus = true;
    }
  }



  addAlergias() {
    var alergia = {
      uid: this.uid,
      tipo: this.alergiasForm.value.tipo,
      descricao: this.alergiasForm.value.descricao
    }

    this.alergiasPv.updateAlergia(alergia);
    this.alergiasForm.reset();
    this.showMessage("Registro salvo com sucesso.");

  }


  deleteAlergia(alergias, i) {
    this.alergiasPv.deleteAlergia(alergias[i].key);
  }

  anterior() {
    this.navCtrl.pop();
  }

  proxPagina() {
    this.navCtrl.push('MedUsoContinuoPage', {
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
