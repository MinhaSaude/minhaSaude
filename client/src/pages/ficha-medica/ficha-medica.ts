import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/**

Aba de informações básicas (nome, foto, CPF,
telefone, tipo sanguíneo, telefone fixo, telefone celular, estado civil, endereço, e-mail,
altura, peso e convênio),

Aba de alergia (tipo de alergia, descrição alergia, medicamentos
restritos: (RMS, nome comercial, fabricante, princípio ativo)),

Aba de medicamentos de
uso contínuo: (RMS, nome comercial, fabricante, princípio ativo),

Doenças crônicas (nome, descrição),

Aba de cirurgias 
(membro, motivo, data), aba de parentes (lista):
(nome parente e grau de parentesco).
Os campos de informação básica são trazidos do cadastro do paciente.

São considerados campos não-obrigatórios: “foto, telefone celular, convênio,
medicamentos restritos, RMS, princípio ativo”. Aba de parentes, medicamentos de uso
contínuo, doenças crônicas e cirurgia não são obrigatórias, podem ser puladas.

 */

@IonicPage()
@Component({
  selector: 'page-ficha-medica',
  templateUrl: 'ficha-medica.html',
})
export class FichaMedicaPage {
  fichaMedica: any = "infoPessoal";
  titulo: any = "Informações Pessoais";
  displayName: string;
  page: any;
  photoURL: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
      this.fichaMedica = "infoPessoal";
      }else{
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichaMedicaPage');
  }

  
  segmentChanged(event) {
    switch (event.value) {
      case 'infoPessoal':
        this.titulo = "Informações Pessoais";
        break;
      case 'parentes':
        this.titulo = "Parentes";
        break;
      case 'alergias':
        this.titulo = "Alergias";
        break;
      default:
        this.titulo = "Informações Pessoais";
    }

  }
  

}
