import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cadastro:string = 'paciente';
  user: any = { email: '', password: '' };
  
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public toastCtrl: ToastController,
      private afAuth: AngularFireAuth) {
  
  
    }
  
  
    createUserWithEmailAndPass(user) {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          this.navCtrl.setRoot('FichaMedicaPage');
        });
    }
  
  
    signInWithFacebook() {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          this.navCtrl.setRoot('FichaMedicaPage');
        });
    }
  
    signInWithGoogle() {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          console.log(res);
          this.navCtrl.setRoot('FichaMedicaPage');
        });
    }
  
    showMessage() {
      let toast = this.toastCtrl.create({
        message: 'Método em construção.',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000
      });
      toast.present();
    }
  
    openPage(page) {
      this.navCtrl.push(page);
    }
  
}
