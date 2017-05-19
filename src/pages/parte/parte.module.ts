import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Parte } from './parte';

@NgModule({
  declarations: [
    Parte,
  ],
  imports: [
    IonicPageModule.forChild(Parte),
  ],
  exports: [
    Parte
  ]
})
export class ParteModule {}
