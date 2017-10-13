import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = { email: '', password: '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth) {


  }


  signInWithEmailAndPass(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
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
