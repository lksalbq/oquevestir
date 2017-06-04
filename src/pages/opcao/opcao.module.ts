import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Opcao } from './opcao';

@NgModule({
  declarations: [
    Opcao,
  ],
  imports: [
    IonicPageModule.forChild(Opcao),
  ],
  exports: [
    Opcao
  ]
})
export class OpcaoModule {}
