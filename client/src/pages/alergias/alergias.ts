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
  private uid: string;
  private alergias: Array<{}>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private global: GlobalProvider,
    public toastCtrl: ToastController,
    private alergiasPv: AlergiasProvider) {

    this.alergiaSegment = 'lista';

    this.alergias = [];

    this.alergiasForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
    
   this.global.getCurrentUser().then((user) => {
       if(user){
         this.uid = user.uid;
         this.buscaAlergia = this.alergiasPv.selectByUID(this.uid).snapshotChanges().subscribe(actions =>{
         var data = [];
         actions.forEach(action =>{
          var items = action.payload.val();
          items.key = action.key;
          data.push(items);    
             });    
             this.alergias = data; 

         });
       }else{
        this.navCtrl.setRoot('HomePage');
       }

   });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlergiasPage');
  }

  ngOnDestroy(){
    this.buscaAlergia.unsubscribe();
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

  showMessage(m){
   let toast = this.toastCtrl.create({
    message: m,
    showCloseButton: true,
    closeButtonText: 'Ok',
    duration: 3000
  });
  toast.present();

  }

}
