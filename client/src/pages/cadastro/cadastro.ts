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

    afAuth.authState.subscribe(user => {
      if (user) {
        this.navCtrl.setRoot('FichaMedicaPage');
      }
    });

  }

  createUserWithEmailAndPassPatient() {
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.patient.value.email, this.patient.value.password)
      .then(res => {
      }).catch(error => {
        this.showMessage(error);
      });
  }

  createUserWithEmailAndPassDoctor() {
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.patient.value.email, this.patient.value.password)
      .then(res => {
      }).catch(error => {
        this.showMessage(error);
      });
  }

  signInWithFacebook() {
    this.presentLoading();
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {

    }).catch(error => {
      this.showMessage(error);
    });
  }

  signInWithGoogle() {
    this.presentLoading();
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
      }).catch(error => {
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
    this.loadingCtrl.create({
      content: 'Carregando..',
      dismissOnPageChange: true
    }).present();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
