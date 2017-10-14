import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder) {

    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  signInWithEmailAndPass() {
    this.afAuth.auth.signInWithEmailAndPassword(this.user.value.email, this.user.value.password)
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
