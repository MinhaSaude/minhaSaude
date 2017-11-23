import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetalhesConsultaPage } from './modal-detalhes-consulta';

@NgModule({
  declarations: [
    ModalDetalhesConsultaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetalhesConsultaPage),
  ],
})
export class ModalDetalhesConsultaPageModule {}
