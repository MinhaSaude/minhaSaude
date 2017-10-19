import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPessoalPage } from './info-pessoal';

@NgModule({
  declarations: [
    InfoPessoalPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPessoalPage),
  ],
})
export class InfoPessoalPageModule {}
