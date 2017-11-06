import { GlobalProvider } from './../global/global';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PacientesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PacientesProvider {

  constructor(
    private http: Http,
    private global: GlobalProvider) {
    console.log('Hello PacientesProvider Provider');
  }

  select(uid) {
    let url = this.global.webServiceUrl() + 'pacientes/' + uid;
    return this.http.get(url).map(res => res.json());
  }

  update(paciente) {
    let url = this.global.webServiceUrl() + 'pacientes/' + paciente.uid;
    return this.http.put(url, paciente).map(res => res.json());
  }

  create(paciente) {
    let url = this.global.webServiceUrl() + 'pacientes/';
    return this.http.post(url, paciente).map(res => res.json());
  }

}
