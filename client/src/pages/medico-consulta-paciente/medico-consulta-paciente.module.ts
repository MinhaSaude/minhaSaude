import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicoConsultaPacientePage } from './medico-consulta-paciente';

@NgModule({
  declarations: [
    MedicoConsultaPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicoConsultaPacientePage),
  ],
})
export class MedicoConsultaPacientePageModule {}
