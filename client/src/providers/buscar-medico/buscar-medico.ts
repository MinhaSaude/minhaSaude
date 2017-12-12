import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BuscarMedicoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuscarMedicoProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase          ) {
    console.log('Hello BuscarMedicoProvider Provider');
  }


selectMedico(estado, especialidade){
  return this.afDB.list('medicos/');

}

}
