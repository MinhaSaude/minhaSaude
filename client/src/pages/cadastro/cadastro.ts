import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { MedicosProvider } from './../../providers/medicos/medicos';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cadastro: string = 'paciente';
  private patient: FormGroup;
  private doctor: FormGroup;
  private socialNetwork: FormGroup;
  private loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private medicoPv: MedicosProvider) {

    this.patient = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });

    this.doctor = this.formBuilder.group({
      crm: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', Validators.email],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });

    this.socialNetwork = this.formBuilder.group({
      crm: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  createUserWithEmailAndPassPatient() {
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.patient.value.email, this.patient.value.password)
      .then(user => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }

  createUserWithEmailAndPassDoctor() {

    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.doctor.value.email, this.doctor.value.password)
      .then(res => {

        var doctor = {
          uid: res.uid,
          crm: this.doctor.value.crm,
          email: this.doctor.value.email
        };

        this.medicoPv.update(doctor);

        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        this.showMessage(error);
      });
  }

  signInWithFacebook(tipoUsuario) {

    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      this.presentLoading();
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
        if (tipoUsuario === 'M') {
        
          var doctor = {
            uid: res.user.uid,
            crm: this.socialNetwork.value.crm
          };

          this.medicoPv.update(doctor);
        }

        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        console.log(error);
        this.showMessage("Falha na autenticação com o facebook, por favor, tente novamente.");
      });
    }
  }

  signInWithGoogle(tipoUsuario) {
    this.presentLoading();
    if (this.platform.is('cordova')) {
      this.googlePlus.login({
        'webClientId': '16912875697-dbcv548e0df2h119sp6iifgqdu388p66.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        this.loading.dismiss();
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential);
      }).catch(err => {
        this.loading.dismiss();
        this.showMessage("Falha na autenticação com o google, por favor, tente novamente.");
      });

    } else {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          
          if (tipoUsuario === 'M') {
            var doctor = {
              uid: res.user.uid,
              crm: this.socialNetwork.value.crm
            };

            this.medicoPv.update(doctor);
          }
          this.loading.dismiss();
        }).catch(error => {
          this.loading.dismiss();
          console.log(error);
          this.showMessage("Falha na autenticação com o google, por favor, tente novamente.");
        });
    }
  }

  signInWithGoogleAndFacebook() {

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

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
