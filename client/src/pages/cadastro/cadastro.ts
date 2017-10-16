import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cadastro: string = 'paciente';
  private patient: FormGroup;
  private doctor: FormGroup;
  private loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

    this.patient = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });

    this.doctor = this.formBuilder.group({
      crm: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });

  }

  createUserWithEmailAndPassPatient() {
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.patient.value.email, this.patient.value.password)
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }

  createUserWithEmailAndPassDoctor() {
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.patient.value.email, this.patient.value.password)
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }

  signInWithFacebook() {
    this.presentLoading();
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
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
