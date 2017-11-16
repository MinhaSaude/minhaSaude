import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPessoalMedicoPage } from './info-pessoal-medico';

@NgModule({
  declarations: [
    InfoPessoalMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPessoalMedicoPage),
  ],
})
export class InfoPessoalMedicoPageModule {}
