import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categoria } from './categoria';

@NgModule({
  declarations: [
    Categoria,
  ],
  imports: [
    IonicPageModule.forChild(Categoria),
  ],
  exports: [
    Categoria
  ]
})
export class CategoriaModule {}
