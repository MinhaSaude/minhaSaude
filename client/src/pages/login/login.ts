import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

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
  private loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

    this.user = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });

  }


  signInWithEmailAndPass() {
    this.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.user.value.email, this.user.value.password)
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }


  signInWithFacebook() {
    this.presentLoading();
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }

  signInWithGoogle() {
    this.presentLoading();
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }

  showMessage(m) {
    let toast = this.toastCtrl.create({
      message: m,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando..',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
