import { ConsultasProvider } from './../providers/consultas/consultas';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FIREBASE_CONFIG } from './app.firebase.config';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { GlobalProvider } from '../providers/global/global';
import { PacientesProvider } from '../providers/pacientes/pacientes';
import { DoencasCronicasProvider } from '../providers/doencas-cronicas/doencas-cronicas';
import { MedicosProvider } from '../providers/medicos/medicos';
import { ParentesProvider } from './../providers/parentes/parentes';
import { AlergiasProvider } from '../providers/alergias/alergias';
import { MedUsoContinuoProvider } from '../providers/med-uso-continuo/med-uso-continuo';
import { CirurgiasProvider } from '../providers/cirurgias/cirurgias';
import { ExamesProvider } from '../providers/exames/exames';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook,
    GooglePlus,
    GlobalProvider,
    PacientesProvider,
    DoencasCronicasProvider,
    MedicosProvider,
    ParentesProvider,
    AlergiasProvider,
    MedUsoContinuoProvider,
    CirurgiasProvider,
    ConsultasProvider,
    ExamesProvider
  ]
})
export class AppModule { }
