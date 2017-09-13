import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    setTimeout(function(){
      document.getElementById("custom-overlay").style.display = "none";      
    }, 3000);
  }

}
