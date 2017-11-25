import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetalhesExamePage } from './modal-detalhes-exame';

@NgModule({
  declarations: [
    ModalDetalhesExamePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetalhesExamePage),
  ],
})
export class ModalDetalhesExamePageModule {}
