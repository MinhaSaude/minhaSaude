import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inicio:any = "Plataforma em construção";
  constructor(public navCtrl: NavController) {

  }
  
  openPage(page){
    this.navCtrl.push(page);
  }

}
